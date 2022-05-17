import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jeu2Component } from './jeu2.component';

describe('Jeu2Component', () => {
  let component: Jeu2Component;
  let fixture: ComponentFixture<Jeu2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Jeu2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Jeu2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
