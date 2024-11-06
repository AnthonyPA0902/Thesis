namespace PrivateClinic.Dtos
{
	public class DailyRevenueDto
	{
		public string Date { get; set; }
		public decimal TotalRevenue { get; set; }
	}

	public class RevenueByDayResponseDto
	{
		public int Year { get; set; }
		public List<DailyRevenueDto> DailyRevenues { get; set; }
	}
}
