import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatToolbarModule],
  template: `
    <mat-toolbar color="primary" class="footer">
      <span>&copy; {{ year }} Event Manager. All rights reserved.</span>
    </mat-toolbar>
  `,
  styles: [`
    .footer { position: fixed; bottom: 0; width: 100%; z-index: 100; justify-content: center; }
    mat-toolbar { min-height: 40px; font-size: 0.95rem; }
  `]
})
export class FooterComponent {
  year = new Date().getFullYear();
}
