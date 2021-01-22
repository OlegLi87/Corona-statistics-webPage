import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalVariableStorageService {
  private isOnAccessibleViewMode = false;
  accesibleViewModeChanged = new Subject<boolean>();

  // can only be invoked from AppComponent object
  toggleAccesibleViewMode(caller: object): void {
    if ({}.toString.call(caller).indexOf('AppComponent') === -1) {
      const msg =
        'acessible view mode can only be changed from within AppComponent';
      throw new TypeError(msg);
    }
    this.isOnAccessibleViewMode = !this.isOnAccessibleViewMode;
    this.accesibleViewModeChanged.next(this.isOnAccessibleViewMode);
  }

  getIsOnAccessibleViewMode(): boolean {
    return this.isOnAccessibleViewMode;
  }
}
