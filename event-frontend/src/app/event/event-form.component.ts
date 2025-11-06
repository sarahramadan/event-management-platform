import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from './event.service';
import { Event, EventStatus } from './event.model';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  minDateTime: string = '';
  eventId: string | null = null;
  loading = signal(false);
  error: string | null = null;

  event = signal<Event>({
    title: '',
    date: '',
    location: '',
    description: '',
    status: EventStatus.Upcoming
  });

  EventStatus = EventStatus;

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Set minDateTime to current date/time in ISO format for input[type=datetime-local]
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    this.minDateTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventId = id;
      this.loadEvent(id);
    }
  }

  private formatDateForInput(dateString: string): string {
    if (!dateString) return '';
    // Try to parse as ISO string
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    // yyyy-MM-ddTHH:mm
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  loadEvent(id: string): void {
    this.loading.set(true);
    this.error = null;
    this.eventService.getEvent(id).subscribe({
      next: (event) => {
        console.log('Loaded event:', event);
        if (event) {
          this.event.set({
            ...event,
            date: this.formatDateForInput(event.date),
            status: typeof event.status === 'string'
              ? EventStatus[event.status as keyof typeof EventStatus]
              : event.status
          });
        }
        this.loading.set(false);
      },
      error: (error) => {
        this.error = 'Failed to load event.';
        this.loading.set(false);
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error = null;
  const eventData: Event = { ...this.event(), status: Number(this.event().status) };
    if (this.eventId) {
      this.eventService.updateEvent(this.eventId, eventData).subscribe({
        next: () => this.router.navigate(['/events']),
        error: () => {
          this.error = 'Failed to update event.';
          this.loading.set(false);
        }
      });
    } else {
      this.eventService.createEvent(eventData).subscribe({
        next: () => this.router.navigate(['/events']),
        error: () => {
          this.error = 'Failed to create event.';
          this.loading.set(false);
        }
      });
    }
  }
}
