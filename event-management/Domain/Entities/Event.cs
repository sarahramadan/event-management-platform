using System;

namespace event_management.Domain.Entities
{
    public class Event
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Title { get; set; } = string.Empty;

        public DateTimeOffset Date { get; set; }

        public string Location { get; set; } = string.Empty;

        public string? Description { get; set; }

        public EventStatus Status { get; set; } = EventStatus.Upcoming;
    }
}