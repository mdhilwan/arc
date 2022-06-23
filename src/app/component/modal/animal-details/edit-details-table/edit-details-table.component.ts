import { Component, Input } from '@angular/core';
import { AnimalModel } from '../../../../model/animalModel';

@Component({
  selector: 'app-edit-details-table',
  templateUrl: './edit-details-table.component.html',
  styleUrls: ['./edit-details-table.component.scss']
})
export class EditDetailsTableComponent {

  @Input() animalModel: AnimalModel | undefined;

  constructor() { }

}
