import parser as p
import tkinter as tk
from tkinter import filedialog
from traceback import clear_frames

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
        questionPage.startEdition(questionList)
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
    def clear_frame(self):
        if self.isStarted:
            for widget in self.winfo_children():
                widget.destroy()
            label = tk.Label(self, text="This is questionPage")
            label.pack(side="top", fill="x", pady=10)

            button = tk.Button(self, text="Reset", command=lambda: self.controller.show_frame("uploadPage"))
            button.pack()

    def __init__(self, parent, controller):
        tk.Frame.__init__(self, parent)
        self.isStarted = True
        self.controller = controller
        button = tk.Button(self, text="Reset", command=lambda: controller.show_frame("uploadPage"))
        button.pack()

    def startEdition(self, questionList):
        if self.isStarted:
            self.clear_frame()
        self.quests = questionList
        self.nbQuest = len(self.quests)
        self.index = 0
        if self.nbQuest > 0:
            for i in range(self.nbQuest):
                typeEntry = tk.Entry()
                typeEntry.insert('end', questionList[i].getType())
                typeText = tk.Label(text = "type: ")
                questEntry = tk.Entry()
                questText = tk.Label(text = "question: ")
                questEntry.insert('end', questionList[i].getQuestion())
                typeText.pack(side="top")
                typeEntry.pack(side="top", fill="x")
                questText.pack(side="top")
                questEntry.pack(side="top", fill="x")
                answText = tk.Label(text = "Answers: ")
                answText.pack(side="top")
                answers = questionList[i].getAnswers()
                answerTextList = []
                for j in range(len(answers)):
                    answerTextList.append(tk.Entry())
                    answerTextList[j].insert('end', answers[j])
                    answerTextList[j].pack(side="top", fill="x")
            
if __name__ == "__main__":
    app = visualParser()
    app.mainloop()