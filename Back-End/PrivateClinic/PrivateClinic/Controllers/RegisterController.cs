using Microsoft.AspNetCore.Mvc;
using PrivateClinic.Models;

namespace PrivateClinic.Controllers
{
	[Route("api")]
	[ApiController]
	public class RegisterController : ControllerBase
	{
		private PrivateClinicManagementDBContext _dbContext;

		public RegisterController(PrivateClinicManagementDBContext dbContext)
		{
			_dbContext = dbContext;
		}

		[HttpPost("register")]
		public IActionResult Register([FromBody] User user)
		{
			if (user == null)
			{
				return Ok(new { success = true, message = "Thông Tin Đăng Ký Không Hợp Lệ" });
			}
			else
			{
				var info = new User
				{
					Name = user.Name,
					Age = user.Age,
					Address = user.Address,
					Phone = user.Phone,
					Email = user.Email,
					Username = user.Username,
					Password = user.Password,
					RoleId = 1,
				};

				_dbContext.Users.Add(info);
				_dbContext.SaveChanges();

				return Ok(new {success = true, message = " Đăng Ký Thành Công"});
			} 
				
		}
	}
}
