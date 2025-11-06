using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using event_management.Application.DTOs;
using event_management.Application.Interfaces;
using event_management.Domain.Entities;
using event_management.Infrastructure.Data;

namespace event_management.Infrastructure.Repositories
{
    public class EventRepository : BaseRepository<Event, Guid>, IEventRepository
    {
        private readonly AppDbContext _db;

        public EventRepository(AppDbContext db) : base(db)
        {
            _db = db;
        }

        public async Task<List<Event>> QueryAsync(EventQueryParameters filters)
        {
            IQueryable<Event> query = Query().AsNoTracking();

            if (!string.IsNullOrWhiteSpace(filters.Title))
            {
                var t = filters.Title.Trim().ToLowerInvariant();
                query = query.Where(e => e.Title.ToLower().Contains(t));
            }

            if (!string.IsNullOrWhiteSpace(filters.Location))
            {
                var loc = filters.Location.Trim().ToLowerInvariant();
                query = query.Where(e => e.Location.ToLower().Contains(loc));
            }

            if (filters.DateFrom.HasValue)
            {
                query = query.Where(e => e.Date >= filters.DateFrom.Value);
            }

            if (filters.DateTo.HasValue)
            {
                query = query.Where(e => e.Date <= filters.DateTo.Value);
            }

            if (filters.Status.HasValue)
            {
                query = query.Where(e => e.Status == filters.Status.Value);
            }

            query = query.OrderBy(e => e.Date);

            // Pagination
            int skip = (filters.Page - 1) * filters.PageSize;
            query = query.Skip(skip).Take(filters.PageSize);

            return await query.ToListAsync();
        }
    }
}