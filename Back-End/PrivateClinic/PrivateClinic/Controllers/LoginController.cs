using Google.Apis.Auth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.SqlServer.Server;
using PrivateClinic.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;

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
			var info = _dbContext.Users.SingleOrDefault(u => u.Username == user.Username && u.Password == user.Password);

			if (info == null)
			{
				return Ok(new { success = false, message = "Bạn Đã Nhập Sai Tên Tài Khoản Hoặc Mật Khẩu" });
			}

			if (info.RoleId != 1) // Chỉ khách hàng được đăng nhập vào
			{
				return Ok(new { success = false, message = "Tài Khoản Của Bạn Không Phải Là Khách Hàng" });
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

		[HttpPost("google-login")]
		public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequest request)
		{
			var payload = await GoogleJsonWebSignature.ValidateAsync(request.TokenId);
			var user = _dbContext.Users.SingleOrDefault(u => u.Email == payload.Email);

			if (user == null)
			{
				return Ok(new { success = false, message = "Người Dùng Không Tồn Tại" });
			}

			var token = GenerateJwtToken(user);
			return Ok(new { success = true, token });
		}

		public class GoogleLoginRequest
		{
			public string TokenId { get; set; }
		}
	}
}
