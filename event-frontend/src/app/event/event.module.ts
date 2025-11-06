import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { eventRoutes } from './event.routes';
import { EventListComponent } from './event-list.component';
import { EventFormComponent } from './event-form.component';

@NgModule({
  imports: [
    RouterModule.forChild(eventRoutes),
    EventListComponent,
    EventFormComponent
  ]
})
export class EventModule {}
