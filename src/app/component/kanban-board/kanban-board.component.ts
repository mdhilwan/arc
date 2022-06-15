import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { animalInterface } from '../../interface/animal.interface';
import { purposeTagInterface } from '../../interface/purposeTag.interface';
import { AnimalDataService } from '../../service/animal-data.service';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {

  purposeA: purposeTagInterface = {
    purpose: 'CPP',
    description: 'CPP practice / retro virus'
  }

  purposeTags: purposeTagInterface[] = [this.purposeA]

  newAnimals: animalInterface[] = [];
  inProgressAnimals: animalInterface[] = [];
  sacrificedAnimals: animalInterface[] = [];
  sectionedAnimals: animalInterface[] = [];
  mountedAnimals: animalInterface[] = [];
  cryoProtectAnimals: animalInterface[] = [];

  constructor(private animalDataService: AnimalDataService) { }

  ngOnInit() {
    this.animalDataService.getData$().subscribe(data => {
      console.log(data);
    })
  }

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
