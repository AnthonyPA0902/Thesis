using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrivateClinic.Models;

namespace PrivateClinic.Controllers
{
	[Route("api/detail")]
	[ApiController]
	public class DetailController : ControllerBase
	{
		private PrivateClinicManagementDBContext _dbContext;

		public DetailController(PrivateClinicManagementDBContext dbContext)
		{
			_dbContext = dbContext;
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetTreatmentDetail(int id)
		{
			// Query for the specific treatment along with related details, if any
			var treatment = await _dbContext.Treatments
				.Include(t => t.TreatmentDetails) // Assume TreatmentDetails is a related entity if it exists
				.Where(t => t.Id == id)
				.Select(t => new
				{
					t.Id,
					t.Name,
					t.Session,
					t.Price,
					Image = t.Image != null ? Convert.ToBase64String(t.Image) : null, // Convert byte[] to base64 string if needed
					Details = t.TreatmentDetails.Select(d => new
					{
						d.Id,
						d.Details,
						d.TreatmentId
					})
				})
				.FirstOrDefaultAsync();

			if (treatment == null)
			{
				return NotFound(new { success = false, message = "Treatment not found" });
			}

			return Ok(new { success = true, Treatment = treatment });
		}


		[HttpPost("{treatmentId}")]
		public async Task<ActionResult> AddTreatmentDetail(int treatmentId, [FromBody] TreatmentDetail newDetail)
		{
			if (newDetail == null || string.IsNullOrEmpty(newDetail.Details))
			{
				return BadRequest("Detail cannot be empty.");
			}

			var treatment = await _dbContext.Treatments.FindAsync(treatmentId);
			if (treatment == null)
			{
				return NotFound("Treatment not found.");
			}

			// Create new treatment detail and associate it with the treatment
			var detail = new TreatmentDetail
			{
				Details = newDetail.Details,
				TreatmentId = treatmentId,
			};

			_dbContext.TreatmentDetails.Add(detail);
			await _dbContext.SaveChangesAsync();

			return Ok(new { success = true, message = "Detail added successfully!" });
		}

	}
}
