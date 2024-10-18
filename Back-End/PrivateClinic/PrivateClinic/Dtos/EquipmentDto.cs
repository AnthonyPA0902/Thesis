namespace PrivateClinic.Dtos
{
	public class EquipmentDto
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Status { get; set; }
		public DateOnly? CleaningTime { get; set; }
		public string Maintenance { get; set; }
	}
}
