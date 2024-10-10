﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace PrivateClinic.Models;

public partial class ExaminitionAppointment
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Phone { get; set; }

    public string Email { get; set; }

    public DateOnly? Date { get; set; }

    public int DoctorId { get; set; }

    public int TreatmentId { get; set; }

    public virtual User Doctor { get; set; }

    public virtual Treatment Treatment { get; set; }
}