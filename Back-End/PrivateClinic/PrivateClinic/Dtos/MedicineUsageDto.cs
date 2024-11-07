namespace PrivateClinic.Dtos
{
	public class MedicineUsageDto
	{
		public int MedicineId { get; set; }
		public string MedicineName { get; set; }
		public int? TotalQuantity { get; set; }
		public double? PercentageUsed { get; set; }
	}
}
