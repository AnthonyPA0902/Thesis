﻿using Microsoft.AspNetCore.Http;
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
						DoctorName = checkup.Doctor.Name,
						TreatmentName = checkup.Treatment.Name 
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
					DoctorId = checkup.DoctorId,
					TreatmentId = checkup.TreatmentId
				};

				_dbContext.Checkups.Add(info);
				_dbContext.SaveChanges();

				return Ok(new { success = true, message = "Checkup updated successfully." });
			}
		}
	}
}
