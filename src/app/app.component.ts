import { Question } from './question';
import { Component, OnInit } from '@angular/core';
import fileQuestionsJSON from '../assets/questions.json'
import fileAnswerJSON from '../assets/answers.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TER';
  gameSelected: string | undefined;
  gameList: string[] | undefined
  
  ngOnInit(): void {
    this.gameList = ["Labyrinthe","Trivial poursuit", "Incollables", "Qui veut gagner des millions"];
  }
}
