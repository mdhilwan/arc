import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalBoardComponent } from './animal-board.component';

describe('AnimalBoardComponent', () => {
  let component: AnimalBoardComponent;
  let fixture: ComponentFixture<AnimalBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
