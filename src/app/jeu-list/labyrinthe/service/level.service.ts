import { Injectable } from "@angular/core";
import { allLevels } from "src/app/jeu-list/labyrinthe/AllLevels";

@Injectable({
  providedIn: "root",
})
export class LevelService {
  constructor() {}

  getAllLevels() {
    return allLevels;
  }
}