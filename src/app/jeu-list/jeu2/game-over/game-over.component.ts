import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog' ;

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.css']
})
export class GameOverComponent implements OnInit {

  constructor(private router:Router, private dialogue: MatDialog) { }

  ngOnInit(): void {
  }

  click() {
    this.router.navigate(['home']) ;
    this.dialogue.closeAll() ;
  }
}
