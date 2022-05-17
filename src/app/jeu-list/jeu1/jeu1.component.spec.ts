import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jeu1Component } from './jeu1.component';

describe('Jeu1Component', () => {
  let component: Jeu1Component;
  let fixture: ComponentFixture<Jeu1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Jeu1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Jeu1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
