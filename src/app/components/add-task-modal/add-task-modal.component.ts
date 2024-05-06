import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskStatusSelectComponent } from '../../shared/components/task-status-select/task-status-select.component';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Task, TaskFormModel, TaskStatus } from '../../core/models/Task';
import { TodoService } from '../../core/services/todo-service.service';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [ReactiveFormsModule, TaskStatusSelectComponent, CommonModule],
  templateUrl: './add-task-modal.component.html',
  styleUrl: './add-task-modal.component.scss'
})
export class AddTaskModalComponent {
  @Output() taskAdded = new EventEmitter<Task>();
  addForm!: FormGroup;
  submitted = false;
  constructor(public modal: NgbActiveModal, private toastr: ToastrService, private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', { nonNullable: true }),
      status: new FormControl(TaskStatus.Open, Validators.required)
    } as TaskFormModel);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.addForm.controls;
  }

  async saveTask() {
    this.submitted = true;
    if (this.addForm.valid) {
      const newTask: Task = {
        title: this.addForm.value.taskTitle,
        description: this.addForm.value.description,
        status: this.addForm.value.status
      };
      this.todoService.addTask(this.addForm.value)
        .subscribe({
          next: (response) => {
            this.toastr.success('Your task has been added successfully!', 'Success');
            this.taskAdded.emit(response);
            this.modal.close(newTask);
          }
        })
    }
  }
}
