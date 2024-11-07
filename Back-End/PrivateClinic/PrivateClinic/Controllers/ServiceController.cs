using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrivateClinic.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace PrivateClinic.Controllers
{
	[Route("api/service")]
	[ApiController]
	public class ServiceController : ControllerBase
	{
		private PrivateClinicManagementDBContext _dbContext;

		public ServiceController(PrivateClinicManagementDBContext dbContext)
		{
			_dbContext = dbContext;
		}

		[HttpGet]
		public async Task<IActionResult> GetTreatments(int pageNumber, int pageSize, string searchTerm = "")
		{
			// Build the query for filtering based on the search term (if provided)
			IQueryable<Treatment> query = _dbContext.Treatments;

			if (!string.IsNullOrEmpty(searchTerm))
			{
				// Use case-insensitive search with LIKE (or regular expressions)
				query = query.Where(t => EF.Functions.Like(t.Name, $"%{searchTerm}%"));
			}

			// Apply pagination
			var treatments = await query
				.Skip((pageNumber - 1) * pageSize)
				.Take(pageSize)
				.Select(t => new
				{
					t.Id,
					t.Name,
					t.Session,
					t.Price,
					Image = t.Image != null ? Convert.ToBase64String(t.Image) : null // Convert byte[] to base64 string
				})
				.ToListAsync();

			// Get the total count of records matching the search query
			var totalTreatments = await query.CountAsync();
			var totalPages = (int)Math.Ceiling(totalTreatments / (double)pageSize);

			// Return the filtered and paginated data
			return Ok(new { treatments, totalPages });
		}
	}
}
