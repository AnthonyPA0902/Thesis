using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrivateClinic.Dtos;
using PrivateClinic.Models;

namespace PrivateClinic.Controllers.Admin
{
	[Route("api/admin")]
	[ApiController]
	public class MedicalRecordController : ControllerBase
	{
		private PrivateClinicManagementDBContext _dbContext;

		public MedicalRecordController(PrivateClinicManagementDBContext dbContext)
		{
			_dbContext = dbContext;
		}

		[HttpGet("record")]
		public async Task<IActionResult> GetAllRecords(int page = 1, int pageSize = 12)
		{
			var recordsQuery = _dbContext.MedicalRecords
				.Include(mr => mr.Customer)
				.Include(mr => mr.MedicalRecordMedicines)
					.ThenInclude(mmr => mmr.Medicine)
				.Select(mr => new MedicalRecordDto
				{
					Id = mr.Id,
					CheckUp = mr.Checkup,
					Treatment = mr.Treatment,
					Description = mr.Description,
					RecordDate = mr.RecordDate,
					CustomerId = mr.CustomerId,
					CustomerName = mr.Customer.Name,
					Medicines = mr.MedicalRecordMedicines.Select(mmr => new MedicineStorageDto
					{
						MedicineId = mmr.MedicineId,
						MedicineName = mmr.Medicine.Name,
						Quantity = mmr.Quantity,
						Note = mmr.Note
					}).ToList()
				});

			// Get the total number of records for pagination
			var totalRecords = await recordsQuery.CountAsync();

			// Apply pagination
			var records = await recordsQuery
				.Skip((page - 1) * pageSize)
				.Take(pageSize)
				.ToListAsync();

			if (records == null || records.Count == 0)
			{
				return BadRequest(new { success = false, message = "No records found" });
			}

			return Ok(new
			{
				success = true,
				Records = records,
				TotalRecords = totalRecords
			});
		}

		[HttpPost("record")]
		public async Task<IActionResult> CreateMedicalRecord([FromBody] MedicalRecordWithMedicineDto recordDto)
		{
			if (recordDto == null || recordDto.Medicines == null || !recordDto.Medicines.Any())
			{
				return BadRequest(new { success = false, message = "Invalid record data" });
			}

			// Validate all medicines before creating the medical record
			foreach (var medicineDto in recordDto.Medicines)
			{
				var medicineStorage = await _dbContext.MedicineStorages
										.FirstOrDefaultAsync(ms => ms.Id == medicineDto.MedicineId);

				if (medicineStorage == null)
				{
					return Ok(new { success = false, message = "Không tìm thấy thuốc." });
				}
				else if (medicineDto.Quantity > medicineStorage.Available)
				{
					return Ok(new { success = false, message = "Số lượng thuốc không đủ." });
				}
			}

			// All medicines are valid, so proceed to create the medical record
			var medicalRecord = new MedicalRecord
			{
				Checkup = recordDto.CheckUp,
				Treatment = recordDto.Treatment,
				RecordDate = recordDto.RecordDate,
				Description = recordDto.Description,
				CustomerId = recordDto.CustomerId,
			};

			// Save the medical record first to generate the Id
			_dbContext.MedicalRecords.Add(medicalRecord);
			await _dbContext.SaveChangesAsync();

			foreach (var medicineDto in recordDto.Medicines)
			{
				var medicineStorage = await _dbContext.MedicineStorages
									.FirstOrDefaultAsync(ms => ms.Id == medicineDto.MedicineId);

				var medicalMedicineRecord = new MedicalRecordMedicine
				{
					RecordId = medicalRecord.Id,
					MedicineId = medicineDto.MedicineId,
					Quantity = medicineDto.Quantity,
					Note = medicineDto.Note,
				};
				_dbContext.MedicalRecordMedicines.Add(medicalMedicineRecord);

				// Update the available quantity in MedicineStorage
				medicineStorage.Available -= medicineDto.Quantity;
			}

			await _dbContext.SaveChangesAsync();

			return Ok(new { success = true, message = "Medical record created successfully" });
		}

	}
}
