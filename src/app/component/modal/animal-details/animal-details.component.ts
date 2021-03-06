import { Component, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { AnimalModel } from '../../../model/animalModel';

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.scss']
})
export class AnimalDetailsComponent {

  editing: boolean = false;

  constructor(public dialogRef: DialogRef<string>, @Inject(DIALOG_DATA) public animalModel: AnimalModel) {}

  editAnimal() {
    this.editing = !this.editing;
    // console.log(this.animalModel);
  }
}
