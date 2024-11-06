using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PrivateClinic.Dtos;
using PrivateClinic.Models;
using PrivateClinic.Services;
using System.Net.Mail;
using System.Net;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Numerics;
using static System.Runtime.InteropServices.JavaScript.JSType;

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

		[HttpPost("schedule")]
		public async Task<IActionResult> SetSchedule([FromBody] ExaminitionAppointment schedule)
		{
			if (schedule == null)
			{
				return BadRequest(new { success = false, message = "Schedule data is null." });
			}

			var info = new ExaminitionAppointment
			{
				Name = schedule.Name,
				Phone = schedule.Phone,
				Email = schedule.Email,
				Date = schedule.Date,
				Status = "Chưa Thanh Toán",
				DoctorId = schedule.DoctorId,
				CustomerId = schedule.CustomerId,
				TreatmentId = schedule.TreatmentId
			};

			await _dbContext.ExaminitionAppointments.AddAsync(info);
			await _dbContext.SaveChangesAsync();

			return Ok(new { success = true, message = "Schedule set successfully." });
		}
	}
}
