import {Component, inject} from '@angular/core';
import {ToastService} from '../../../services/toast-service';
import {NgbToast} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toast',
  imports: [
    NgbToast
  ],
  templateUrl: './toast.html',
  host: { class: 'toast-container position-fixed top-50 start-50 translate-middle', style: 'z-index: 1200' },
  styleUrl: './toast.scss',
})
export class Toast {
  protected readonly toastService : ToastService = inject(ToastService);
}
