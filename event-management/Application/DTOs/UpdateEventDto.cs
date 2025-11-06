using System;
using event_management.Domain.Entities;

namespace event_management.Application.DTOs
{
    public class UpdateEventDto
    {
        public string Title { get; set; } = string.Empty;
        public DateTimeOffset Date { get; set; }
        public string Location { get; set; } = string.Empty;
        public string? Description { get; set; }
        public EventStatus Status { get; set; } = EventStatus.Upcoming;
    }
}