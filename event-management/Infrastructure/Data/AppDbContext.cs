using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
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
            // Convert DateTimeOffset to ISO 8601 string for SQLite compatibility
            var dateTimeOffsetConverter = new ValueConverter<DateTimeOffset, string>(
                v => v.ToString("o"),
                v => DateTimeOffset.Parse(v));

            modelBuilder.Entity<Event>(b =>
            {
                b.HasKey(e => e.Id);
                b.Property(e => e.Title).IsRequired().HasMaxLength(200);
                b.Property(e => e.Location).IsRequired().HasMaxLength(200);
                b.Property(e => e.Description).HasMaxLength(2000);
                // Store Date as ISO string so ORDER BY and comparisons work in SQLite
                b.Property(e => e.Date).IsRequired().HasConversion(dateTimeOffsetConverter);
                b.Property(e => e.Status).IsRequired();
            });

            // Seed default events
            modelBuilder.Entity<Event>().HasData(
                new Event
                {
                    Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                    Title = "Community Meetup",
                    Date = DateTimeOffset.UtcNow.AddDays(7),
                    Location = "Community Hall",
                    Description = "Monthly community meetup to discuss local events.",
                    Status = EventStatus.Upcoming
                },
                new Event
                {
                    Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                    Title = "Tech Conference",
                    Date = DateTimeOffset.UtcNow.AddDays(30),
                    Location = "Convention Center",
                    Description = "Annual tech conference with talks and workshops.",
                    Status = EventStatus.Upcoming
                }
            );

            base.OnModelCreating(modelBuilder);
        }
    }
}