import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { animalInterface } from '../../interface/animal.interface';
import { purposeTagInterface } from '../../interface/purposeTag.interface';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent {

  purposeA: purposeTagInterface = {
    purpose: 'CPP',
    label: 'CPP'
  }

  purposeTags: purposeTagInterface[] = [this.purposeA]

  animal: animalInterface = {
    animalNumber: '1',
    sex: 'M',
    parent: '2',
    cageNumber: 'cage 2',
    location: 'loc 2',
    purposeTag: this.purposeA,
    dob: new Date()
  }

  newAnimals: animalInterface[] = [this.animal, this.animal];

  inProgressAnimals: animalInterface[] = [];

  sacrificedAnimals: animalInterface[] = [];

  sectionedAnimals: animalInterface[] = [];

  mountedAnimals: animalInterface[] = [];

  cryoProtectAnimals: animalInterface[] = [];

  constructor() { }

  drop(event: CdkDragDrop<animalInterface[]>) {
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
