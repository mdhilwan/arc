import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AnimalDataService } from '../../service/animal-data.service';
import { AnimalModelDto } from '../model/animalModelDto';
import { AnimalModel } from '../model/animalModel';
import { ControlPanelService } from '../../service/control-panel.service';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {

  @Input() collectionType: string = '';

  viewArchived: boolean = false;

  allAnimals: AnimalModel[] = [];

  newAnimals: AnimalModel[] = [];
  inProgressAnimals: AnimalModel[] = [];
  sacrificedAnimals: AnimalModel[] = [];
  sectionedAnimals: AnimalModel[] = [];
  mountedAnimals: AnimalModel[] = [];
  cryoProtectAnimals: AnimalModel[] = [];
  fdicAnimals: AnimalModel[] = [];

  constructor(private animalDataService: AnimalDataService,
              private controlPanelService: ControlPanelService) { }

  async ngOnInit() {
    this.animalDataService.getData$(this.collectionType).subscribe((data: AnimalModel[]) => {
      if (data) {
        this.allAnimals = data;
        this.doFilterAnimals();
      }
    });
    this.controlPanelService.getControl().subscribe(controlPanel => {
      if (controlPanel) {
        this.viewArchived = controlPanel.isArchived;
        this.revertAnimalCollection();
        this.doFilterAnimals();
      }
    })
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

  private doFilterAnimals() {
    this.getFilteredAnimals().forEach(dat => this.funnelAnimalModelsIntoSwimLanes(dat));
    this.fdicAnimals.sort(KanbanBoardComponent.getCompareFn())
    this.cryoProtectAnimals.sort(KanbanBoardComponent.getCompareFn())
    this.mountedAnimals.sort(KanbanBoardComponent.getCompareFn())
    this.sectionedAnimals.sort(KanbanBoardComponent.getCompareFn())
    this.sacrificedAnimals.sort(KanbanBoardComponent.getCompareFn())
    this.inProgressAnimals.sort(KanbanBoardComponent.getCompareFn())
  }

  private static getCompareFn() {
    return (a: AnimalModel, b: AnimalModel) => {
      return a.isArchived === b.isArchived ? 0 :
        a.isArchived ? 1 : -1;
    };
  }

  private getFilteredAnimals() {
    return this.allAnimals.filter(animal => {
      if (this.viewArchived) {
        return true;
      }
      return !animal.isArchived
    });
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

  private revertAnimalCollection() {
    this.fdicAnimals = [];
    this.cryoProtectAnimals = [];
    this.mountedAnimals = [];
    this.sectionedAnimals = [];
    this.sacrificedAnimals = [];
    this.inProgressAnimals = [];
  }
}
