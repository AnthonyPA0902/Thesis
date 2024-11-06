﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace PrivateClinic.Models;

public partial class Treatment
{
    public int Id { get; set; }

    public string Name { get; set; }

    public int? Session { get; set; }

    public byte[] Image { get; set; }

    public int? PriceId { get; set; }

    public virtual ICollection<Checkup> Checkups { get; set; } = new List<Checkup>();

    public virtual ICollection<ExaminitionAppointment> ExaminitionAppointments { get; set; } = new List<ExaminitionAppointment>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual PriceList Price { get; set; }

    public virtual ICollection<TreatmentOrder> TreatmentOrders { get; set; } = new List<TreatmentOrder>();
}