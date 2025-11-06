using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using event_management.Application.DTOs;
using event_management.Application.Interfaces;
using event_management.Domain.Entities;

namespace event_management.Application.Services
{
    public class EventService
    {
        private readonly IEventRepository _repo;

        public EventService(IEventRepository repo)
        {
            _repo = repo;
        }

        public async Task<EventDto?> GetByIdAsync(Guid id)
        {
            var ev = await _repo.GetByIdAsync(id);
            if (ev == null) return null;
            return MapToDto(ev);
        }

        public async Task<List<EventDto>> QueryAsync(EventQueryParameters filters)
        {
            var entities = await _repo.QueryAsync(filters);
            var list = new List<EventDto>();
            foreach (var e in entities) list.Add(MapToDto(e));
            return list;
        }

        public async Task<EventDto> CreateAsync(CreateEventDto dto)
        {
            var ev = new Event
            {
                Title = dto.Title,
                Date = dto.Date,
                Location = dto.Location,
                Description = dto.Description,
                Status = dto.Status
            };

            await _repo.AddAsync(ev);
            return MapToDto(ev);
        }

        public async Task<bool> UpdateAsync(Guid id, UpdateEventDto dto)
        {
            var ev = await _repo.GetByIdAsync(id);
            if (ev == null) return false;

            ev.Title = dto.Title;
            ev.Date = dto.Date;
            ev.Location = dto.Location;
            ev.Description = dto.Description;
            ev.Status = dto.Status;

            await _repo.UpdateAsync(ev);
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var ev = await _repo.GetByIdAsync(id);
            if (ev == null) return false;
            await _repo.DeleteAsync(ev);
            return true;
        }

        private static EventDto MapToDto(Event e) =>
            new EventDto
            {
                Id = e.Id,
                Title = e.Title,
                Date = e.Date,
                Location = e.Location,
                Description = e.Description,
                Status = e.Status
            };
    }
}