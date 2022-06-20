import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {

  public dragDisabled = new BehaviorSubject<boolean>(true)

  constructor() { }

  public setIsDraggable(dragDisabled: boolean): void {
    this.dragDisabled.next(dragDisabled);
  }

  public getIsDraggable(): Observable<any> {
    return this.dragDisabled.asObservable()
  }
}
