import re
from unicodedata import category
import xml.etree.ElementTree as ET


class questionClass:
    def __init__(self, type, quest):
        self.type = type
        self.quest = quest
        self.answers = []

    def addAnswer(self, answer, fraction):
        self.answers.append((answer, fraction))

    def setFeedback(self, general="", correct="", partial="", incorrect=""):
        self.feedback = [general, correct, partial, incorrect]

    def setSingle(self, value):
        self.single = value

    def getFeedback(self):
        return self.feedback

    def getType(self):
        return self.type

    def getQuestion(self):
        return self.quest

    def getAnswers(self):
        return self.answers

    def getSingle(self):
        return self.single


def XMLparser(filename):
    tree = ET.parse(filename)
    root = tree.getroot()
    if root.tag != "quiz":
        print("wrong xml file, not a quiz")
        exit

    HTMLTag = re.compile('<.*?>')

    questionList = []
    for question in root:
        type = question.attrib.get("type")
        if type == "category":
            pass

        elif type == "multichoice":
            for child in question:
                if child.tag == "name":
                    pass
                elif child.tag == "generalfeedback":
                    general = re.sub(HTMLTag, '', str(child[0].text))
                elif child.tag == "questiontext":
                    newQuestion = questionClass(
                        type, re.sub(HTMLTag, '', str(child[0].text)))
                elif child.tag == "defaultgrade":
                    pass
                elif child.tag == "penalty":
                    pass
                elif child.tag == "hidden":
                    pass
                elif child.tag == "idnumber":
                    pass
                elif child.tag == "single":
                    single = child.text
                elif child.tag == "shuffleanswers":
                    pass
                elif child.tag == "answernumbering":
                    pass
                elif child.tag == "showstandardinstruction":
                    pass
                elif child.tag == "correctfeedback":
                    correct = re.sub(HTMLTag, '', str(child[0].text))
                elif child.tag == "partiallycorrectfeedback":
                    partial = re.sub(HTMLTag, '', str(child[0].text))
                elif child.tag == "incorrectfeedback":
                    incorrect = re.sub(HTMLTag, '', str(child[0].text))
                elif child.tag == "answer":
                    fraction = child.attrib.get("fraction")
                    newQuestion.addAnswer(
                        re.sub(HTMLTag, '', str(child[0].text)), fraction)
            newQuestion.setFeedback(general, correct, partial, incorrect)
            newQuestion.setSingle(single)
            questionList.append(newQuestion)

        elif type == "truefalse":
            for child in question:
                if child.tag == "name":
                    pass
                elif child.tag == "generalfeedback":
                    general = re.sub(HTMLTag, '', str(child[0].text))
                elif child.tag == "questiontext":
                    newQuestion = questionClass(
                        type, re.sub(HTMLTag, '', str(child[0].text)))
                ##elif child.tag == "defaultgrade":
                ##    pass
                ##elif child.tag == "penalty":
                ##    pass
                ##elif child.tag == "hidden":
                ##    pass
                ##elif child.tag == "idnumber":
                ##    pass
                elif child.tag == "single":
                    single = child.text
                ##elif child.tag == "shuffleanswers":
                ##    pass
                ##elif child.tag == "answernumbering":
                ##    pass
                ##elif child.tag == "showstandardinstruction":
                ##    pass
                elif child.tag == "correctfeedback":
                    correct = re.sub(HTMLTag, '', str(child[0].text))
                elif child.tag == "partiallycorrectfeedback":
                    partial = re.sub(HTMLTag, '', str(child[0].text))
                elif child.tag == "incorrectfeedback":
                    incorrect = re.sub(HTMLTag, '', str(child[0].text))
                elif child.tag == "answer":
                    fraction = child.attrib.get("fraction")
                    newQuestion.addAnswer(
                        re.sub(HTMLTag, '', str(child[0].text)), fraction)
            newQuestion.setFeedback(general, correct, partial, incorrect)
            newQuestion.setSingle(single)
            questionList.append(newQuestion)

    return questionList
