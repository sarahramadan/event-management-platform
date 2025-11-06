using System;
using event_management.Domain.Entities;

namespace event_management.Application.DTOs
{
    public class EventQueryParameters
    {
    public string? Title { get; set; }
    public DateTimeOffset? DateFrom { get; set; }
    public DateTimeOffset? DateTo { get; set; }
    public string? Location { get; set; }
    public EventStatus? Status { get; set; }
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    }
}