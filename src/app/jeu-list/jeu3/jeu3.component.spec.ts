import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jeu3Component } from './jeu3.component';

describe('Jeu3Component', () => {
  let component: Jeu3Component;
  let fixture: ComponentFixture<Jeu3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Jeu3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Jeu3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
