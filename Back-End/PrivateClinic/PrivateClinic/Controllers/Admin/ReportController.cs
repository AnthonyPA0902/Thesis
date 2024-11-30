using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using PrivateClinic.Dtos;
using PrivateClinic.Models;
using System.Numerics;

namespace PrivateClinic.Controllers.Admin
{
	[Route("api/admin/report")]
	[ApiController]
	public class ReportController : ControllerBase
	{
		private PrivateClinicManagementDBContext _dbContext;

		public ReportController(PrivateClinicManagementDBContext dbContext)
		{
			_dbContext = dbContext;
		}

		[HttpGet("doctors")]
		public async Task<ActionResult> GetDoctors()
		{
			// Query to fetch doctors with RoleId = 2
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

			// Fetch all doctors from the query
			var doctors = await doctorsQuery.ToListAsync();

			// Return the response
			return Ok(new
			{
				success = true,
				Doctors = doctors,
				TotalCount = doctors.Count
			});
		}

		[HttpGet("doctor/{id}")]
		public async Task<ActionResult> GetDoctor(int id)
		{
			// Query to fetch doctors with RoleId = 2
			var doctorQuery = _dbContext.Users
				.Where(user => user.RoleId == 2 && user.Id == id)
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

			// Fetch all doctors from the query
			var doctor = await doctorQuery.ToListAsync();

			// Return the response
			return Ok(new
			{
				success = true,
				Doctor = doctor
			});
		}

		[HttpGet("generateReport")]
		public IActionResult GenerateReport([FromQuery] int doctorId, [FromQuery] int month, [FromQuery] int year)
		{
			var doctor = _dbContext.Users.FirstOrDefault(u => u.Id == doctorId && u.RoleId == 2); 

			var checkups = _dbContext.Checkups
				.Include(c => c.Treatment)
				.Where(c => c.DoctorId == doctorId &&
							c.Date.HasValue &&
							c.Date.Value.Year == year &&
							c.Date.Value.Month == month)
				.ToList();

			if (!checkups.Any())
			{
				return BadRequest("No data found for the selected filters.");
			}

			// Set EPPlus license context to non-commercial (if you're not using it commercially)
			ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
			string reportFileName = $"Report {month:D2}-{year}";

			using (var package = new ExcelPackage())
			{
				var worksheet = package.Workbook.Worksheets.Add("Report");

				// Row 1: Title (BÁO CÁO CA KHÁM BỆNH THÁNG X / NĂM X)
				worksheet.Cells[1, 1].Value = $"BÁO CÁO CA KHÁM BỆNH THÁNG {month} / NĂM {year}";
				worksheet.Cells[1, 1, 1, 6].Merge = true; // Merge cells for the title
				worksheet.Cells[1, 1].Style.Font.Size = 14;
				worksheet.Cells[1, 1].Style.Font.Bold = true;
				worksheet.Cells[1, 1].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

				// Row 2: Doctor (Bác Sĩ)
				worksheet.Cells[2, 1].Value = $"Bác Sĩ: {doctor.Name}";
				worksheet.Cells[2, 1, 2, 6].Merge = true; // Merge cells for the date
				worksheet.Cells[2, 1].Style.Font.Size = 12;
				worksheet.Cells[2, 1].Style.Font.Bold = true;
				worksheet.Cells[2, 1].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

				// Row 3: Date Exported (Ngày xuất: [DateNow])
				worksheet.Cells[3, 1].Value = $"Ngày xuất: {DateTime.Now.ToString("yyyy-MM-dd")}";
				worksheet.Cells[3, 1, 3, 6].Merge = true; // Merge cells for the date
				worksheet.Cells[3, 1].Style.Font.Size = 12;
				worksheet.Cells[3, 1].Style.Font.Bold = true;
				worksheet.Cells[3, 1].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

				// Row 4: Headers (Patient Name, Phone, Checkup Date)
				worksheet.Cells[4, 1].Value = "STT";
				worksheet.Cells[4, 2].Value = "Tên Bệnh Nhân";
				worksheet.Cells[4, 3].Value = "Ngày Khám";
				worksheet.Cells[4, 4].Value = "Giờ Khám";
				worksheet.Cells[4, 5].Value = "Phòng Khám";
				worksheet.Cells[4, 6].Value = "Liệu Trình";
				worksheet.Cells[4, 1, 4, 6].Style.Font.Bold = true;
				worksheet.Cells[4, 1, 4, 6].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
				worksheet.Cells[4, 1, 4, 6].Style.Border.Top.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
				worksheet.Cells[4, 1, 4, 6].Style.Border.Bottom.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;

				// Add data starting from row 5
				for (int i = 0; i < checkups.Count; i++)
				{
					worksheet.Cells[i + 5, 1].Value = i+1;
					worksheet.Cells[i + 5, 2].Value = checkups[i].Name;
					worksheet.Cells[i + 5, 3].Value = checkups[i].Date?.ToString("yyyy-MM-dd");
					worksheet.Cells[i + 5, 4].Value = checkups[i].StartTime?.ToString("HH:mm") + "-" + checkups[i].EndTime?.ToString("HH:mm");
					worksheet.Cells[i + 5, 5].Value = checkups[i].Room;
					worksheet.Cells[i + 5, 6].Value = checkups[i].Treatment.Name;
				}

				worksheet.Cells.AutoFitColumns();

				var stream = new MemoryStream(package.GetAsByteArray());
				return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"{reportFileName}.xlsx");
			}
		}

	}
}
