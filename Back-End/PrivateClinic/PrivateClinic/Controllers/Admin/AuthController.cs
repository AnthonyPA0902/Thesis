using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PrivateClinic.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace PrivateClinic.Controllers.Admin
{
	[Route("api/admin")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private PrivateClinicManagementDBContext _dbContext;

		public AuthController(PrivateClinicManagementDBContext dbContext)
		{
			_dbContext = dbContext;
		}

		[HttpPost("auth")]
		public IActionResult Auth(User user)
		{
			var info = _dbContext.Users.SingleOrDefault(u => u.Username == user.Username && u.Password == u.Password);

			if (info == null)
			{
				return Ok(new { success = false, message = "Bạn Đã Nhập Sai Tên Tài Khoản Hoặc Mật Khẩu" });
			}

			if (info.RoleId == 1) // Ngăn chặn khách hàng truy cập vào
			{
				return Ok(new { success = false, message = "Tài khoản của bạn không có quyền truy cập." });
			}

			var token = GenerateJwtToken(info);

			return Ok(new { success = true, Token = token, message = "Đăng Nhập Thành Công" });
		}

		private string GenerateJwtToken(User user)
		{
			var tokenHandler = new JwtSecurityTokenHandler();
			byte[] key = new byte[32];

			using (var rng = RandomNumberGenerator.Create())
			{
				rng.GetBytes(key);
			}

			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(new Claim[]
				{
					new Claim("user_id", user.Id.ToString()),
					new Claim("user_name", user.Name.ToString()),
					new Claim("user_age", user.Age.ToString()??""),
					new Claim("user_address", user.Address.ToString()),
					new Claim("user_email", user.Email.ToString()),
					new Claim("user_phone", user.Phone.ToString()),
					new Claim("user_username", user.Username.ToString()),
				}),
				Expires = DateTime.UtcNow.AddHours(2),
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
			};

			var token = tokenHandler.CreateToken(tokenDescriptor);
			return tokenHandler.WriteToken(token);
		}
	}
}
