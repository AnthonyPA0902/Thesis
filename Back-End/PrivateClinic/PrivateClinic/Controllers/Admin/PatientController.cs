using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrivateClinic.Dtos;
using PrivateClinic.Models;

namespace PrivateClinic.Controllers.Admin
{
	[Route("api/admin")]
	[ApiController]
	public class PatientController : ControllerBase
	{
		private PrivateClinicManagementDBContext _dbContext;

		public PatientController(PrivateClinicManagementDBContext dbContext)
		{
			_dbContext = dbContext;
		}

		[HttpGet("patient")]
		public async Task<IActionResult> GetAllPatients()
		{
			var patients = await _dbContext.Users
			.Where(user => user.RoleId == 1) 
			.ToListAsync();

			if (patients == null || patients.Count == 0)
			{
				return BadRequest(new { success = false, message = "No medicine found" });
			}

			return Ok(new { success = true, Patients = patients });
		}


	}
}
