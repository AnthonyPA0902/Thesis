using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrivateClinic.Dtos;
using PrivateClinic.Models;
using System.Net;
using System.Numerics;

namespace PrivateClinic.Controllers.Admin
{
	[Route("api/admin")]
	[ApiController]
	public class DoctorController : ControllerBase
	{
		private PrivateClinicManagementDBContext _dbContext;

		public DoctorController(PrivateClinicManagementDBContext dbContext)
		{
			_dbContext = dbContext;
		}

		[HttpGet("doctor")]
		public async Task<ActionResult> GetDoctors(int page = 1, int pageSize = 5)
		{
			var doctorsQuery = _dbContext.Users
				.Where(user => user.RoleId == 2)
				.Select(doctor => new DoctorDto
				{
					Id = doctor.Id,
					Name = doctor.Name,
					Age = doctor.Age,
					Address = doctor.Address,
					Email = doctor.Email,
					Phone = doctor.Phone,
					Username = doctor.Username,
					Password = doctor.Password,
					RoleId = doctor.RoleId,
				});

			var totalDoctors = await doctorsQuery.CountAsync();
			var doctors = await doctorsQuery
				.Skip((page - 1) * pageSize)
				.Take(pageSize)
				.ToListAsync();

			return Ok(new
			{
				success = true,
				Info = doctorsQuery,
				Doctors = doctors,
				TotalCount = totalDoctors,
				PageSize = pageSize,
				CurrentPage = page
			});
		}


		[HttpPost("doctor")]
		public async Task<IActionResult> UpdateDoctorTable([FromBody] User doctor)
		{
			if (doctor == null)
			{
				return BadRequest(new { success = false, message = "Doctor data is null." });
			}

			var info = new User
			{
				Name = doctor.Name,
				Age = doctor.Age,
				Address = doctor.Address,
				Phone = doctor.Phone,
				Email = doctor.Email,
				Username = doctor.Username,
				Password = doctor.Password,
				RoleId = 2,
			};

			await _dbContext.Users.AddAsync(info);
			await _dbContext.SaveChangesAsync();

			return Ok(new { success = true, message = "Doctor updated successfully." });
		}

		[HttpGet("doctor/{id}")]
		public async Task<ActionResult<User>> GetDoctor(int id)
		{
			var doctor = await _dbContext.Users.FirstOrDefaultAsync(doc => doc.Id == id); ;
			return Ok(new { success = true, Doctor = doctor });
		}

		[HttpPut("doctor/{id}")]
		public async Task<ActionResult<User>> EditDoctor([FromBody] User doctor, int id)
		{
			var doc = await _dbContext.Users.FindAsync(id);

			doc.Name = doctor.Name;
			doc.Age = doctor.Age;
			doc.Address = doctor.Address;
			doc.Phone = doctor.Phone;
			doc.Email = doctor.Email;
			doc.Username = doctor.Username;
			doc.Password = doctor.Password;
			doc.RoleId = 2;

			_dbContext.Users.Update(doc);
			_dbContext.SaveChanges();

			return Ok(new { success = true, message = "Edit Doctor Successfully" });
		}


		[HttpDelete("doctor/{id}")]
		public async Task<ActionResult<User>> DeleteDoctor(int id)
		{
			var doctor = await _dbContext.Users.FirstAsync(doc => doc.Id == id);

			_dbContext.Users.Remove(doctor);
			_dbContext.SaveChanges();

			return Ok(new { success = true, message = "Delete Doctor Successfully" });
		}
	}
}
