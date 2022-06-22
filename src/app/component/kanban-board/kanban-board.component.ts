import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AnimalDataService } from '../../service/animal-data.service';
import { AnimalModelDto } from '../model/animalModelDto';
import { AnimalModel } from '../model/animalModel';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {

  newAnimals: AnimalModel[] = [];
  inProgressAnimals: AnimalModel[] = [];
  sacrificedAnimals: AnimalModel[] = [];
  sectionedAnimals: AnimalModel[] = [];
  mountedAnimals: AnimalModel[] = [];
  cryoProtectAnimals: AnimalModel[] = [];
  fdicAnimals: AnimalModel[] = [];

  constructor(private animalDataService: AnimalDataService) { }

  async ngOnInit() {
    this.animalDataService.getData$().subscribe((data: AnimalModel[]) => {
      if (data) {
        data.forEach(dat => {
          this.funnelAnimalModelsIntoSwimLanes(dat);
        })
      }
    });
  }

  drop(event: CdkDragDrop<AnimalModelDto[]>) {
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

  private funnelAnimalModelsIntoSwimLanes(animal: AnimalModel) {
    if (animal.fdic) {
      this.fdicAnimals.push(animal);
    } else if (animal.doneCryoprotect) {
      this.cryoProtectAnimals.push(animal);
    } else if (animal.doneMounted) {
      this.mountedAnimals.push(animal);
    } else if (animal.doneSectioned) {
      this.sectionedAnimals.push(animal);
    } else if (animal.doneSacrificed) {
      this.sacrificedAnimals.push(animal);
    } else {
      this.inProgressAnimals.push(animal);
    }
  }
}
