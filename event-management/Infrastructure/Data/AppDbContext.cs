using Microsoft.EntityFrameworkCore;
using event_management.Domain.Entities;

namespace event_management.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Event> Events { get; set; } = null!;

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Event>(b =>
            {
                b.HasKey(e => e.Id);
                b.Property(e => e.Title).IsRequired().HasMaxLength(200);
                b.Property(e => e.Location).IsRequired().HasMaxLength(200);
                b.Property(e => e.Description).HasMaxLength(2000);
                b.Property(e => e.Date).IsRequired();
                b.Property(e => e.Status).IsRequired();
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}