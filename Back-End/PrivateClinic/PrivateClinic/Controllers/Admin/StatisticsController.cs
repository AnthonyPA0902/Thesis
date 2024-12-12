using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrivateClinic.Dtos;
using PrivateClinic.Models;

namespace PrivateClinic.Controllers.Admin
{
	[Route("api/admin")]
	[ApiController]
	public class StatisticsController : ControllerBase
	{
		private PrivateClinicManagementDBContext _dbContext;

		public StatisticsController(PrivateClinicManagementDBContext dbContext)
		{
			_dbContext = dbContext;
		}

		[HttpGet("agechart")]
		public async Task<List<CustomerAgeStatDto>> GetCustomerAgeStats()
		{
			var now = DateTime.UtcNow;
			var ageGroups = new Dictionary<string, int>
			{
				{ "0-18", 0 },
				{ "19-30", 0 },
				{ "31-40", 0 },
				{ "41-50", 0 },
				{ "51-60", 0 },
				{ "61+", 0 }
			};

			 var patients = await _dbContext.Users
            .Where(ur => ur.RoleId == 1)
            .ToListAsync();

			foreach (var patient in patients)
			{
				var age = patient.Age;

				if (age <= 18) ageGroups["0-18"]++;
				else if (age <= 30) ageGroups["19-30"]++;
				else if (age <= 40) ageGroups["31-40"]++;
				else if (age <= 50) ageGroups["41-50"]++;
				else if (age <= 60) ageGroups["51-60"]++;
				else ageGroups["61+"]++;
			}

			var result = ageGroups.Select(g => new CustomerAgeStatDto
			{
				AgeGroup = g.Key,
				Count = g.Value
			}).ToList();

			return result;
		}

		[HttpGet("daily")]
		public async Task<IActionResult> GetDailyRevenue()
		{
			var dailyRevenue = await _dbContext.Orders
				.GroupBy(order => order.Date)
				.Select(group => new
				{
					Date = group.Key,
					TotalRevenue = group.Sum(order => order.Total)
				})
				.OrderBy(result => result.Date)
				.ToListAsync();

			return Ok(dailyRevenue);
		}

		[HttpGet("orders-by-date")]
		public async Task<IActionResult> GetOrdersByDate()
		{
			var orderData = await _dbContext.Orders
				.GroupBy(order => order.Date)
				.Select(group => new
				{
					Date = group.Key,
					OrderCount = group.Count()
				})
				.OrderBy(result => result.Date)
				.ToListAsync();

			return Ok(orderData);
		}

		[HttpGet("medicine-usage")]
		public async Task<IActionResult> GetMedicineUsagePercentage()
		{
			// Get the total quantity of all medicines used
			var totalQuantity = await _dbContext.MedicalRecordMedicines
				.SumAsync(mr => mr.Quantity);

			// Group by medicineId to calculate the total quantity for each medicine
			var medicineUsage = await _dbContext.MedicalRecordMedicines
				.GroupBy(mr => mr.MedicineId)
				.Select(g => new
				{
					MedicineId = g.Key,
					MedicineName = g.FirstOrDefault().Medicine.Name,  // Assuming a Medicine table with a MedicineName
					TotalQuantity = g.Sum(mr => mr.Quantity),
					PercentageUsed = (g.Sum(mr => mr.Quantity) * 100.0) / totalQuantity
				})
				.ToListAsync();

			// Map the result to a DTO
			var result = medicineUsage.Select(m => new MedicineUsageDto
			{
				MedicineId = m.MedicineId,
				MedicineName = m.MedicineName,
				TotalQuantity = m.TotalQuantity,
				PercentageUsed = m.PercentageUsed
			}).ToList();

			return Ok(result);
		}

		[HttpGet("counts")]
		public async Task<ActionResult<DashboardCountsDto>> GetCounts()
		{
			var doctorCount = await _dbContext.Users.CountAsync(u => u.RoleId == 2);
			var patientCount = await _dbContext.Users.CountAsync(u => u.RoleId == 1);
			var medicineCount = await _dbContext.MedicineStorages.CountAsync();
			var equipmentCount = await _dbContext.Equipment.CountAsync();

			var countsDto = new DashboardCountsDto
			{
				DoctorCount = doctorCount,
				PatientCount = patientCount,
				MedicineCount = medicineCount,
				EquipmentCount = equipmentCount
			};

			return Ok(countsDto);
		}

	}
}
