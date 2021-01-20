import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalVariableStorageService {
  private isOnAccesibleViewMode = false;

  accesibleViewModeChanged = new Subject<boolean>();

  toggleAccesibleViewMode(caller: object): void {
    if ({}.toString.call(caller).indexOf('AppComponent') === -1) {
      const msg =
        'acessible view mode can only be changed from within AppComponent';
      throw new TypeError(msg);
    }
    this.isOnAccesibleViewMode = !this.isOnAccesibleViewMode;
    this.accesibleViewModeChanged.next(this.isOnAccesibleViewMode);
  }
}
