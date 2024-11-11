namespace PrivateClinic.Dtos
{
	public class CheckUpDto
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Phone { get; set; }
		public DateOnly? AppointmentDate { get; set; }
		public TimeOnly? StartTime { get; set; }
		public TimeOnly? EndTime { get; set; }
		public string Room { get; set; }
		public string Status { get; set; }	
		public string DoctorName { get; set; }
		public string TreatmentName { get; set; }
		public int DoctorId { get; set; }
	}
}
