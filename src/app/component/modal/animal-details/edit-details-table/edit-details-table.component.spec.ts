import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDetailsTableComponent } from './edit-details-table.component';

describe('EditDetailsTableComponent', () => {
  let component: EditDetailsTableComponent;
  let fixture: ComponentFixture<EditDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDetailsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
