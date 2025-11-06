import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Event, EventStatus } from './event.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EventService {
  private readonly apiUrl = environment.apiUrl + '/api/events';

  constructor(private http: HttpClient) {}

  getEvents(filters?: {
    title?: string;
    location?: string;
    status?: EventStatus | '';
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    pageSize?: number;
  }): Observable<Event[]> {
    let params = new HttpParams();
    if (filters) {
      if (filters.title) params = params.set('title', filters.title);
      if (filters.location) params = params.set('location', filters.location);
      if (filters.status !== undefined && filters.status !== '') params = params.set('status', filters.status.toString());
      if (filters.dateFrom) params = params.set('dateFrom', filters.dateFrom);
      if (filters.dateTo) params = params.set('dateTo', filters.dateTo);
      if (filters.page) params = params.set('page', filters.page.toString());
      if (filters.pageSize) params = params.set('pageSize', filters.pageSize.toString());
    }
    return this.http.get<Event[]>(this.apiUrl, { params }).pipe(
      catchError((error: any) => {
        console.error('Error in getEvents:', error);
        return of([] as Event[]);
      })
    );
  }

  getEvent(id: string): Observable<Event | null> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: any) => {
        console.error('Error in getEvent:', error);
        return of(null);
      })
    );
  }

  createEvent(event: Event): Observable<Event | null> {
    return this.http.post<Event>(this.apiUrl, event).pipe(
      catchError((error: any) => {
        console.error('Error in createEvent:', error);
        return of(null);
      })
    );
  }

  updateEvent(id: string, event: Event): Observable<Event | null> {
    return this.http.put<Event>(`${this.apiUrl}/${id}`, event).pipe(
      catchError((error: any) => {
        console.error('Error in updateEvent:', error);
        return of(null);
      })
    );
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: any) => {
        console.error('Error in deleteEvent:', error);
        return of(undefined);
      })
    );
  }
}
