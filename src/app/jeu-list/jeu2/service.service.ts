import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  answer:boolean | undefined ;
  correctAnswer:boolean | undefined ;

  constructor() { }
}
