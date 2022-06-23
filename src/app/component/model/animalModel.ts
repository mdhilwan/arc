import { AnimalInterface } from '../../interface/animalInterface';

export class AnimalModel {

  _data: AnimalInterface | undefined;

  constructor(data: AnimalInterface) {
    this._data = data;
  }

  get animalNumber(): string | undefined {
    return this._data?.animalNo;
  }

  get animalNumberInCage(): string | undefined {
    return this._data?.animalNoInCage;
  }

  get isArchived(): boolean {
    return !!this._data?.isArchived;
  }

  get sectionDate(): string | undefined {
    return this._data?.sectionDate;
  }

  get doneSectioned(): boolean {
    return !!this._data?.sectionDate;
  }

  get mounted(): string {
    return <string>this._data?.mounted;
  }

  get doneMounted(): boolean {
    return !!this._data?.mounted;
  }

  get sacDate(): string {
    return <string>this._data?.sacDate;
  }

  get doneSacrificed(): boolean {
    return !!this._data?.sacDate
  }

  get surgeryDate(): string {
    return <string>this._data?.surgeryDate;
  }

  get doneSurgery(): boolean {
    return !!this._data?.surgeryDate;
  }

  get cryoprotect(): string {
    return <string>this._data?.cryoprotect;
  }

  get doneCryoprotect(): boolean {
    return !!this._data?.cryoprotect;
  }

  get comments(): string {
    return <string>this._data?.comments;
  }

  get fdic(): boolean {
    return this.comments.indexOf('FDIC') > -1;
  }

  get parents(): string {
    return <string>this._data?.parents;
  }

  get cageNo(): string {
    return <string>this._data?.cageNo;
  }

  get dob(): string {
    return <string>this._data?.dOB;
  }

  get injection(): string {
    return <string>this._data?.injection;
  }

  get location(): string {
    return <string>this._data?.location;
  }

  get painModel(): string {
    return <string>this._data?.painModel;
  }

  get purpose(): string {
    return <string>this._data?.purpose;
  }

  get sex(): string {
    return <string>this._data?.sex;
  }
}
