using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace event_management.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class SeedDefaultEvents : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Events",
                columns: new[] { "Id", "Date", "Description", "Location", "Status", "Title" },
                values: new object[,]
                {
                    { new Guid("11111111-1111-1111-1111-111111111111"), "2025-11-13T15:26:23.3844846+00:00", "Monthly community meetup to discuss local events.", "Community Hall", 0, "Community Meetup" },
                    { new Guid("22222222-2222-2222-2222-222222222222"), "2025-12-06T15:26:23.3844871+00:00", "Annual tech conference with talks and workshops.", "Convention Center", 0, "Tech Conference" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Events",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"));

            migrationBuilder.DeleteData(
                table: "Events",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222222"));
        }
    }
}
