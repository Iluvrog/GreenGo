import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jeu4Component } from './jeu4.component';

describe('Jeu4Component', () => {
  let component: Jeu4Component;
  let fixture: ComponentFixture<Jeu4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Jeu4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Jeu4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
