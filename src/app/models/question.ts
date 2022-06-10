export class question {
  question: string | undefined;
  reponse:string | undefined;
  choix:string[] | undefined;
  feedback:string | undefined ;
  type:number | undefined;
}

export class board_ {
    plateau: number[][] = [] ;
    hight:number | undefined ;
    width:number | undefined ;
}

export class levels {
    niveaux: board_[] = [];
}
