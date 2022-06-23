import { Component, HostBinding, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ControlPanelService } from '../../../service/control-panel.service';
import { AnimalModel } from '../../model/animalModel';

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

  dragDisabled: boolean = true;

  constructor(public controlPanelService: ControlPanelService) {
    this.controlPanelService.getControl().subscribe((controlPanel: any) => {
      if (controlPanel) {
        this.dragDisabled = !controlPanel.draggable;
        this.class = controlPanel.draggable ? 'single-board is-archived' : 'single-board';
      }
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
