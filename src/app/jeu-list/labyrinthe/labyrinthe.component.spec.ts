import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabyrintheComponent } from './labyrinthe.component';

describe('LabyrintheComponent', () => {
  let component: LabyrintheComponent;
  let fixture: ComponentFixture<LabyrintheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabyrintheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabyrintheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
