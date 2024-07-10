using backend.Data;
using dotenv.net;
using Microsoft.EntityFrameworkCore;
using Stripe;

DotEnv.Load();
string? stripeSecretKey = Environment.GetEnvironmentVariable("STRIPE_KEY");
string? dbConnectionString = Environment.GetEnvironmentVariable("DB_CONNECTION");

if (stripeSecretKey == null) throw new ArgumentNullException(nameof(stripeSecretKey));
StripeConfiguration.ApiKey = stripeSecretKey;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var defaultConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<DataContext>(options =>
options.UseNpgsql(string.IsNullOrEmpty(dbConnectionString) ? defaultConnectionString : dbConnectionString)
);


var app = builder.Build();

// using (var scope = app.Services.CreateScope())
// {
//     var services = scope.ServiceProvider;
//     var context = services.GetRequiredService<DataContext>();
//     DbSeeder.Seed(context);
// }

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAllOrigins");
app.MapControllers();

app.Run();