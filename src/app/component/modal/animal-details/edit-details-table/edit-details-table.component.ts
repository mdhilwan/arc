import { Component, Input, OnInit } from '@angular/core';
import { AnimalModel } from '../../../../model/animalModel';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-details-table',
  templateUrl: './edit-details-table.component.html',
  styleUrls: ['./edit-details-table.component.scss']
})
export class EditDetailsTableComponent implements OnInit {

  @Input() animalModel: AnimalModel | undefined;

  animalModelFormGroup: FormGroup = new FormGroup<any>({
    'animalNumber': new FormControl(''),
    'animalNumberInCage': new FormControl(''),
    'sectionDate': new FormControl(''),
    'mounted': new FormControl(''),
    'painModel': new FormControl(''),
    'purpose': new FormControl(''),
    'isArchived': new FormControl(''),
    'sacDate': new FormControl(''),
    'surgeryDate': new FormControl(''),
    'cryoprotect': new FormControl(''),
    'comments': new FormControl(''),
    'parents': new FormControl(''),
    'dob': new FormControl(''),
    'injection': new FormControl(''),
    'location': new FormControl(''),
    'sex': new FormControl(''),
    'type': new FormControl('')
  });

  constructor() { }

  ngOnInit() {
    this.animalModelFormGroup.patchValue({
      'animalNumber': this.animalModel?.animalNumber,
      'animalNumberInCage': this.animalModel?.animalNumberInCage,
      'sectionDate': new Date(this.animalModel?.sectionDate as string),
      'mounted': new Date(this.animalModel?.mounted as string),
      'painModel': this.animalModel?.painModel,
      'purpose': this.animalModel?.purpose,
      'isArchived': this.animalModel?.isArchived,
      'sacDate': new Date(this.animalModel?.sacDate as string),
      'surgeryDate': new Date(this.animalModel?.surgeryDate as string),
      'cryoprotect': new Date(this.animalModel?.cryoprotect as string),
      'comments': this.animalModel?.comments,
      'parents': this.animalModel?.parents,
      'dob': new Date(this.animalModel?.dob as string),
      'injection': this.animalModel?.injection,
      'location': this.animalModel?.location,
      'sex': this.animalModel?.sex,
      'type': this.animalModel?.type
    })
  }
}
