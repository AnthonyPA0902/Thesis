﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace PrivateClinic.Models;

public partial class Order
{
    public int Id { get; set; }

    public string CustomerName { get; set; }

    public string CustomerEmail { get; set; }

    public double? Total { get; set; }

    public DateOnly? Date { get; set; }

    public string Method { get; set; }

    public string Status { get; set; }

    public int TreatmentId { get; set; }

    public virtual Treatment Treatment { get; set; }
}