import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlPanelService {

  public controlPanel = new BehaviorSubject<any>(null);

  constructor() { }

  public setControl(control: any): void {
    this.controlPanel.next(control);
  }

  public getControl(): Observable<any> {
    return this.controlPanel.asObservable()
  }
}
