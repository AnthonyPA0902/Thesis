namespace PrivateClinic.Dtos
{
	public class MedicineDto
	{
		public int Id { get; set; }

		public string Name { get; set; }

		public double Available { get; set; }

		public double Total { get; set; }

		public DateOnly ExpiredDate { get; set; }

	}
}
