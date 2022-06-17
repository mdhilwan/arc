import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AnimalInterface } from '../../interface/animalInterface';
import { AnimalDataService } from '../../service/animal-data.service';
import { AnimalModel } from '../model/animal.model';

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
    this.animalDataService.getData$().subscribe((data: AnimalInterface[]) => {
      this.generateAnimalModels(data);
    });
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

  private generateAnimalModels(data: AnimalInterface[]) {
    if (data && data.length) {
      for (let i = 0; i < data.length; i++) {
        let animal = new AnimalModel(data[i]);
        this.funnelAnimalModelsIntoSwimLanes(animal);
      }
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
