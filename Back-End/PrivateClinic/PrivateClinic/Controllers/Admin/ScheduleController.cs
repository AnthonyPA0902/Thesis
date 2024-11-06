using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrivateClinic.Dtos;
using PrivateClinic.Models;

namespace PrivateClinic.Controllers.Admin
{
	[Route("api/admin")]
	[ApiController]
	public class ScheduleController : ControllerBase
	{
		private PrivateClinicManagementDBContext _dbContext;

		public ScheduleController(PrivateClinicManagementDBContext dbContext)
		{
			_dbContext = dbContext;
		}
		[HttpGet("schedule")]
		public async Task<ActionResult> GetSchedulesInfo([FromQuery] string search = "")
		{
			var schedulesQuery = _dbContext.ExaminitionAppointments
				.Include(s => s.Doctor)
				.Include(s => s.Treatment)
				.Where(sche => sche.Status == "Đã Thanh Toán");

			if (!string.IsNullOrEmpty(search))
			{
				schedulesQuery = schedulesQuery.Where(schedule =>
					EF.Functions.Like(schedule.Doctor.Name, $"%{search}%"));
			}

			var schedules = await schedulesQuery.Select(schedule => new ScheduleDto
			{
				Id = schedule.Id,
				Name = schedule.Name,
				Phone = schedule.Phone,
				Email = schedule.Email,
				Date = schedule.Date,
				DoctorName = schedule.Doctor.Name,
				TreatmentName = schedule.Treatment.Name,
			}).ToListAsync();

			return Ok(new { success = true, Schedules = schedules });
		}

		[HttpPost("schedule")]
		public async Task<IActionResult> UpdateScheduleTable([FromBody] ExaminitionAppointment schedule)
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
				DoctorId = schedule.DoctorId,
				TreatmentId = schedule.TreatmentId
			};

			await _dbContext.ExaminitionAppointments.AddAsync(info);
			await _dbContext.SaveChangesAsync();

			return Ok(new { success = true, message = "Schedule updated successfully." });
		}

		[HttpGet("schedule/{id}")]
		public async Task<ActionResult<ExaminitionAppointment>> GetSchedule(int id)
		{
			var schedule = await _dbContext.ExaminitionAppointments.FirstOrDefaultAsync(ea => ea.Id == id); ;
			return Ok(new { success = true, Schedule = schedule });
		}

		[HttpPut("schedule/{id}")]
		public async Task<ActionResult<ExaminitionAppointment>> EditSchedule([FromBody] ExaminitionAppointment schedule, int id)
		{
			var sche = await _dbContext.ExaminitionAppointments.FindAsync(id);

			sche.Name = schedule.Name;
			sche.Phone = schedule.Phone;
			sche.Email = schedule.Email;
			sche.Date = schedule.Date;
			sche.DoctorId = schedule.DoctorId;
			sche.TreatmentId = schedule.TreatmentId;

			_dbContext.ExaminitionAppointments.Update(sche);
			_dbContext.SaveChanges();

			return Ok(new { success = true, message = "Edit Schedule Successfully" });
		}


		[HttpDelete("schedule/{id}")]
		public async Task<ActionResult<ExaminitionAppointment>> DeleteSchedule(int id)
		{
			var schedule = await _dbContext.ExaminitionAppointments.FirstAsync(ea => ea.Id == id);

			_dbContext.ExaminitionAppointments.Remove(schedule);
			_dbContext.SaveChanges();

			return Ok(new { success = true, message = "Delete Schedule Successfully" });
		}
	}
}
