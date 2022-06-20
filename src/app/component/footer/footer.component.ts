import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DragDropService } from '../../service/drag-drop.service';
import { AnimalInterface } from '../../interface/animalInterface';
import { AnimalDataService } from '../../service/animal-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  draggable = new FormControl(false);

  constructor(private dragDropService: DragDropService,
              private animalDataService: AnimalDataService) {
    this.draggable.valueChanges.subscribe((val: boolean) => {
      this.dragDropService.setIsDraggable(!val)
    })
    this.animalDataService.getData$().subscribe((data: AnimalInterface[]) => {
      console.log(this.toggleDraggableClass());
    });
  }

  toggleDraggable() {
    this.draggable.setValue(!this.draggable.value);
  }

  toggleDraggableClass() {
    if (!this.draggable.value) {
      return 'mat-button-disabled'
    }
    return ''
  }
}
