using PrivateClinic.Helpers;
using PrivateClinic.Models;
using PrivateClinic.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddControllers(options => options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add SQL Server Connection
builder.Services.AddSqlServer<PrivateClinicManagementDBContext>(builder.Configuration.GetConnectionString("DefaultConnection"));

// Add CORS policy
builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowReactApp",
		builder => builder
			.WithOrigins("http://localhost:3000")
			.AllowAnyHeader()
		.AllowAnyMethod());
});

// Add VnPay Service
builder.Services.AddScoped<IVnPayService, VnPayService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

// Use the CORS policy
app.UseCors("AllowReactApp");

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors(options =>
{
	options.AllowAnyOrigin();
	options.AllowAnyMethod();
	options.AllowAnyHeader();
});

app.MapControllers();

app.Run();
