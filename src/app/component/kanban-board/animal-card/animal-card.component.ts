import {Component, HostBinding, Input} from '@angular/core';
import { animalInterface } from '../../../interface/animal.interface';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.scss']
})
export class AnimalCardComponent {

  @Input() animal: animalInterface | undefined
  @HostBinding('class') class = 'animal-card';

  constructor() { }

}
