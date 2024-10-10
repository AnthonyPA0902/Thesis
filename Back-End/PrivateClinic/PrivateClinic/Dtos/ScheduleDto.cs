namespace PrivateClinic.Dtos
{
	public class ScheduleDto
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Phone { get; set; }
		public string Email { get; set; }
		public DateOnly? Date { get; set; }
		public string DoctorName { get; set; }
		public string TreatmentName { get; set; }
	}
}
