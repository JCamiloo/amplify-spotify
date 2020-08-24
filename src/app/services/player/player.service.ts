import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private tabChanged = new BehaviorSubject<string>('');
  tabChanged$ = this.tabChanged.asObservable();

  constructor() { 
  }

  setCurrentTab(currentTab: string) {
    this.tabChanged.next(currentTab);
  }
}
