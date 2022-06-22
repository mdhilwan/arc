import { Component, HostBinding, Input } from '@angular/core';
import { AnimalModel } from '../../model/animalModel';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.scss']
})
export class AnimalCardComponent {

  @Input() animal: AnimalModel | undefined
  @HostBinding('class') class = 'animal-card';

  constructor() { }

}
