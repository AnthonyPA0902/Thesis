﻿namespace PrivateClinic.Dtos
{
	public class TheTreatmentDto
	{
		public string Name { get; set; }
		public int Session { get; set; }
		public double Price { get; set; }
		public byte[] Image { get; set; } // To store the image as byte array
	}
}
