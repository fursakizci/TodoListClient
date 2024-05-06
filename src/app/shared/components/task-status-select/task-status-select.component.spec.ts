import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStatusSelectComponent } from './task-status-select.component';

describe('TaskStatusSelectComponent', () => {
  let component: TaskStatusSelectComponent;
  let fixture: ComponentFixture<TaskStatusSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskStatusSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskStatusSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
