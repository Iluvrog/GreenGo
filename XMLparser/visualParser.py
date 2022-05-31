import parser as p
import tkinter as tk
from tkinter import filedialog
from tkinter import ttk

class visualParser(tk.Tk):
    def __init__(self, *args, **kwargs):
        tk.Tk.__init__(self, *args, **kwargs)
        container = tk.Frame(self)
        container.pack(side="top", fill="both", expand=True)
        container.grid_rowconfigure(0, weight=1)
        container.grid_columnconfigure(0, weight=1)

        self.frames = {}
        for F in (uploadPage, questionPage):
            page_name = F.__name__
            frame = F(parent=container, controller=self)
            self.frames[page_name] = frame
            frame.grid(row=0, column=0, sticky="nsew")
        self.show_frame("uploadPage")

    def show_frame(self, page_name):
        frame = self.frames[page_name]
        frame.tkraise()

    def startQuestionPage(self, questionList):
        questionPage = self.frames["questionPage"]
        questionPage.setQuestionList(questionList)
        questionPage.startEdition()
        questionPage.tkraise()


class uploadPage(tk.Frame):
    def __init__(self, parent, controller):
        def UploadAction(questionList, event=None):
            filename = filedialog.askopenfilename(filetypes=(("XML Files", "*.xml"),),title = "XML file selection", multiple = False)
            print('Selected:', filename)
            questionList = p.XMLparser(filename)
            if questionList != []:
                controller.startQuestionPage(questionList)

        tk.Frame.__init__(self, parent)
        self.controller = controller
        label = tk.Label(self, text="This is the upload page")
        label.pack(side="top", fill="x", pady=10)
        self.questionList = []
        button1 = tk.Button(self, text="Select XML", command=lambda: UploadAction(self.questionList))
        button1.pack()




class questionPage(tk.Frame):
    isStarted = False

    def clear_question(self):
        widgetList = self.winfo_children()
        for widget in widgetList:
            widget.destroy()

    def reset(self):
        self.index = 0
        self.clear_question()
        self.controller.show_frame("uploadPage")

    def __init__(self, parent, controller):
        tk.Frame.__init__(self, parent)
        self.controller = controller
        self.index = 0

    def next(self):
        if self.index < self.nbQuest - 1:
            self.index += 1
            self.clear_question()
            self.startEdition()
        else:
            print("no more question")

    def previous(self):
        if self.index > 0:
            self.index -= 1
            self.clear_question()
            self.startEdition()
        else:
            print("already first question")

    def setQuestionList(self, questionList):
        self.questionList = questionList
        self.nbQuest = len(self.questionList)

    def startEdition(self):
        
        button = tk.Button(self, text="Reset", command= self.reset)
        button.grid(row=0, column= 1)
        previousButton = tk.Button(self, text = "previous", command = self.previous)
        previousButton.grid(row=0, column= 0)
        nextButton = tk.Button(self, text = "next", command = self.next)
        nextButton.grid(row=0, column= 2)
        if self.nbQuest > 0:

            i = self.index
            currentQuestion = self.questionList[i]
            ##typeEntry = tk.Entry(self)
            ##typeEntry.insert('end', self.questionList[i].getType())

            type = currentQuestion.getType()
            typeCombo = ttk.Combobox(self, values=["MultiChoice","SingleChoice", "True/False"], state = "readonly")

            if type != "":
                if type == "multichoice":
                    if currentQuestion.getSingle() == "true":
                        typeCombo.current(1)
                    elif currentQuestion.getSingle() == "false":
                        typeCombo.current(0)
                elif type == "truefalse":
                    typeCombo.current(2)
            typeText = tk.Label(self, text = "type: ")


            questEntry = tk.Entry(self)
            questEntry.insert('end', currentQuestion.getQuestion())

            questText = tk.Label(self, text = "question: ")

            typeText.grid(row=1, column= 0)
            ##typeEntry.pack(side="top", fill="x")
            typeCombo.grid(row=1, column= 1)
            questText.grid(row=2, column= 0)
            questEntry.grid(row=2, column= 1)
            answText = tk.Label(self, text = "Answers: ")
            answText.grid(row=3, column= 0)
            answers = currentQuestion.getAnswers()
            answerTextList = []
            for j in range(len(answers)):
                answerText = tk.Entry(self)
                answerValue = tk.Entry(self)
                print("réponse" + answers[j][0])
                print("value =" + answers[j][1])
                answerText.insert('end', answers[j][0])
                answerValue.insert('end', answers[j][1])
                
                answerText.grid(row = 4+j, column = 0)
                answerValue.grid(row = 4+j,column = 1)

                answerTextList.append((answerText,answerValue))

if __name__ == "__main__":
    app = visualParser()
    app.mainloop()