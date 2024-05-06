import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskStatusSelectComponent } from '../../shared/components/task-status-select/task-status-select.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Task, TaskFormModel } from '../../core/models/Task';
import { TodoService } from '../../core/services/todo-service.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-update-task-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TaskStatusSelectComponent,
    CommonModule,
    HttpClientModule],
  templateUrl: './update-task-modal.component.html',
  styleUrl: './update-task-modal.component.scss'
})

export class UpdateTaskModalComponent {
  @Output() taskUpdated = new EventEmitter<Task>();
  @Input() task!: Task;
  editForm!: FormGroup;
  submitted: boolean = false;

  constructor(public modal: NgbActiveModal, private toastr: ToastrService, private todoService: TodoService) { }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      title: new FormControl(this.task.title, Validators.required),
      description: new FormControl(this.task.description),
      status: new FormControl(this.task.status, Validators.required)
    } as TaskFormModel);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.editForm.controls;
  }

  saveChanges() {
    this.submitted = true;
    if (this.editForm.valid) {
      const updatedTask: Task = {
        id: this.task.id,
        title: this.editForm.value.title,
        description: this.editForm.value.description,
        status: this.editForm.value.status,
        createdDate: this.task.createdDate
      };
      this.todoService.updateTask(updatedTask)
        .subscribe({
          next: (response) => {
            this.taskUpdated.emit(response);
            this.toastr.success('Your task has been updated successfully!', 'Success');
            this.modal.close(updatedTask);
          }
        })
    }
  }
}
