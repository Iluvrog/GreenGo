import sys
import re
from unicodedata import category
import xml.etree.ElementTree as ET

class questionClass:
    def __init__(self, quest):
        self.quest = quest
        self.answers = []

    def addAnswer(self, answer, fraction):
        self.answers.append((answer,fraction))

    def getQuestion(self):
        return self.quest
        
    def getAnswers(self):
        return self.answers


argc = len(sys.argv)

if argc != 2:
    print("wrong arguments")
    exit

tree = ET.parse(sys.argv[1])
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
    elif type == "multichoice" or type == "truefalse":
        for child in question:
            if child.tag == "name":
                pass
            elif child.tag == "questiontext":
                newQuestion = questionClass(re.sub(HTMLTag, '', child[0].text))
            elif child.tag == "answer":
                fraction = child.attrib.get("fraction")
                newQuestion.addAnswer(re.sub(HTMLTag, '', child[0].text),fraction)
        questionList.append(newQuestion)
    # elif type == "truefalse":
    #     for child in question:
    #         if child.tag == "name":
    #             for sub in child:
    #                 pass

for question in questionList:
    print(question.getQuestion(),question.getAnswers())