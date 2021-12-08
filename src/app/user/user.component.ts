import { Component, OnInit,Input } from '@angular/core';
import { TaskServiceService } from '../task-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() task2:any = [];
  constructor(private _httpService: TaskServiceService) { }

  ngOnInit(): void {
  }

}
