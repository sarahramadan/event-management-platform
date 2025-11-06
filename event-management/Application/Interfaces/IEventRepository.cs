using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using event_management.Domain.Entities;
using event_management.Application.DTOs;

namespace event_management.Application.Interfaces
{
    public interface IEventRepository : IBaseRepository<Event, Guid>
    {
        Task<List<Event>> QueryAsync(EventQueryParameters filters);
    }
}