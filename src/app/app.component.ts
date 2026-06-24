import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationContainerComponent } from './shared/toast/components/notification-container/notification-container.component';
import { LoaderComponent } from './shared/ui/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotificationContainerComponent, LoaderComponent],
  template: ` <app-loader></app-loader>
    <app-notification-container></app-notification-container>
    <router-outlet></router-outlet>`,
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Banking_adv_v18';
}

