var sqlite3 = require('sqlite3'); // sudo npm install sqlite3 --build-from-source

class Database {

    FILE_NAME = "database.db";
    db;

    constructor(){
        try {
            this.db = new sqlite3.Database(this.FILE_NAME);
        } catch (error) {
            console.log("Error while setting up db connection: " + error.message);
        }
    }

    run_query(query){
        try {
            //console.log(query);
            var result = this.db.get(query);
            console.log(result);
            return this.db.get(query, function(error, rows){
                console.log(rows);
                return rows;
            });
        } catch (error) {
            console.log("Bad arguments m8: " + error.message);
        }
    }



    select_questions_by_subject(data){
        return this.run_query("SELECT q.question FROM questions q INNER JOIN subjects s ON s.id = q.id_subject WHERE s.subject = '" + data["subject"] + "'");
    }

    select_answers_by_question_id(data){
        return this.run_query("SELECT answer FROM answers WHERE id_question = " + data["question_id"]);
    }

    select_subjects(){
        return this.run_query("SELECT subject FROM subjects")
    }

    insert_subjects(data){
        return this.run_query("INSERT INTO subjects(subject) VALUES('" + data["subject"] + "') RETURNING id");
    }

    insert_questions(data){
        this.run_query("INSERT INTO questions(question, id_subject) VALUES('" + data["question"] + "', " + data["id_subject"] + ")");
    }

    insert_answers(data){
        this.run_query("INSERT INTO answers(answer, id_question) VALUES('" + data["answer"] + "', " + data["id_question"] + ")");
    }
}


// tests ;-))
//db = new Database();
//console.log(db.select_subjects());
// console.log(db.select_questions_by_subject({"subject": "Analiza"}));
// console.log(db.select_answers_by_question_id({"question_id": "1"}))
// console.log(db.insert_subjects({"subject": "Analiza"}));
// console.log(db.insert_questions({"question": "Ilu członków ma izba?", "id_subject": "1"}));
// console.log(db.insert_answers({"answer": "12", "id_question": "1"}));