import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, map} from 'rxjs';

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
     this.doFetchData().subscribe();
  }

  getData$() {
    return this.animalData$.asObservable();
  }

  private doFetchData() {
    return this.http.get('http://localhost:8080/Mice-Group-1.txt', this.options)
      .pipe(
        map(async (file: ArrayBuffer) => {
          const animalJsonObject = await AnimalDataService.ConvertArrayBufferToJsonObject(file)
          this.animalData$.next(AnimalDataService.cleanJsonObject(animalJsonObject));
        })
      );
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
}
