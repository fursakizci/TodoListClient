import { Component } from '@angular/core';
import { TaskCardComponent } from "../../shared/components/task-card/task-card.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTaskModalComponent } from '../../components/add-task-modal/add-task-modal.component';
import { TabName, Task, TaskStatus } from '../../core/models/Task';
import { TodoService } from '../../core/services/todo-service.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [TaskCardComponent, HttpClientModule]
})
export class HomeComponent {
  TabName = TabName;
  TaskStatus = TaskStatus;
  selectedTab: TabName = TabName.All;
  tasks: Task[] = [];
  filteredTasks: Task[] = this.tasks;

  constructor(private modalService: NgbModal, private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.getAllTask();
  }

  public getAllTask() {
    this.todoService.getAllTasks().subscribe({
      next: (response) => {
        this.tasks = response;
        
        this.changeTab(this.selectedTab);
      }
    });
  }

  public getAllTasksByStatus(status: TaskStatus) {
    this.todoService.getAllTasksByStatus(status).subscribe({
      next: (response) => {
        this.tasks = response;
        this.changeTab(this.selectedTab)
      }
    });
  }

  public open(): void {
    var modalRef = this.modalService.open(AddTaskModalComponent);
    modalRef.componentInstance.taskAdded.subscribe(() => {
      this.getAllTask()
      modalRef.close();
    });
  }

  changeTab(tabName: TabName) {
    this.selectedTab = tabName;
    switch (tabName) {
      case TabName.All:
        this.filteredTasks = this.tasks;
        break;
      case TabName.Open:
        this.filteredTasks = this.tasks.filter(task => task.status === TaskStatus.Open);
        break;
      case TabName.Progress:
        this.filteredTasks = this.tasks.filter(task => task.status === TaskStatus.InProgress);
        break;
      case TabName.Done:
        this.filteredTasks = this.tasks.filter(task => task.status === TaskStatus.Done);
        break;
      default:
        this.filteredTasks = this.tasks;
    }
  }
}
