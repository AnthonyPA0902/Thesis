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
		public async Task<ActionResult> GetSchedulesInfo(
			[FromQuery] string search = "",
			[FromQuery] int page = 1,
			[FromQuery] int pageSize = 5,
			[FromQuery] string date = "" // Add date parameter
	)
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

			var schedulesQuery = _dbContext.ExaminitionAppointments
				.Include(s => s.Doctor)
				.Include(s => s.Treatment)
				.Where(sche => sche.Status == "Đã Thanh Toán");

			// Apply search filter for doctor's name
			if (!string.IsNullOrEmpty(search))
			{
				schedulesQuery = schedulesQuery.Where(schedule =>
					EF.Functions.Like(schedule.Doctor.Name, $"%{search}%"));
			}

			// Apply date filter if provided
			if (!string.IsNullOrEmpty(date))
			{
				var parsedDate = DateOnly.TryParse(date, out var filterDate);
				if (parsedDate)
				{
					schedulesQuery = schedulesQuery.Where(schedule => schedule.Date == filterDate); // Compare only the date part
				}
			}

			// Pagination logic
			var totalRecords = await schedulesQuery.CountAsync();
			var schedules = await schedulesQuery
				.Skip((page - 1) * pageSize) // Skip records for the current page
				.Take(pageSize) // Take only 'pageSize' records
				.Select(schedule => new ScheduleDto
				{
					Id = schedule.Id,
					Name = schedule.Name,
					Phone = schedule.Phone,
					Email = schedule.Email,
					Date = schedule.Date,
					Condition = schedule.Condition,
					DoctorId = schedule.DoctorId,
					DoctorName = schedule.Doctor.Name,
					TreatmentId = schedule.TreatmentId,
					TreatmentName = schedule.Treatment.Name,
				})
				.ToListAsync();

			return Ok(new { success = true, Doctors = doctors, Treatments = treatments, Schedules = schedules, TotalRecords = totalRecords });
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

		[HttpPut("schedule/condition/{id}")]
		public async Task<ActionResult> UpdateScheduleCondition(int id)
		{
			var schedule = await _dbContext.ExaminitionAppointments.FindAsync(id);
			if (schedule == null)
			{
				return NotFound(new { success = false, message = "Schedule not found" });
			}

			schedule.Condition = "Đã Xếp Ca"; // Update the condition

			_dbContext.ExaminitionAppointments.Update(schedule);
			await _dbContext.SaveChangesAsync();

			return Ok(new { success = true, message = "Schedule condition updated successfully" });
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
