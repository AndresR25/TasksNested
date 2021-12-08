import { Component, OnInit } from '@angular/core';
import { TaskServiceService } from '../task-service.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  title: string = "";
  title2: string = "";
  description: string = "";

  completed: string = "";
  newTitle: string = "";
  newDescription: string = "";

  allTasks: any[] = [];
  taskByTitle: any[] = [];
  result: any;
  task: any[] = [];
  task2: any = [];

  currentTask:any = {
    title : "",
    description: "",
    completed: false
  };
  
  addTask2:any = {
    title : "",
    description: "",
    completed: false};
  constructor(private _httpService:TaskServiceService) { }


  ngOnInit(): void {
    this.getTasks();
    this.title = "";
    this.title2 = "";
    this.description = "";
    this.completed = "";
  }
  getTasks(): void {
    this.allTasks = this._httpService.task;
  }
  taskInfo(event:any):void{
    event.preventDefault();
    this.title = event.target.title.value;
    this._httpService.fetchTasksByName(this.title)
    .subscribe( (data:any) => {
      this.task2 = data.task;
      console.log("Find", this.task2 );
    });
  }
  postNewTask(event: any):void{
    event.preventDefault();
    let isValid: boolean = true;
    this.title = event.target.addTitle.value;
    this.description = event.target.addDesc.value;
    
    if(this.title == ""){
      console.log("Title can't be empty");
      isValid = false;
    }
    if(this.description == ""){
      console.log("Description can't be empty");
      isValid = false;
    }

    let addTask = {
      title : this.title,
      description :  this.description
    }

    if(isValid){
      this._httpService.addTask(addTask)
      .subscribe((data:any)=>{
      });
      location.reload();
    }
    
  }

  editTask(event:any):void{
    let isValid: boolean = true;
    this.title2 = event.target.title2.value;
    this.title = event.target.editTitle.value;
    this.description = event.target.editDesc.value;
    this.completed = event.target.completed.value;

    if(this.title === this.title2 ){
      console.log("The title can't be the same value");
      isValid = false;
    }
    if(this.title == ""){
      console.log("Title field is empty");
      isValid = false;
    }
    if(this.description == ""){
      console.log("Description field is empty");
      isValid = false;
    }

    let taskEdited = {
      title : this.title,
      description :  this.description,
      completed: this.completed
    }

    if(isValid){
      this._httpService.editTask( this.title2, taskEdited)
      .subscribe((data:any)=>{
        console.log(data);
      });
      location.reload();
    }
    
  }

  deleteTask(event:any):void{
    event.preventDefault();
    this.title = event.target.title.value;
    this._httpService.removeTask(this.title)
    .subscribe((data:any) => {
      this.task = data;
    });
    location.reload();
  }
}
