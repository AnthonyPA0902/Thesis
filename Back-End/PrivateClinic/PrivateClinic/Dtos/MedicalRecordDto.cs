namespace PrivateClinic.Dtos
{
	public class MedicalRecordDto
	{
		public int Id { get; set; }
		public string Description { get; set; }
		public DateOnly? RecordDate { get; set; }
		public string CustomerName { get; set; }
		public List<MedicineStorageDto> Medicines { get; set; } // List to hold medicine details
	}

	public class MedicineStorageDto
	{
		public int MedicineId { get; set; }
		public string MedicineName { get; set; }
		public int? Quantity { get; set; }
	}

}
