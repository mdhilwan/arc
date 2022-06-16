import { AnimalInterface } from '../../interface/animalInterface';

export class AnimalModel {

  _data: AnimalInterface | undefined;

  constructor(data: AnimalInterface) {
    this._data = data;
  }

  get animalNumber(): string | undefined {
    return this._data?.['Animal No'];
  }

  get sectionDate(): string | undefined {
    return this._data?.['Section date'];
  }

  get doneSectioned(): boolean {
    return !!this._data?.['Section date'];
  }

  get mounted(): string {
    return <string>this._data?.Mounted;
  }

  get doneMounted(): boolean {
    return !!this._data?.Mounted;
  }

  get sacDate(): string {
    return <string>this._data?.['Sac date'];
  }

  get doneSacrificed(): boolean {
    return !!this._data?.['Sac date']
  }

  get surgeryDate(): string {
    return <string>this._data?.['Surgery date'];
  }

  get doneSurgery(): boolean {
    return !!this._data?.['Surgery date'];
  }

  get comments(): string {
    return <string>this._data?.Comments;
  }

  get parents(): string {
    return <string>this._data?.Parents;
  }

  get cageNo(): string {
    return <string>this._data?.['Cage No'];
  }

  get dob(): string {
    return <string>this._data?.DOB;
  }

  get injection(): string {
    return <string>this._data?.Injection;
  }

  get location(): string {
    return <string>this._data?.Location;
  }

  get painModel(): string {
    return <string>this._data?.['Pain model'];
  }

  get purpose(): string {
    return <string>this._data?.Purpose;
  }

  get sex(): string {
    return <string>this._data?.Sex;
  }
}
