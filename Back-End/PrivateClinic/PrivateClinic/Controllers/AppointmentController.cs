using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PrivateClinic.Dtos;
using PrivateClinic.Models;
using PrivateClinic.Services;
using System.Net.Mail;
using System.Net;
using Microsoft.EntityFrameworkCore;

namespace PrivateClinic.Controllers
{
	[Route("api/appointment")]
	[ApiController]
	public class AppointmentController : ControllerBase
	{
		private PrivateClinicManagementDBContext _dbContext;
		private readonly IVnPayService _vnPayService;

		public AppointmentController(PrivateClinicManagementDBContext dbContext, IVnPayService vnPayService)
		{
			_dbContext = dbContext;
			_vnPayService = vnPayService;
		}

		[HttpGet("{treatmentId}")]
		public async Task<ActionResult<decimal>> GetTreatmentPrice(int treatmentId)
		{
			var treatment = await _dbContext.Treatments
				.Include(t => t.Price) 
				.FirstOrDefaultAsync(t => t.Id == treatmentId);

			if (treatment == null)
			{
				return BadRequest(new { success = false, message = "Cannot find price data." });
			}

			return Ok(new { success = true, result = treatment.Price.Price });
		}

		[HttpPost]
		public async Task<ActionResult<string>> Checkout([FromBody] Order order)
		{
			if (order == null)
			{
				return BadRequest(new { success = false, message = "Order data is null." });
			}
			var newOrder = new Order
			{
				CustomerName = order.CustomerName,
				Total = order.Total,
				Date = order.Date,
				Method = order.Method,
				TreatmentId = order.TreatmentId,
			};

			_dbContext.Orders.Add(order);
			await _dbContext.SaveChangesAsync();

			// Send email
			try
			{
				var message = new MailMessage();
				message.From = new MailAddress("anb2014637@student.ctu.edu.vn");
				message.To.Add(order.CustomerName);
				message.Subject = "Xác Nhận Lịch Hẹn Khám";
				message.Body = $"Đơn thanh toán lịch hẹn khám của khách hàng {order.CustomerName} người vào ngày {order.Date} " +
					$"đã được xác nhận thành công.\n" +
				   $"Xin cảm ơn bạn đã sử dụng dịch vụ của chúng tôi !!!";

				using (var client = new SmtpClient("smtp.gmail.com"))
				{
					client.Port = 587;
					client.Credentials = new NetworkCredential("anb2014637@student.ctu.edu.vn", "NYS3Lv@C");
					client.EnableSsl = true;
					await client.SendMailAsync(message);
				}
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.Message);
				return StatusCode(500, "Failed to send email");
			}

			return Ok(new { success = true, message = "Order placed successfully" });
		}

		[HttpGet("vnpay/{treatmentId}")]
		public async Task<ActionResult<string>> ProcessCheckoutVNPay(int treatmentId)
		{
			var treatment = await _dbContext.Treatments
				.Include(t => t.Price)
				.FirstOrDefaultAsync(t => t.Id == treatmentId);

			var vnPayModel = new VnPaymentRequestModel
			{
				Amount = treatment.Price.Price,
				CreatedDate = DateTime.Now,
				OrderId = 1,
			};

			return _vnPayService.CreatePaymentUrl(HttpContext, vnPayModel);
		}

		[HttpGet]
		public async Task<ActionResult<string>> PaymentCallBack()
		{
			var collections = HttpContext.Request.Query;

			var response = _vnPayService.PaymentExecute(collections);

			if (response == null || response.VnPayResponseCode != "00")
			{
				return Redirect("http://localhost:3000/appointment?payment=false");
			}

			return Redirect("http://localhost:3000?payment=true");
		}
	}
}
