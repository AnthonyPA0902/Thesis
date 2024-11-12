using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrivateClinic.Dtos;
using PrivateClinic.Models;

namespace PrivateClinic.Controllers.Admin
{
	[Route("api/admin")]
	[ApiController]
	public class PatientController : ControllerBase
	{
		private PrivateClinicManagementDBContext _dbContext;

		public PatientController(PrivateClinicManagementDBContext dbContext)
		{
			_dbContext = dbContext;
		}

		[HttpGet("patient")]
		public async Task<IActionResult> GetAllPatients()
		{
			var patients = await _dbContext.Users
			.Where(user => user.RoleId == 1) 
			.ToListAsync();

			if (patients == null || patients.Count == 0)
			{
				return BadRequest(new { success = false, message = "No medicine found" });
			}

			return Ok(new { success = true, Patients = patients });
		}

		[HttpGet("patient/record/{id}")]
		public async Task<IActionResult> GetPatientRecords(int id, int page = 1, int pageSize = 12)
		{
			var recordsQuery = _dbContext.MedicalRecords
				.Include(mr => mr.Customer)
				.Include(mr => mr.MedicalRecordMedicines)
					.ThenInclude(mmr => mmr.Medicine)
				.Where(mr => mr.CustomerId == id)
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
				return Ok(new { success = false, message = "No records found" });
			}

			return Ok(new
			{
				success = true,
				Records = records,
				TotalRecords = totalRecords
			});
		}

		[HttpPost("patient")]
		public async Task<IActionResult> UpdatePatientTable([FromBody] User patient)
		{
			if (patient == null)
			{
				return BadRequest(new { success = false, message = "Patient data is null." });
			}

			var info = new User
			{
				Name = patient.Name,
				Age = patient.Age,
				Address = patient.Address,
				Phone = patient.Phone,
				Email = patient.Email,
				Username = patient.Username,
				Password = patient.Password,
				RoleId = 1,
			};

			await _dbContext.Users.AddAsync(info);
			await _dbContext.SaveChangesAsync();

			return Ok(new { success = true, message = "Patient updated successfully." });
		}

		[HttpGet("patient/{id}")]
		public async Task<ActionResult<User>> GetPatient(int id)
		{
			var patient = await _dbContext.Users.FirstOrDefaultAsync(pat => pat.Id == id); ;
			return Ok(new { success = true, Patient = patient });
		}

		[HttpPut("patient/{id}")]
		public async Task<ActionResult<User>> EditPatient([FromBody] User patient, int id)
		{
			var pat = await _dbContext.Users.FindAsync(id);

			pat.Name = patient.Name;
			pat.Age = patient.Age;
			pat.Address = patient.Address;
			pat.Phone = patient.Phone;
			pat.Email = patient.Email;


			_dbContext.Users.Update(pat);
			_dbContext.SaveChanges();

			return Ok(new { success = true, message = "Edit Patient Successfully" });
		}


		[HttpDelete("patient/{id}")]
		public async Task<ActionResult<User>> DeletePatient(int id)
		{
			var patient = await _dbContext.Users.FirstAsync(pat => pat.Id == id);

			_dbContext.Users.Remove(patient);
			_dbContext.SaveChanges();

			return Ok(new { success = true, message = "Delete Patient Successfully" });
		}


	}
}
