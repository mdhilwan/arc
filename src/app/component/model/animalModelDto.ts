import { AnimalInterfaceDto } from '../../interface/animalInterfaceDto';

export class AnimalModelDto {

  _data: AnimalInterfaceDto | undefined;

  constructor(data: AnimalInterfaceDto) {
    this._data = data;
  }

  get animalNumber(): string | undefined {
    return this._data?.['Animal No'];
  }

  get animalNumberInCage(): string | undefined {
    return this._data?.['Animal No in Cage'];
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

  get cryoprotect(): string {
    return <string>this._data?.Cryoprotect;
  }

  get doneCryoprotect(): boolean {
    return !!this._data?.Cryoprotect;
  }

  get comments(): string {
    return <string>this._data?.Comments;
  }

  get fdic(): boolean {
    return this.comments.search(/FDIC/g) > -1;
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
