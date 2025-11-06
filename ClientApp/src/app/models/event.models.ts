export enum EventStatus {
  Upcoming = 0,
  Attending = 1,
  Maybe = 2,
  Declined = 3
}

export interface EventDto {
  id: string;
  title: string;
  date: string;
  location: string;
  description?: string;
  status: EventStatus;
}

export interface CreateEventDto {
  title: string;
  date: string;
  location: string;
  description?: string;
  status: EventStatus;
}

export interface UpdateEventDto {
  title: string;
  date: string;
  location: string;
  description?: string;
  status: EventStatus;
}

export interface EventQueryParameters {
  title?: string;
  dateFrom?: string;
  dateTo?: string;
  location?: string;
  status?: EventStatus;
}