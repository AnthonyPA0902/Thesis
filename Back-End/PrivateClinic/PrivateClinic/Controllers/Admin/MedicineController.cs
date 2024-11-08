using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrivateClinic.Dtos;
using PrivateClinic.Models;

namespace PrivateClinic.Controllers.Admin
{
	[Route("api/admin")]
	[ApiController]
	public class MedicineController : ControllerBase
	{
		private PrivateClinicManagementDBContext _dbContext;

		public MedicineController(PrivateClinicManagementDBContext dbContext)
		{
			_dbContext = dbContext;
		}

		[HttpGet("medicine")]
		public async Task<IActionResult> GetAllMedicines()
		{
			var medicines = await _dbContext.MedicineStorages.ToListAsync();

			if (medicines == null || medicines.Count == 0)
			{
				return BadRequest(new { success = false, message = "No medicine found" });
			}

			return Ok(new { success = true, Medicines = medicines });
		}


		[HttpGet("medicine/query")]
		public async Task<IActionResult> GetAllMedicines(int page = 1, int pageSize = 10, string filter = "")
		{
			// Get unique medicine names
			var uniqueMedicineNames = await _dbContext.MedicineStorages
				.Where(m => string.IsNullOrEmpty(filter) || m.Name.Contains(filter)) // Filter by name if provided
				.Select(m => m.Name)
				.Distinct()
				.ToListAsync();

			// Pagination: Get medicines based on the current page
			var medicines = await _dbContext.MedicineStorages
				.Where(m => string.IsNullOrEmpty(filter) || m.Name.Contains(filter))
				.Skip((page - 1) * pageSize)
				.Take(pageSize)
				.ToListAsync();

			if (medicines == null || medicines.Count == 0)
			{
				return BadRequest(new { success = false, message = "No medicine found" });
			}

			return Ok(new
			{
				success = true,
				medicines = medicines,
				uniqueMedicineNames = uniqueMedicineNames, // Return the list of unique medicine names
				totalMedicines = await _dbContext.MedicineStorages.CountAsync() // Return the total count for pagination
			});
		}


		[HttpPost("medicine")]
		public async Task<IActionResult> AddMedicine([FromBody] MedicineDto medicineDto)
		{
			// Save medicineDto to the database

			var medicine = new MedicineStorage
			{
				Name = medicineDto.Name,
				Available = medicineDto.Available,
				Total = medicineDto.Total,
				ExpiredDate = medicineDto.ExpiredDate,
			};

			_dbContext.MedicineStorages.Add(medicine);
			await _dbContext.SaveChangesAsync();

			return Ok(new { success = true, message = "Create medicine successfully" });
		}


		[HttpGet("medicine/{id}")]
		public async Task<ActionResult<MedicineStorage>> GetMedicine(int id)
		{
			var medicine = await _dbContext.MedicineStorages.FirstOrDefaultAsync(med => med.Id == id); ;
			return Ok(new { success = true, Treatment = medicine });
		}

		[HttpPut("medicine/{id}")]
		public async Task<IActionResult> EditMedicine(int id, [FromBody] MedicineDto medicineDto)
		{
			var medicine = await _dbContext.MedicineStorages.FindAsync(id);

			if (medicine == null)
			{
				return BadRequest(new { success = false, message = "Medicine data is null." });
			}

			medicine.Name = medicineDto.Name;
			medicine.Available = medicineDto.Available;
			medicine.Total = medicineDto.Total;
			medicine.ExpiredDate = medicineDto.ExpiredDate;

			await _dbContext.SaveChangesAsync();

			return Ok(new { success = true, message = "Edit Medicine successfully" });
		}

		[HttpDelete("medicine/{id}")]
		public async Task<IActionResult> DeleteMedicine(int id)
		{
			var medicine = await _dbContext.MedicineStorages.FindAsync(id);

			if (medicine == null)
			{
				return BadRequest(new { success = false, message = $"Medicine with id {id} not found." });
			}

			_dbContext.MedicineStorages.Remove(medicine);
			await _dbContext.SaveChangesAsync();

			return Ok(new { success = true, message = "Delete medicine successfully" });
		}
	}
}
