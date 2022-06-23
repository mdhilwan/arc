import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, forkJoin, map, Observable} from 'rxjs';
import {AnimalModelDto} from '../model/animalModelDto';
import {AnimalModel} from '../model/animalModel';

@Injectable({
  providedIn: 'root'
})
export class AnimalDataService {

  private animalData$: { [key: string]: BehaviorSubject<any> } = {};

  private options: {
    headers?: HttpHeaders;
    observe?: 'body';
    params?: HttpParams;
    reportProgress?: boolean;
    responseType: 'arraybuffer';
    withCredentials?: boolean;
  } = {
    responseType: 'arraybuffer'
  };
  private commentsCollection = new Set<string>([]);
  private locationsCollection = new Set<string>([]);
  private injectionsCollection = new Set<string>([]);
  private painModelsCollection = new Set<string>([]);
  private parentsCollection = new Set<string>([]);
  private purposesCollection = new Set<string>([]);

  constructor(private http: HttpClient) { }

  fetchData() {
    forkJoin([
      this.fetchCsv('http://localhost:8080/dyn-cre-Mice-Group.txt', 'dyn cre'),
      this.fetchCsv('http://localhost:8080/vglut2-Mice-Group.txt', 'vglut2'),
      this.fetchCsv('http://localhost:8080/wt-Mice-Group.txt', 'wild type'),
      this.fetchCsv('http://localhost:8080/wt2-Mice-Group.txt', 'wild type 2'),
      this.fetchCsv('http://localhost:8080/enk-cre-Mice-Group.txt', 'enk cre')
    ]).subscribe(async (data) => {
      Promise.all(data).then((animalDataObjMultiCollection) => {
        this.extractDataPoints(animalDataObjMultiCollection);
        const [dynCre, vglut2, wt, wt2, enkCre] = animalDataObjMultiCollection
        this.animalData$['dyn cre'].next(dynCre);
        this.animalData$['vglut2'].next(vglut2);
        this.animalData$['wild type'].next(wt);
        this.animalData$['wild type 2'].next(wt2);
        this.animalData$['enk cre'].next(enkCre);
      })
    });
  }

  private extractDataPoints(animalDataObjMultiCollection: Awaited<unknown>[]) {
    animalDataObjMultiCollection.forEach((animalDataCollection: any) => {
      animalDataCollection.forEach((animalData: any) => {
        this.extractLocations(animalData);
        this.extractComments(animalData);
        this.extractInjections(animalData);
        this.extractPainModel(animalData);
        this.extractParents(animalData);
        this.extractPurpose(animalData);
      })
    })
  }

  getData$(collectionType: string) {
    if (Object.keys(this.animalData$).length > 0) {
      if (this.animalData$[collectionType]) {
        return this.animalData$[collectionType].asObservable();
      } else {
        console.log(this.animalData$)
        throw new Error('Unknown Collection: ' + collectionType);
      }
    } else {
      return new Observable<any>();
    }
  }

  setAnimal$(animalList: AnimalModelDto[]) {
    this.http.post('http://localhost:50075/api/animal/new', animalList).subscribe((data) => {
      console.log(data);
    });
  }

  private fetchCsv(url: string, type: string) {
    this.animalData$[type] = new BehaviorSubject<any>([]);
    return this.http.get(url, this.options)
      .pipe(
        map(async (file: ArrayBuffer) => {
          let animalJsonObject = await AnimalDataService.ConvertArrayBufferToJsonObject(file)
          animalJsonObject = AnimalDataService.cleanJsonObject(animalJsonObject);
          animalJsonObject = AnimalDataService.addUniqueIds(animalJsonObject);
          animalJsonObject = AnimalDataService.addType(type, animalJsonObject);
          animalJsonObject = AnimalDataService.convertDates(animalJsonObject);
          return AnimalDataService.makeCollectionOfAnimalModels(animalJsonObject);
          ////////// this.setAnimal$(animalJsonObject)
        })
      );
  }

  private doFetchData() {
    return this.http.get('http://localhost:50075/api/animal/all')
      .pipe(
        map((animalData: any) => {
          const animalCol = animalData.map((animal: any) => new AnimalModel(animal));
          // this.animalData$.next(animalCol);
        })
      )
  }


