﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace PrivateClinic.Models;

public partial class Checkup
{
    public int Id { get; set; }

    public string Date { get; set; }

    public string Service { get; set; }

    public string Room { get; set; }

    public string Description { get; set; }

    public int DoctorId { get; set; }

    public virtual User Doctor { get; set; }
}