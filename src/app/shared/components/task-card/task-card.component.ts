import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateTaskModalComponent } from '../../../components/update-task-modal/update-task-modal.component';
import { CommonModule, DatePipe } from '@angular/common';
import { Task, TaskStatus } from '../../../core/models/Task';
import { TodoService } from '../../../core/services/todo-service.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'task-card',
  standalone: true,
  imports: [NgbModule, DatePipe, CommonModule, HttpClientModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Output() taskUpdated = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<Task>();
  @Input()
  task!: Task;
  TaskStatus = TaskStatus;

  constructor(private modalService: NgbModal, private todoService: TodoService) {
  }

  public openEditModal(task: Task) {
    let modalRef = this.modalService.open(UpdateTaskModalComponent);
    modalRef.componentInstance.task = task;
    modalRef.componentInstance.taskUpdated.subscribe(() => {
      this.taskUpdated.emit();
      modalRef.close();
    });
  }

  deleteTask(id?: string) {
    if (id) {
      this.todoService.deleteTask(id).subscribe(() => {
        this.taskDeleted.emit();
      });
    }
  }
}
