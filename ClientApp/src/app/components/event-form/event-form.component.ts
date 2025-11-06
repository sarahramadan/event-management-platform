import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { EventDto, CreateEventDto, UpdateEventDto, EventStatus } from '../../models/event.models';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export class EventFormComponent implements OnInit {
  isEditMode = signal(false);
  eventId = signal<string | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);
  
  // Form data
  title = signal('');
  date = signal('');
  location = signal('');
  description = signal('');
  status = signal<EventStatus>(EventStatus.Upcoming);

  EventStatus = EventStatus;

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.eventId.set(id);
      this.loadEvent(id);
    }
  }

  loadEvent(id: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.eventService.getEvent(id).subscribe({
      next: (event) => {
        this.title.set(event.title);
        this.date.set(this.formatDateForInput(event.date));
        this.location.set(event.location);
        this.description.set(event.description || '');
        this.status.set(event.status);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('Failed to load event. Please try again.');
        this.loading.set(false);
        console.error('Error loading event:', error);
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.loading.set(true);
      this.error.set(null);

      const eventData = {
        title: this.title(),
        date: new Date(this.date()).toISOString(),
        location: this.location(),
        description: this.description() || undefined,
        status: this.status()
      };

      if (this.isEditMode() && this.eventId()) {
        // Update existing event
        const updateData: UpdateEventDto = eventData;
        this.eventService.updateEvent(this.eventId()!, updateData).subscribe({
          next: () => {
            this.router.navigate(['/events']);
          },
          error: (error) => {
            this.error.set('Failed to update event. Please try again.');
            this.loading.set(false);
            console.error('Error updating event:', error);
          }
        });
      } else {
        // Create new event
        const createData: CreateEventDto = eventData;
        this.eventService.createEvent(createData).subscribe({
          next: () => {
            this.router.navigate(['/events']);
          },
          error: (error) => {
            this.error.set('Failed to create event. Please try again.');
            this.loading.set(false);
            console.error('Error creating event:', error);
          }
        });
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/events']);
  }

  private formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // Format for datetime-local input
  }

  getStatusOptions() {
    return [
      { value: EventStatus.Upcoming, label: 'Upcoming' },
      { value: EventStatus.Attending, label: 'Attending' },
      { value: EventStatus.Maybe, label: 'Maybe' },
      { value: EventStatus.Declined, label: 'Declined' }
    ];
  }
}