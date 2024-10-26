using backend.Data;
using dotenv.net;
using Microsoft.EntityFrameworkCore;
using Stripe;
using File = System.IO.File;

string LoadEnvFile()
{
    var envPath = Path.Combine(Directory.GetCurrentDirectory(), ".env");
    var parentEnvPath = Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory())?.FullName ?? throw new Exception(".env file not found"), ".env");

    if (File.Exists(envPath) || File.Exists(parentEnvPath))
    {
        return File.Exists(envPath) ? envPath : parentEnvPath;
    }

    throw new Exception(".env file not found in current or parent directory.");
}

var envFilePath = LoadEnvFile();
DotEnv.Load(new DotEnvOptions(envFilePaths:[envFilePath]));

var stripeSecretKey = Environment.GetEnvironmentVariable("STRIPE_KEY");
var dbConnectionString = Environment.GetEnvironmentVariable("DB_CONNECTION");

if (stripeSecretKey == null) throw new ArgumentNullException(nameof(stripeSecretKey));
if (dbConnectionString == null) throw new Exception("Must provide db connection string");

Console.WriteLine("Connected to: " + dbConnectionString);

StripeConfiguration.ApiKey = stripeSecretKey;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsSettings", builder =>
    {
        builder.WithOrigins("https://k-sports.vercel.app")
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DataContext>(options =>
options.UseNpgsql(dbConnectionString)
);


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("CorsSettings");

app.MapGet("/", () => "hello World");

app.MapControllers();

app.Run();
