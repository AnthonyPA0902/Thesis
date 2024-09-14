using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrivateClinic.Models;

namespace PrivateClinic.Controllers
{
	[Route("api")]
	[ApiController]
	public class LoginController : ControllerBase
	{
		private PrivateClinicManagementDBContext _dbContext;

		public LoginController(PrivateClinicManagementDBContext dbContext)
		{
			_dbContext = dbContext;
		}

		[HttpPost("login")]
		public IActionResult Login(User user)
		{
			var info = _dbContext.Users.SingleOrDefault(u => u.Username == user.Username && u.Password == u.Password);

			if (info == null)
			{
				return BadRequest("Invalid Info");
			}

			return Ok("Login Successfully");
		}
	}
}
