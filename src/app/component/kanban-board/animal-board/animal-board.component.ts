import { Component, HostBinding, Input } from '@angular/core';
import { AnimalModel } from '../../model/animal.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DragDropService } from '../../../service/drag-drop.service';

@Component({
  selector: 'app-animal-board',
  templateUrl: './animal-board.component.html',
  styleUrls: ['./animal-board.component.scss']
})
export class AnimalBoardComponent {

  @Input() animalList: AnimalModel[] = [];
  @Input() matBadgeColorInput: 'warn' | 'accent' | 'primary' | undefined = 'primary';
  @Input() listTitle: string = 'title';

  @HostBinding() class = 'single-board';

  dragDisabled: boolean = false;

  constructor(public dragDropService: DragDropService) {
    this.dragDropService.getIsDraggable().subscribe((draggable: boolean) => {
      this.dragDisabled = draggable;
    })
  }

  drop(event: CdkDragDrop<AnimalModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
