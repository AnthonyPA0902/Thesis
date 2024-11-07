using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrivateClinic.Models;
using System.Numerics;

namespace PrivateClinic.Controllers.Admin
{
	[Route("api/admin")]
	[ApiController]
	public class InfoController : ControllerBase
	{
		private PrivateClinicManagementDBContext _dbContext;

		public InfoController(PrivateClinicManagementDBContext dbContext)
		{
			_dbContext = dbContext;
		}

		[HttpGet("info/{id}")]
		public async Task<ActionResult<User>> GetUser(int id)
		{
			var user = await _dbContext.Users.FindAsync(id);
			if (user == null)
			{
				return NotFound();
			}
			return Ok(new { success = true, User = user });
		}

		[HttpPut("info/{id}")]
		public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
		{
			var user = await _dbContext.Users.FindAsync(id);

			user.Name = updatedUser.Name;
			user.Age = updatedUser.Age;
			user.Address = updatedUser.Address;
			user.Phone = updatedUser.Phone;
			user.Email = updatedUser.Email;
			user.Username = updatedUser.Username;
			user.Password = updatedUser.Password;
			user.RoleId = 2;

			_dbContext.Users.Update(user);
			_dbContext.SaveChanges();

			return Ok(new { success = true, message = "Info Update Successfully" });
		}
	}
}
