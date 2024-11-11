namespace PrivateClinic.Dtos
{
	public class MedicalRecordWithMedicineDto
	{
		public string CheckUp {  get; set; }
		public string Treatment { get; set; }
		public string Description { get; set; }
		public DateOnly? RecordDate { get; set; }
		public int CustomerId { get; set; }
		public List<MedicineMedicalDto> Medicines { get; set; }
	}

	public class MedicineMedicalDto
	{
		public int MedicineId { get; set; }
		public int Quantity { get; set; }
		public string Note { get; set; }
	}
}
