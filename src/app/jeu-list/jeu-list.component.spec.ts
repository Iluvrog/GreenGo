import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeuListComponent } from './jeu-list.component';

describe('JeuListComponent', () => {
  let component: JeuListComponent;
  let fixture: ComponentFixture<JeuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JeuListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JeuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
