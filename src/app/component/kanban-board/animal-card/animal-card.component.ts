import { Component, HostBinding, Input } from '@angular/core';
import { AnimalModel } from '../../../model/animalModel';
import { Dialog } from '@angular/cdk/dialog';
import { AnimalDetailsComponent } from '../../modal/animal-details/animal-details.component';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.scss']
})
export class AnimalCardComponent {

  @Input() animal: AnimalModel | undefined
  @HostBinding('class') class = 'animal-card';

  constructor(private dialog: Dialog) {
  }

  viewDetails() {
    console.log(this.animal);

    const dialogRef = this.dialog.open<string>(AnimalDetailsComponent, {
      width: '550px',
      data: this.animal,
    });

    dialogRef.closed.subscribe(result => {
      // this.animal = result;
    });
  }
}
