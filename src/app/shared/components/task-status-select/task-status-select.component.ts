import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskStatus } from '../../../core/models/Task';

@Component({
  selector: 'app-task-status-select',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-status-select.component.html',
  styleUrl: './task-status-select.component.scss'
})
export class TaskStatusSelectComponent {
  @Input() formControl!: FormControl<TaskStatus>;
  @Output() statusChange = new EventEmitter<TaskStatus>();

  statuses = Object.values(TaskStatus);

  onSelectChange() {
    this.statusChange.emit(this.formControl.value);
  }
}
