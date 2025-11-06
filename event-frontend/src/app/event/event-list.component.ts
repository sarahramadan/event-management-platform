import { Component, OnInit, ViewChild, signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmDialog } from '../shared/delete-confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EventService } from './event.service';
import { Event, EventStatus } from './event.model';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    DeleteConfirmDialog
  ],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'date', 'location', 'status', 'actions'];
  events = signal<Event[]>([]);
  totalEvents = 0;
  pageSize = 10;
  pageIndex = 0;
  loading = signal(false);
  error: string | null = null;

  // Filter object as signal
  filter = signal({
    title: '',
    location: '',
    status: '' as EventStatus | '',
    dateFrom: '',
    dateTo: ''
  });

  EventStatus = EventStatus;

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private eventService: EventService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(page: number = 1): void {
    this.loading.set(true);
    this.error = null;
    const filterObj = this.filter();
    const filters = {
      ...filterObj,
      dateFrom: filterObj.dateFrom ? new Date(filterObj.dateFrom).toISOString().slice(0, 10) : undefined,
      dateTo: filterObj.dateTo ? new Date(new Date(filterObj.dateTo).setHours(23, 59, 59, 999)).toISOString() : undefined,
      status: filterObj.status !== '' ? filterObj.status : undefined,
      page,
      pageSize: this.pageSize
    };
    this.eventService.getEvents(filters).subscribe({
      next: (events) => {
        this.events.set(events);
        this.totalEvents = events.length < this.pageSize ? (this.pageIndex * this.pageSize) + events.length : (this.pageIndex + 1) * this.pageSize + 1;
        this.loading.set(false);
      },
      error: () => {
        this.error = 'Failed to load events.';
        this.loading.set(false);
      }
    });
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadEvents(this.pageIndex + 1);
  }

  applyFilters(): void {
    this.pageIndex = 0;
    this.loadEvents(1);
  }

  clearFilters(): void {
    this.filter.set({
      title: '',
      location: '',
      status: '',
      dateFrom: '',
      dateTo: ''
    });
    this.applyFilters();
  }

  openDeleteDialog(id?: string): void {
    if (!id) {
      console.warn('Delete dialog called with undefined id');
      return;
    }
    const dialogRef = this.dialog.open(DeleteConfirmDialog, {
      data: {
        message: 'Are you sure you want to delete this event?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Delete dialog result:', result, 'type:', typeof result, 'for event id:', id);
      if (result == true) { // allow true or 'true'
        console.log('Sending delete request for event id:', id);
        this.eventService.deleteEvent(id).subscribe({
          next: () => {
            console.log('Delete request successful for event id:', id);
            this.loadEvents(this.pageIndex + 1);
          },
          error: (err) => {
            console.error('Delete request failed for event id:', id, err);
            this.error = 'Failed to delete event.';
          }
        });
      }
    });
  }

}
