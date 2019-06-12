import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Student Form';
  constructor(
    private httpService: HttpClient
  ){};
  student = {
    name: "",
    lastname: "",
    semester: 1,
    program: "",
    email: "",
    adress: ""
  };
  students = [];
  programs = []
  actual = null;

  ngOnInit() {
    this.httpService.get('./assets/programs.json').subscribe(
      data => {
        this.programs = data as string[];
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

  CreateStudent(){
    let student = new Student(this.student.name, this.student.lastname, 
      this.student.semester, this.student.program, this.student.email, this.student.adress);
    this.student.name = "";
    this.student.lastname = "";
    this.student.semester = 1; 
    this.student.program = "";
    this.student.email = ""; 
    this.student.adress = "";
    this.students.push(student);
  }

  select(student){
    this.actual = student;
    this.student.name = student.name;
    this.student.lastname = student.lastname;
    this.student.semester = student.semester;
    this.student.program = student.program;
    this.student.email = student.email;
    this.student.adress = student.adress;
  }

  delete(student){
    for(let i = 0; i < this.students.length; i++){
      if(student == this.students[i]){
        this.students.splice(i, 1);
        break;
      }
    }
  }

  UpdateStudent(){
    for(let i = 0; i < this.students.length; i++){
      if(this.actual == this.students[i]){
        this.students[i].name = this.student.name;
        this.students[i].lastname = this.student.lastname;
        this.students[i].semester = this.student.semester;
        this.students[i].program = this.student.program;
        this.students[i].email = this.student.email;
        this.students[i].adress = this.student.adress;
        this.actual = null;
      }
    }
    this.student.name = "";
    this.student.lastname = "";
    this.student.semester = 1;
    this.student.program = "";
    this.student.email = "";
    this.student.adress = "";
  }

}

export class Student {
  constructor(
    public name: string,
    public lastname: string,
    public semester: number,
    public program: string,
    public email: string,
    public adress: string,
  ) { }
}
