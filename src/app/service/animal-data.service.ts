import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { AnimalModelDto } from '../component/model/animalModelDto';
import { AnimalModel } from '../component/model/animalModel';

@Injectable({
  providedIn: 'root'
})
export class AnimalDataService {

  private animalData$ = new BehaviorSubject<any>(null);

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

  constructor(private http: HttpClient) { }

  fetchData() {
     this.fetchCsv('http://localhost:8080/dyn-cre-Mice-Group.txt', 'dyn cre').subscribe();
     this.fetchCsv('http://localhost:8080/wt-Mice-Group.txt', 'wild type').subscribe();
     this.fetchCsv('http://localhost:8080/wt2-Mice-Group.txt', 'wild type 2').subscribe();
     this.fetchCsv('http://localhost:8080/enk-cre-Mice-Group.txt', 'enk cre').subscribe();
  }

  getData$() {
    return this.animalData$.asObservable();
  }

  setAnimal$(animalList: AnimalModelDto[]) {
    this.http.post('http://localhost:50075/api/animal/new', animalList).subscribe((data) => {
      console.log(data);
    });
  }

  private fetchCsv(url: string, type: string) {
    return this.http.get(url, this.options)
      .pipe(
        map(async (file: ArrayBuffer) => {
          let animalJsonObject = await AnimalDataService.ConvertArrayBufferToJsonObject(file)
          animalJsonObject = AnimalDataService.cleanJsonObject(animalJsonObject);
          animalJsonObject = AnimalDataService.addUniqueIds(animalJsonObject);
          animalJsonObject = AnimalDataService.addType(type, animalJsonObject);
          console.log(animalJsonObject);
          // this.setAnimal$(animalJsonObject)
        })
      );
  }

  private doFetchData() {
    return this.http.get('http://localhost:50075/api/animal/all')
      .pipe(
        map((animalData: any) => {
          const animalCol = animalData.map((animal: any) => new AnimalModel(animal));
          this.animalData$.next(animalCol);
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
    let headers = lines[0].split('\t');

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

  private static addArchive(archiveFlag: boolean, animalJsonObject: any[]) {
    return animalJsonObject.map((entry: any) => {
      entry.isArchived = archiveFlag;
      return entry;
    })
  }
}
