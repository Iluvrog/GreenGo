import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleJ3Component } from './rule-j3.component';

describe('RuleJ3Component', () => {
  let component: RuleJ3Component;
  let fixture: ComponentFixture<RuleJ3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleJ3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleJ3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
