import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  answer:boolean | undefined ;
  correctAnswer:boolean | undefined ;
  levelCounter:number = 0 ;
  scores:number[] = new Array(0,0,0,0) ;

  constructor() { }
}
