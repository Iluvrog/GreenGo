DROP TABLE Reponses;
DROP TRIGGER QuestionOnInsert;
DROP SEQUENCE question_sequence;
DROP TABLE Questions;

CREATE TABLE Questions (
    ID NUMBER PRIMARY KEY NOT NULL,
    format NUMBER NOT NULL,
    theme VARCHAR(12) DEFAULT ('None'),
    question VARCHAR(250) NOT NULL,
    feedback VARCHAR(500) NOT NULL,
    UNIQUE (question),
    CHECK (theme IN ('None','Energy','Production','Law','Initiative'))
);

CREATE SEQUENCE question_sequence;

CREATE OR REPLACE TRIGGER QuestionOnInsert
BEFORE INSERT ON Questions
FOR EACH ROW
BEGIN
  SELECT question_sequence.nextval
  INTO :new.ID
  FROM dual;
END;
/

CREATE TABLE Reponses (
    IDq NUMBER NOT NULL,
    answer VARCHAR(200) NOT NULL,
    value NUMBER NOT NULL,
    feedback VARCHAR(300),
    PRIMARY KEY (IDq,answer),
    FOREIGN KEY (IDq) REFERENCES Questions(ID),
    CHECK (value >= 0)
);