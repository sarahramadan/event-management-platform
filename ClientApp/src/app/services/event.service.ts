import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventDto, CreateEventDto, UpdateEventDto, EventQueryParameters } from '../models/event.models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly apiUrl = `${environment.apiUrl}/events`;

  constructor(private http: HttpClient) { }

  getEvents(filters?: EventQueryParameters): Observable<EventDto[]> {
    let params = new HttpParams();
    
    if (filters) {
      if (filters.title) {
        params = params.set('title', filters.title);
      }
      if (filters.dateFrom) {
        params = params.set('dateFrom', filters.dateFrom);
      }
      if (filters.dateTo) {
        params = params.set('dateTo', filters.dateTo);
      }
      if (filters.location) {
        params = params.set('location', filters.location);
      }
      if (filters.status !== undefined) {
        params = params.set('status', filters.status.toString());
      }
    }

    return this.http.get<EventDto[]>(this.apiUrl, { params });
  }

  getEvent(id: string): Observable<EventDto> {
    return this.http.get<EventDto>(`${this.apiUrl}/${id}`);
  }

  createEvent(event: CreateEventDto): Observable<EventDto> {
    return this.http.post<EventDto>(this.apiUrl, event);
  }

  updateEvent(id: string, event: UpdateEventDto): Observable<EventDto> {
    return this.http.put<EventDto>(`${this.apiUrl}/${id}`, event);
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}