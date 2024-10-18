using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrivateClinic.Dtos;
using PrivateClinic.Models;

namespace PrivateClinic.Controllers.Admin
{
	[Route("api/admin")]
	[ApiController]
	public class EquipmentController : ControllerBase
	{
		private PrivateClinicManagementDBContext _dbContext;

		public EquipmentController(PrivateClinicManagementDBContext dbContext)
		{
			_dbContext = dbContext;
		}

		[HttpGet("equipment")]
		public async Task<ActionResult> GetEquipments()
		{
			var equipments = await _dbContext.Equipment
					.Select(equipment => new EquipmentDto
					{
						Id = equipment.Id,
						Name = equipment.Name,
						Status = equipment.Status,
						CleaningTime = equipment.CleaningTime,
						Maintenance = equipment.Maintenance,
					})
					.ToListAsync();

			return Ok(new { success = true, Equipments = equipments });
		}


		[HttpPost("equipment")]
		public async Task<IActionResult> UpdateEquipmentTable([FromBody] Equipment equipment)
		{
			if (equipment == null)
			{
				return BadRequest(new { success = false, message = "Equipment data is null." });
			}

			var info = new Equipment
			{
				Name = equipment.Name,
				Status = equipment.Status,
				CleaningTime = equipment.CleaningTime,
				Maintenance = equipment.Maintenance,
			};

			await _dbContext.Equipment.AddAsync(info);
			await _dbContext.SaveChangesAsync();

			return Ok(new { success = true, message = "Equipment updated successfully." });
		}

		[HttpGet("equipment/{id}")]
		public async Task<ActionResult<Equipment>> GetEquipment(int id)
		{
			var equipment = await _dbContext.Equipment.FirstOrDefaultAsync(eqt => eqt.Id == id); ;
			return Ok(new { success = true, Equipment = equipment });
		}

		[HttpPut("equipment/{id}")]
		public async Task<ActionResult<User>> EditEquipment([FromBody] Equipment equipment, int id)
		{
			var eq = await _dbContext.Equipment.FindAsync(id);

			eq.Name = equipment.Name;
			eq.Status = equipment.Status;
			eq.CleaningTime = equipment.CleaningTime;
			eq.Maintenance = equipment.Maintenance;

			_dbContext.Equipment.Update(eq);
			_dbContext.SaveChanges();

			return Ok(new { success = true, message = "Edit Equipment Successfully" });
		}


		[HttpDelete("equipment/{id}")]
		public async Task<ActionResult<User>> DeleteEquipment(int id)
		{
			var equipment = await _dbContext.Equipment.FirstAsync(eqt => eqt.Id == id);

			_dbContext.Equipment.Remove(equipment);
			_dbContext.SaveChanges();

			return Ok(new { success = true, message = "Delete Equipment Successfully" });
		}
	}
}
