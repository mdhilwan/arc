import { purposeTagInterface } from './purposeTag.interface';

export interface animalInterface {
  animalNumber: string;
  parent: string;
  dob: Date;
  location: string;
  cageNumber: string;
  sex: string;
  purposeTag: purposeTagInterface;
}
