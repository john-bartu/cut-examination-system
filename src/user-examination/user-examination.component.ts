import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../app/student.schema';
import { GradesService } from '../grades.service';
import { IQuestion } from '../parser/models';
import { AuxiliaryFunctions } from '../parser/parser';
import { QuestionManagerService } from '../question-manager/question-manager.service';
import { UserListService } from '../user-list/user-list.service';

@Component({
  selector: 'app-user-examination',
  templateUrl: './user-examination.component.html',
  styleUrls: ['./user-examination.component.scss'],
})
export class UserExaminationComponent implements OnInit {
  answer: string = '';
  student: Student;
  displayedColumns: string[] = ['question', 'answer', 'displayAnswer'];
  dataSource: MatTableDataSource<IQuestion>;
  diplomaGrade;
  thesisGrade;

  constructor(
    private route: ActivatedRoute,
    private questionManagerService: QuestionManagerService,
    private userListService: UserListService,
    private gradesService: GradesService
  ) {
    this.dataSource = new MatTableDataSource(this.drawQuestions());
  }

  ngOnInit(): void {}

  displayAnswer(id: number) {
    this.questionManagerService.getQuestion(id).subscribe((result) => {
      this.answer = result.answer;
    });
  }

  drawQuestions(): IQuestion[] {
    let albumNum: number = parseInt(
      this.route.snapshot.paramMap.get('id')!,
      10
    );
    let selectedQuestions: IQuestion[] = [];
    let allQuestions: IQuestion[];
    let generalQuestions: IQuestion[];
    let randomNumber;
    let tempQuestion;
    this.userListService.getStudent(albumNum).subscribe((result) => {
      this.student = result;
    });

    this.questionManagerService.getQuestions().subscribe((results) => {
      allQuestions = results;
    });

    generalQuestions = allQuestions.filter((element) => {
      return element.specialization == '-';
    });

    if (this.student.specialty == null) {
      for (let i = 0; i < 3; i++) {
        randomNumber = Math.floor(Math.random() * generalQuestions.length);
        tempQuestion = generalQuestions[randomNumber];
        if (selectedQuestions.includes(tempQuestion)) {
          i--;
        } else {
          selectedQuestions.push(tempQuestion);
        }
      }
    } else {
      let specQuestions = allQuestions.filter((element) => {
        return element.specialization == this.student.specialty;
      });

      for (let i = 0; i < 2; i++) {
        randomNumber = Math.floor(Math.random() * generalQuestions.length);
        tempQuestion = generalQuestions[randomNumber];

        if (selectedQuestions.includes(tempQuestion)) {
          i--;
        } else {
          selectedQuestions.push(tempQuestion);
        }
      }

      randomNumber = Math.floor(Math.random() * specQuestions.length);
      selectedQuestions.push(specQuestions[randomNumber]);
    }
    return selectedQuestions;
  }

  updateDiplomaGrade(grade: Event): void {
    const xd = grade.target as HTMLTextAreaElement;
    this.gradesService.setDiplomaGrade(AuxiliaryFunctions.formatGradeToCorrectFormat(parseFloat(xd.value)));
  }

  updateThesisGrade(grade: Event): void {
    const xd = grade.target as HTMLTextAreaElement;
    this.gradesService.setThesisGrade(AuxiliaryFunctions.formatGradeToCorrectFormat(parseFloat(xd.value)));
  }
}
