﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace PrivateClinic.Models;

public partial class MedicalRecordMedicine
{
    public int RecordId { get; set; }

    public int MedicineId { get; set; }

    public int? Quantity { get; set; }

    public virtual MedicineStorage Medicine { get; set; }

    public virtual MedicalRecord Record { get; set; }
}