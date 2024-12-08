using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrivateClinic.Dtos;
using PrivateClinic.Models;
using PrivateClinic.Services;
using System.Net.Mail;
using System.Net;
using System.Web;

namespace PrivateClinic.Controllers
{
	[Route("api/profile")]
	[ApiController]
	public class ProfileController : ControllerBase
	{
		private PrivateClinicManagementDBContext _dbContext;
		private readonly IVnPayService _vnPayService;

		public ProfileController(PrivateClinicManagementDBContext dbContext, IVnPayService vnPayService)
		{
			_dbContext = dbContext;
			_vnPayService = vnPayService;
		}

		[HttpGet("{customerId}")]
		public async Task<ActionResult> GetSchedulesInfo(int customerId)
		{
			var doctors = await _dbContext.Users
				.Where(user => user.RoleId == 2)
				.Select(user => new UserDto
				{
					Id = user.Id,
					Name = user.Name,
					Phone = user.Phone
				})
				.ToListAsync();

			var treatments = await _dbContext.Treatments
				.Select(treatment => new TreatmentDto
				{
					Id = treatment.Id,
					TreatmentName = treatment.Name
				})
				.ToListAsync();

			var schedules = await _dbContext.ExaminitionAppointments
					.Include(s => s.Doctor)
					.Include(s => s.Treatment)
					.Where(s => s.CustomerId == customerId)
					.Select(schedule => new ScheduleDto
					{
						Id = schedule.Id,
						Name = schedule.Name,
						Phone = schedule.Phone,
						Email = schedule.Email,
						Date = schedule.Date,
						Status = schedule.Status,
						Price = schedule.Treatment.Price,
						DoctorName = schedule.Doctor.Name,
						TreatmentName = schedule.Treatment.Name,
						TreatmentId = schedule.TreatmentId,
					})
					.ToListAsync();

			return Ok(new { success = true, Doctors = doctors, Treatments = treatments, Schedules = schedules });
		}


		[HttpGet("vnpay/{scheduleId}/{price}")]
		public async Task<ActionResult<string>> ProcessCheckoutVNPay(int scheduleId,double price)
		{
			var vnPayModel = new VnPaymentRequestModel
			{
				Amount = price,
				CreatedDate = DateTime.Now,
				OrderId = scheduleId,
			};

			return _vnPayService.CreatePaymentUrl(HttpContext, vnPayModel);
		}

		[HttpGet]
		public async Task<ActionResult<string>> PaymentCallBack()
		{

			var collections = HttpContext.Request.Query;

			var response = _vnPayService.PaymentExecute(collections);

			var index = response.OrderDescription.LastIndexOf(":") + 1;

			int orderId = int.Parse(response.OrderDescription.Substring(index));

			var sche = await _dbContext.ExaminitionAppointments.FindAsync(orderId);

            if (sche == null)
            {
				return Redirect("http://localhost:3000/profile?payment=false");

			}

            if (response == null || response.VnPayResponseCode != "00")
			{
				return Redirect("http://localhost:3000/profile?payment=false");
			}

			sche.Status = "Đã Thanh Toán";
			_dbContext.ExaminitionAppointments.Update(sche);
			_dbContext.SaveChanges();

			var treatment = await _dbContext.Treatments
			.FirstOrDefaultAsync(t => t.Id == sche.TreatmentId);

			var newOrder = new Order
			{
				CustomerName = sche.Name,
				CustomerEmail = sche.Email,
				Total = treatment.Price,
				Date = sche.Date,
				Method = "VnPay",
				Status = "Đã Thanh Toán",
				TreatmentId = sche.TreatmentId,
			};


			_dbContext.Orders.Add(newOrder);
			_dbContext.SaveChanges();

			// Send email
			try
			{
				var message = new MailMessage();
				message.From = new MailAddress("anb2014637@student.ctu.edu.vn");
				message.To.Add("ioephuocan@gmail.com");
				message.Subject = "Xác Nhận Lịch Hẹn Khám";
				message.Body = $"Lịch hẹn khám của khách hàng {newOrder.CustomerName} vào ngày {newOrder.Date} " +
				  $"đã được xác nhận và thanh toán thành công.\n" +
				  $"Thông tin chi tiết:\n" +
				  $"- Ngày hẹn: {newOrder.Date}\n" +
				  $"- Tổng tiền: {newOrder.Total}\n" +
				  $"- Phương thức: {newOrder.Method}\n" +
				  $"- Trạng thái: {newOrder.Status}\n" +
				  $"- Dịch vụ: {newOrder.Treatment.Name}\n" +
				  $"\nNhân viên của chúng tôi sẽ sắp xếp ca khám cho bạn. Nếu có vấn đề gì chúng tôi sẽ liên hệ với bạn qua số điện thoại !!!" +
				  $"\nXin cảm ơn bạn đã sử dụng dịch vụ của phòng khám Cleveland !!!";

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


			return Redirect("http://localhost:3000/profile?payment=true");
		}
	}
}
