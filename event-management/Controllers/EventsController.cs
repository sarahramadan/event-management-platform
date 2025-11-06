using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using event_management.Application.DTOs;
using event_management.Application.Services;
using event_management.Domain.Entities;

namespace event_management.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        private readonly EventService _service;

        public EventsController(EventService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<EventDto>>> Get([FromQuery] string? title, [FromQuery] DateTimeOffset? dateFrom,
            [FromQuery] DateTimeOffset? dateTo, [FromQuery] string? location, [FromQuery] EventStatus? status)
        {
            var filters = new EventQueryParameters
            {
                Title = title,
                DateFrom = dateFrom,
                DateTo = dateTo,
                Location = location,
                Status = status
            };

            var list = await _service.QueryAsync(filters);
            return Ok(list);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<EventDto>> GetById(Guid id)
        {
            var ev = await _service.GetByIdAsync(id);
            if (ev == null) return NotFound();
            return Ok(ev);
        }

        [HttpPost]
        public async Task<ActionResult<EventDto>> Create([FromBody] CreateEventDto dto)
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateEventDto dto)
        {
            var ok = await _service.UpdateAsync(id, dto);
            if (!ok) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var ok = await _service.DeleteAsync(id);
            if (!ok) return NotFound();
            return NoContent();
        }
    }
}