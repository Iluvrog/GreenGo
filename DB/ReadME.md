# Why a database ?

We use a database to easily modify the sets of questions and answers.
It also enable for some checking of needed information.
For example it's needed to have feedback for the questions, we'll go more into detail when we get to the tables' attributes.

# The tables used

We used an oracle server to host the DB.

The database is comprised of 2 tables, one for the questions and one for the answers.

## The questions' table (Questions)

Questions(ID,format,theme,question,feedback)
<id,f,t,q,fd> IN Questions => The question id, about the theme t, is a question that uses the format f, with q as its wording and fd as the general feedback.

The ID column is used to make a link between the Questions table and the Responses table. It's used as a primary key.

The format column indicates how the question is to be answered, it's used in the games to know how to display answers and how to let the user select them.
It follows the rules :
0 => A question with multiple answers but with only one right.
1 => A question with only 2 answers possible (true/false, yes/no).
2 => A question with multiple answers and multiple are right.

The theme column is not used right now, we thought it would be useful for the games as they could want to select questions based about a theme but it wasn't taken into account later on.
We will see also that it wasn't imported that well either with our parser (see parser section).

The question column is just the text of the question. It could have been used as a primary key and link to the answer table but it's way bigger than a simple number.

The feedback column is the general feedback about the question, this is what you want people to know about the question no matter the answer.

## The answers' table (Reponses)

Reponses(IDq,answer,value,feedback)
<id,a,v,fd> IN Reponses => The answer id have a value of v with a as the wording and fd as the feedback for that answer.

The column IDq is the id of the question the answer belongs to.

The column answer is the text of the answer.

The column value is the value associated with the answer. This is linked to how the game wants to use it. Right now the value is only limited to be a positive number DB wise.

The column feedback is the feedback associated with selecting this answer, not used in the current games and usefulness debatable given how we get it right now (see parser section)

# The parser

We got the information that questions could go through a moodle platform so we made a parser to parse an XML file exported from a moodle quiz directly.

The rules of the quiz is the same as the DB :
	- The questions must all be unique
	- The answers to a question must be unique too (not checked by the Db but by the parser itself, the addition of a trigger could do it though).
	- Don�t use apostrophes in any text field, they do not do well with oracle.
	- Try not using special characters as they will most certainly be corrupted or unrecognized in the process.

The parser also have a manual editing function. We can create, delete, change questions/answers directly with it.

# DB to Angular

We wanted to update the question pool every time we launch the game, however after thinking about it the DB is not meant to change a lot and it�s more in the theme of green computing to use updates and local storage instead.

So we went with a manual update with the following usage guidelines :

	- Put the GetDBQuestions on the API server to get the question with PHP.
	- Change the logins to connect to your database and to get the correct table.
	- Put the GetDBAnswers on the API sever to get the question with PHP
	- Save the JSON and place it in the src/assets/answers.JSON and src/assets/question.JSON

# Usage

## Parser

First change the logins and server information in the GreenGoparser.py.

Use python command line to launch visualParser.py.

You might need to install jpype and jaydebeapi to python using pip.

## PHP

Change the connection information to fit your own servers.

## DB

The database is written in Oracle so you�ll may need to change it a bit to fit your servers.
The database is made of 3 files :
	- table.sql to create all tables
	- drop.sql to drop all tables
	- reset.sql to drop and create all tables

# What can be added

Ideas :
	- For different languages adapt the system to have multiple pairs of question/answer tables (parser, DB and angular API)
	- Add a column for the difficulty of the question.
	- Add triggers to detect some constraint (duplicate answers for example is only prevented in the parser).
