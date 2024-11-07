using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrivateClinic.Dtos;
using PrivateClinic.Models;

namespace PrivateClinic.Controllers.Admin
{
	[Route("api/admin")]
	[ApiController]
	public class TreatmentController : ControllerBase
	{
		private PrivateClinicManagementDBContext _dbContext;

		public TreatmentController(PrivateClinicManagementDBContext dbContext)
		{
			_dbContext = dbContext;
		}

		[HttpGet("treatment")]
		public async Task<IActionResult> GetAllTreatments()
		{
			var treatments = await _dbContext.Treatments.ToListAsync();

			if (treatments == null || treatments.Count == 0)
			{
				return BadRequest(new { success = false, message = "No treatment found" });
			}

			return Ok(new { success = true, Treatments = treatments });
		}

		[HttpPost("treatment")]
		public async Task<IActionResult> AddTreatment([FromForm] TheTreatmentDto treatmentDto, IFormFile image)
		{
			if (image != null && image.Length > 0)
			{
				using (var memoryStream = new MemoryStream())
				{
					await image.CopyToAsync(memoryStream);
					treatmentDto.Image = memoryStream.ToArray();
				}
			}

			// Save treatmentDto to the database

			var treatment = new Treatment
			{
				Name = treatmentDto.Name,
				Session = treatmentDto.Session,
				Price = treatmentDto.Price,
				Image = treatmentDto.Image
			};

			_dbContext.Treatments.Add(treatment);
			await _dbContext.SaveChangesAsync();

			return Ok(new { success = true, message = "Create treatment successfully" });
		}


		[HttpGet("treatment/{id}")]
		public async Task<ActionResult<User>> GetDoctor(int id)
		{
			var treatment = await _dbContext.Treatments.FirstOrDefaultAsync(doc => doc.Id == id); ;
			return Ok(new { success = true, Treatment = treatment });
		}

		[HttpPut("treatment/{id}")]
		public async Task<IActionResult> EditTreatment(int id, [FromForm] TheTreatmentDto treatmentDto, IFormFile image)
		{
			var treatment = await _dbContext.Treatments.FindAsync(id);

			if (treatment == null)
			{
				return BadRequest(new { success = false, message = "Treatment data is null." });
			}

			treatment.Name = treatmentDto.Name;
			treatment.Session = treatmentDto.Session;
			treatment.Price = treatmentDto.Price;

			if (image != null && image.Length > 0)
			{
				using (var memoryStream = new MemoryStream())
				{
					await image.CopyToAsync(memoryStream);
					treatment.Image = memoryStream.ToArray();
				}
			}

			await _dbContext.SaveChangesAsync();

			return Ok(new { success = true, message = "Edit treatment successfully" });
		}

		[HttpDelete("treatment/{id}")]
		public async Task<IActionResult> DeleteTreatment(int id)
		{
			var treatment = await _dbContext.Treatments.FindAsync(id);

			if (treatment == null)
			{
				return BadRequest(new { success = false, message = $"Treatment with id {id} not found." });
			}

			_dbContext.Treatments.Remove(treatment);
			await _dbContext.SaveChangesAsync();

			return Ok(new { success = true, message = "Delete treatment successfully" });
		}
	}
}
