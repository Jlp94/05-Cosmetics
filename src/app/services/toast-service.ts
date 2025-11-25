import {Injectable, signal, WritableSignal} from '@angular/core';
import {Toast} from '../components/utils/toast/toast';
import {ToastInterface} from '../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly _toasts:WritableSignal <ToastInterface[]> = signal<ToastInterface[]>([]);
  readonly toasts = this._toasts.asReadonly();

  show(toast: ToastInterface) {
    this._toasts.update((toasts) => [...toasts, toast]);
  }

  remove(toast: ToastInterface) {
    this._toasts.update((toasts) => toasts.filter((t) => t !== toast));
  }

  clear() {
    this._toasts.set([]);
  }
}
