import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { combineLatestInit } from 'rxjs/internal/observable/combineLatest';

import { QuestionService } from './question.service';

describe('QuestionService', () => {
  let service: QuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get Questions', () => {
    let a = service.getNQuestions(2);
    expect(a).toBeTruthy();
  });

  it('should click response', () => {
    let a = service.clickReponse(1, 2, true, true, true, true, false, true);
    expect(a[0]).toBe(true);
    expect(a[1]).toBe(false);
    expect(a[2]).toBe(false);
    expect(a[3]).toBe(false);
    expect(a[4]).toBe(true);
    expect(a[5]).toBe(1);
  });

  it('should click responseM', () => {
    let a = service.clickReponseM(1, 2, false, true, true, true, false, true);
    expect(a[0]).toBe(false);
    expect(a[1]).toBe(true);
    expect(a[2]).toBe(true);
    expect(a[3]).toBe(true);
    expect(a[4]).toBe(false);
  });

  it('should go to next question', () => {
    let a = service.questionSuivante(3, true, 1);
    let tab = service.reset();
    expect(a[0]).toBe(4);
    expect(a[1]).toBe(false);
    expect(a[2]).toBe(tab[0]);
    expect(a[3]).toBe(tab[1]);
    expect(a[4]).toBe(tab[2]);
    expect(a[5]).toBe(tab[3]);
    expect(a[6]).toBe(tab[4]);
    expect(a[7]).toBe(tab[5]);
    expect(a[8]).toBe(false);
    expect(a[9]).toBe('nothing');
    expect(a[10]).toBe('nothing');  
    expect(a[11]).toBe('nothing');
    expect(a[12]).toBe('nothing');  
  });


  it('should start new session', () => {
    let tab = service.reset();
    let a = service.nouvellePartie();
    expect(a[0]).toBe(tab[0]);
    expect(a[1]).toBe(tab[1]);
    expect(a[2]).toBe(tab[2]);
    expect(a[3]).toBe(tab[3]);
    expect(a[4]).toBe(tab[4]);
    expect(a[5]).toBe(tab[5]);
    expect(a[6]).toBe(false);
    expect(a[7]).toBe('nothing');
    expect(a[8]).toBe(0);
    expect(a[9]).toBe(1);
    expect(a[10]).toBe(false);
  });

  it('should reset', () => {
    let a = service.reset();
    expect(a[0]).toBe(false);
    expect(a[1]).toBe(false);
    expect(a[2]).toBe(false);
    expect(a[3]).toBe(false);
    expect(a[4]).toBe(false);
    expect(a[5]).toBe(0);
  })
});
