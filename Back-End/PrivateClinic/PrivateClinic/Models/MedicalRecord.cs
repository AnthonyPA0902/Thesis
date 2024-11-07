﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace PrivateClinic.Models;

public partial class MedicalRecord
{
    public int Id { get; set; }

    public string Description { get; set; }

    public DateOnly? RecordDate { get; set; }

    public int CustomerId { get; set; }

    public virtual User Customer { get; set; }

    public virtual ICollection<MedicalRecordMedicine> MedicalRecordMedicines { get; set; } = new List<MedicalRecordMedicine>();
}