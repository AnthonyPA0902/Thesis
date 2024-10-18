namespace PrivateClinic.Dtos
{
	public class DoctorDto
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public short? Age { get; set; }
		public string Address { get; set; }
		public string Email { get; set; }
		public string Phone { get; set; }
		public string Username { get; set; }
		public string Password { get; set; }
		public int RoleId { get; set; }
	}
}
