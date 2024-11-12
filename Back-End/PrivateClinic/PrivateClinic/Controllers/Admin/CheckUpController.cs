using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrivateClinic.Dtos;
using PrivateClinic.Models;

namespace PrivateClinic.Controllers.Admin
{
	[Route("api/admin")]
	[ApiController]
	public class CheckUpController : ControllerBase
	{
		private PrivateClinicManagementDBContext _dbContext;

		public CheckUpController(PrivateClinicManagementDBContext dbContext)
		{
			_dbContext = dbContext;
		}

		[HttpGet("checkup")]
		public async Task<ActionResult> GetCheckupInfo()
		{
			var doctors = await _dbContext.Users
				.Where(user => user.RoleId == 2) // Filter by RoleId
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

			var checkups = await _dbContext.Checkups
					.Include(c => c.Doctor) 
					.Include(c => c.Treatment) 
					.Select(checkup => new CheckUpDto
					{
						Id = checkup.Id,
						Name = checkup.Name,
						Phone = checkup.Phone,
						AppointmentDate = checkup.Date,
						StartTime = checkup.StartTime,
						EndTime = checkup.EndTime,
						Room = checkup.Room,
						Status = checkup.Status,
						DoctorName = checkup.Doctor.Name,
						TreatmentName = checkup.Treatment.Name,
						DoctorId = checkup.Doctor.Id,
						TreatmentId = checkup.Treatment.Id,
					})
					.ToListAsync();

			return Ok(new { success = true, Doctors = doctors, Treatments = treatments, Checkups = checkups });
		}

		[HttpGet("checkup/doctor/{id}")]
		public async Task<ActionResult> GetDoctorCheckupInfo(int id)
		{
			var doctors = await _dbContext.Users
				.Where(user => user.RoleId == 2) // Filter by RoleId
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

			var checkups = await _dbContext.Checkups
					.Include(c => c.Doctor)
					.Include(c => c.Treatment)
					.Where(c => c.DoctorId == id)
					.Select(checkup => new CheckUpDto
					{
						Id = checkup.Id,
						Name = checkup.Name,
						Phone = checkup.Phone,
						AppointmentDate = checkup.Date,
						StartTime = checkup.StartTime,
						EndTime = checkup.EndTime,
						Room = checkup.Room,
						Status = checkup.Status,
						DoctorName = checkup.Doctor.Name,
						TreatmentName = checkup.Treatment.Name,
						DoctorId = checkup.Doctor.Id,
					})
					.ToListAsync();

			return Ok(new { success = true, Doctors = doctors, Treatments = treatments, Checkups = checkups });
		}

		[HttpPost("checkup")]
		public IActionResult UpdateCheckUpTable([FromBody] Checkup checkup)
		{
			if (checkup == null)
			{
				return BadRequest(new { success = false, message = "Checkup data is null." });
			}
			else
			{
				// Log the incoming data for debugging
				Console.WriteLine("Received checkup data:", checkup);
				var info = new Checkup
				{
					Name = checkup.Name,
					Phone = checkup.Phone,
					Date = checkup.Date,
					StartTime = checkup.StartTime,
					EndTime = checkup.EndTime,
					Room = checkup.Room,
					Status = "Chưa Hoàn Thành",
					DoctorId = checkup.DoctorId,
					TreatmentId = checkup.TreatmentId
				};

				_dbContext.Checkups.Add(info);
				_dbContext.SaveChanges();

				return Ok(new { success = true, message = "Checkup updated successfully." });
			}
		}

		[HttpPut("checkup/{id}")]
		public async Task<ActionResult<Checkup>> EditCheckUp([FromBody] Checkup checkup, int id)
		{
			var ck = await _dbContext.Checkups.FindAsync(id);

			if (ck == null)
			{
				return BadRequest(new { success = false, message = "Checkup data is null." });
			}

			ck.Name = checkup.Name;
			ck.Phone = checkup.Phone;
			ck.Date = checkup.Date;
			ck.StartTime = checkup.StartTime;
			ck.EndTime = checkup.EndTime;
			ck.Room = checkup.Room;
			ck.Status = checkup.Status;
			ck.DoctorId = checkup.DoctorId;
			ck.TreatmentId = checkup.TreatmentId;

			_dbContext.Checkups.Update(ck);
			_dbContext.SaveChanges();

			return Ok(new { success = true, message = "Edit CheckUp Successfully" });
		}

		[HttpPut("checkup/finish/{id}")]
		public async Task<ActionResult<Checkup>> FinishCheckUp(int id)
		{
			var ck = await _dbContext.Checkups.FindAsync(id);

			if (ck == null)
			{
				return BadRequest(new { success = false, message = "Checkup data is null." });
			}

			ck.Status = "Hoàn Thành";

			_dbContext.Checkups.Update(ck);
			_dbContext.SaveChanges();

			return Ok(new { success = true, message = "Edit CheckUp Successfully" });
		}

		[HttpPut("checkup/complete/{id}")]
		public async Task<ActionResult<Checkup>> CompleteCheckUp(int id)
		{
			var ck = await _dbContext.Checkups.FindAsync(id);

			if (ck == null)
			{
				return BadRequest(new { success = false, message = "Checkup data is null." });
			}

			ck.Status = "Hoàn Thành Tốt";

			_dbContext.Checkups.Update(ck);
			_dbContext.SaveChanges();

			return Ok(new { success = true, message = "Edit CheckUp Successfully" });
		}

		[HttpDelete("checkup/{id}")]
		public async Task<ActionResult<Checkup>> DeleteCheckUp(int id)
		{
			var checkup = await _dbContext.Checkups.FirstAsync(ck => ck.Id == id);

			_dbContext.Checkups.Remove(checkup);
			_dbContext.SaveChanges();

			return Ok(new { success = true, message = "Delete CheckUp Successfully" });
		}

	}
}
