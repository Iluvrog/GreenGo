export class Question {
    text : string | undefined
    answers : string[] | undefined
    answerValue: number[] | undefined
    questionType : number | undefined
    feedback : string | undefined

    

    constructor(txt?:string, ans?:string[], ansV?:number[], qt?:number, fb?:string){
        this.text = txt
        if(this.answers != undefined){
            this.answers = ans
        }else{
            this.answers = []
        }

        if(this.answerValue != undefined){
            this.answerValue= ansV
        }else{
            this.answerValue = [] 
        }
        this.questionType = qt
        this.feedback = fb
    }

    getText(){
        return this.text
    }
    getAnswers(){
        return this.answers
    }
    getAnswerValue(){
        return this.answerValue
    }
    getQuestionType(){
        return this.questionType
    }
    getFeedback(){
        return this.feedback
    }
}
