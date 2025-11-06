import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z4">
      <span class="logo">Event Manager</span>
      <span class="spacer"></span>
      <a mat-button routerLink="/events">Events</a>
      <a mat-button routerLink="/events/new">Create Event</a>
    </mat-toolbar>
  `,
  styles: [`
    .logo { font-weight: bold; font-size: 1.3rem; }
    .spacer { flex: 1 1 auto; }
    mat-toolbar { position: sticky; top: 0; z-index: 100; }
    a[mat-button] { color: white; text-decoration: none; margin-left: 1rem; }
  `]
})
export class HeaderComponent {}
