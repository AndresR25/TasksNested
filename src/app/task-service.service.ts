import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  task: any[] = [];
  constructor(private _http: HttpClient) {
    this.fetchTasks();
   }
   fetchTasks(): void{
    this._http.get( "http://localhost:8080/tasks/" )
      .subscribe( (data:any) => {
        this.task = data.task;
      });
  }
  fetchTasksByName(title : String){
    return this._http.get( "http://localhost:8080/tasks/"+ title )
  }
  addTask(addTask:any){
    return this._http.post('http://localhost:8080/tasks',addTask);
  }

  editTask(title:string, editedTask:any){
    return this._http.put(`http://localhost:8080/taskss/${title}`,editedTask)
  }

  removeTask(title:string){
    return this._http.delete(`http://localhost:8080/remove/${title}`)
  }
}
