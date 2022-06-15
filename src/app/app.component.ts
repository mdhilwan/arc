import { Component, OnInit } from '@angular/core';
import { AnimalDataService } from './service/animal-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'arc';

  constructor(private animalDataService: AnimalDataService) {
  }

  ngOnInit(): void {
    this.animalDataService.fetchData();
  }

}