  private static async ConvertArrayBufferToJsonObject(arrayBuffer: ArrayBuffer): Promise<any> {
    const blob: Blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
    const csvText: string = await blob.text();
    return AnimalDataService.ConvertCsvToJsonObject(csvText);
  }

  private static ConvertCsvToJsonObject(csv: string) {
    let lines = csv.split('\n');
    lines = lines.map(line => line.replace(/[\r]/gm, ''));
    let len = lines.length;
    let result = [];
    let headers = lines[0].split('\t').map(head => this.camelize(head));

    for (let i = 1; i < len; i++) {
      let obj: any = {};
      let currentline = lines[i].split('\t');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j].replace(/[\"]/gm, '');
      }

      result.push(obj);
    }

    return result;
  }

  private static cleanJsonObject(animalJsonObject: any[]) {
    let entries = this.removeEmptyEntries(animalJsonObject);
    entries = this.removeEmptyKeys(entries);
    entries = this.setDefaultCageIfEmpty(entries)
    return entries;
  }

  private static removeEmptyEntries(animalJsonObject: any[]) {
    return animalJsonObject.filter((obj: any) => {
      const animalObjectValuesPerRow = Object.values(obj);
      const nonEmptyChar = animalObjectValuesPerRow.filter(val => {
        return val !== '' && val !== '\r';
      });
      return nonEmptyChar.length > 0;
    })
  }

  private static removeEmptyKeys(entries: any[]) {
    return entries.map((entry: any) => {
      delete entry['']
      return entry
    })
  }

  private static setDefaultCageIfEmpty(entries: any[]) {
    return entries.map((entry: any) => {
      if (entry['Cage No'] === '') {
        entry['Cage No'] = 'none';
      }
      return entry;
    });
  }

  private static random20String() {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = 20; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  private static camelize(str: string) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }

  private static addUniqueIds(animalJsonObject: any[]) {
    return animalJsonObject.map((entry: any) => {
      entry.uid = this.random20String();
      return entry;
    })
  }

  private static addType(type: string, animalJsonObject: any[]) {
    return animalJsonObject.map((entry: any) => {
      entry.type = type;
      return entry;
    })
  }

  private static convertDates(animalJsonObject: any[]) {
    return animalJsonObject.map((entry: any) => {
      this.doConvertDates(entry, 'surgeryDate');
      this.doConvertDates(entry, 'sectionDate');
      this.doConvertDates(entry, 'cryoprotect');
      this.doConvertDates(entry, 'mounted');
      this.doConvertDates(entry, 'sacDate');
      this.doConvertDates(entry, 'dOB');
      return entry;
    })
  }

  private static doConvertDates(entry: any, attr: string) {
    if (entry[attr]) {
      if (entry[attr] !== 'Y') {
        entry[attr] = new Date(entry[attr]).toDateString();
      } else {
        entry[attr] = 'No Date Provided';
      }
    }
  }

  private static makeCollectionOfAnimalModels(animalJsonObject: any[]) {
    return animalJsonObject.map((entry: any) => new AnimalModel(entry));
  }

  private extractComments(animalData: any) {
    if (animalData['comments'] && animalData['comments'] !== '') {
      this.commentsCollection.add(animalData['comments']);
    }
  }

  private extractLocations(animalData: any) {
    if (animalData['location'] && animalData['location'] !== '') {
      this.locationsCollection.add(animalData['location'])
    }
  }

  private extractInjections(animalData: any) {
    if (animalData['injection'] && animalData['injection'] !== '') {
      this.injectionsCollection.add(animalData['injection'])
    }
  }

  private extractPainModel(animalData: any) {
    if (animalData['painModel'] && animalData['painModel'] !== '') {
      this.painModelsCollection.add(animalData['painModel'])
    }
  }

  private extractParents(animalData: any) {
    if (animalData['parents'] && animalData['parents'] !== '') {
      this.parentsCollection.add(animalData['parents'])
    }
  }

  private extractPurpose(animalData: any) {
    if (animalData['purpose'] && animalData['purpose'] !== '') {
      this.purposesCollection.add(animalData['purpose'])
    }
  }
}
