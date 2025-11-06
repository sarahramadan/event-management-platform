export enum EventStatus {
  Upcoming = 0,
  Attending = 1,
  Maybe = 2,
  Declined = 3
}

export interface Event {
  id?: string;
  title: string;
  date: string;
  location: string;
  description?: string;
  status: EventStatus;
}
