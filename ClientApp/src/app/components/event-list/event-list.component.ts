import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { EventDto, EventStatus, EventQueryParameters } from '../../models/event.models';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  events = signal<EventDto[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  
  // Filter properties
  filters = signal<EventQueryParameters>({});
  titleFilter = signal('');
  locationFilter = signal('');
  statusFilter = signal<EventStatus | ''>('');
  dateFromFilter = signal('');
  dateToFilter = signal('');

  EventStatus = EventStatus;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading.set(true);
    this.error.set(null);

    const filters: EventQueryParameters = {
      title: this.titleFilter() || undefined,
      location: this.locationFilter() || undefined,
      status: this.statusFilter() !== '' ? this.statusFilter() as EventStatus : undefined,
      dateFrom: this.dateFromFilter() || undefined,
      dateTo: this.dateToFilter() || undefined
    };

    this.eventService.getEvents(filters).subscribe({
      next: (events) => {
        this.events.set(events);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('Failed to load events. Please try again.');
        this.loading.set(false);
        console.error('Error loading events:', error);
      }
    });
  }

  deleteEvent(id: string): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(id).subscribe({
        next: () => {
          this.loadEvents(); // Reload the list
        },
        error: (error) => {
          this.error.set('Failed to delete event. Please try again.');
          console.error('Error deleting event:', error);
        }
      });
    }
  }

  clearFilters(): void {
    this.titleFilter.set('');
    this.locationFilter.set('');
    this.statusFilter.set('');
    this.dateFromFilter.set('');
    this.dateToFilter.set('');
    this.loadEvents();
  }

  getStatusLabel(status: EventStatus): string {
    switch (status) {
      case EventStatus.Upcoming:
        return 'Upcoming';
      case EventStatus.Attending:
        return 'Attending';
      case EventStatus.Maybe:
        return 'Maybe';
      case EventStatus.Declined:
        return 'Declined';
      default:
        return 'Unknown';
    }
  }

  getStatusClass(status: EventStatus): string {
    switch (status) {
      case EventStatus.Upcoming:
        return 'status-upcoming';
      case EventStatus.Attending:
        return 'status-attending';
      case EventStatus.Maybe:
        return 'status-maybe';
      case EventStatus.Declined:
        return 'status-declined';
      default:
        return '';
    }
  }
}