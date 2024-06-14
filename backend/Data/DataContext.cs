using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductRelatedWord> ProductRelatedWords { get; set; }
        override protected void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().HasKey(p => p.Id);
            modelBuilder.Entity<ProductRelatedWord>().HasKey(prw => prw.Id);

            modelBuilder.Entity<Product>()
        .Property(p => p.Price)
        .HasColumnType("decimal(10,2)");

            modelBuilder.Entity<Product>().ToTable("Products");
            modelBuilder.Entity<ProductRelatedWord>().ToTable("ProductRelatedWords");

            modelBuilder.Entity<ProductRelatedWord>().HasMany(prw =>
            prw.Products).WithMany(p => p.ProductRelatedWords);
        }
    }
}