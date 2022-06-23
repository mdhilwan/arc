import { Component, Input } from '@angular/core';
import { AnimalModel } from '../../../../model/animalModel';

@Component({
  selector: 'app-details-table',
  templateUrl: './details-table.component.html',
  styleUrls: ['./details-table.component.scss']
})
export class DetailsTableComponent {

  @Input() animalModel: AnimalModel | undefined;

  constructor() { }

}
