import { Component, HostBinding, Inject, Input } from '@angular/core';
import { AnimalModel } from '../../model/animalModel';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.scss']
})
export class AnimalCardComponent {

  @Input() animal: AnimalModel | undefined
  @HostBinding('class') class = 'animal-card';

  constructor() {
  }

  viewDetails($event: MouseEvent) {
    console.log(this.animal);
  }
}
