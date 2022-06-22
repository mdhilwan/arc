import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DragDropService } from '../../service/drag-drop.service';
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
