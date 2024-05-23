import { Injectable, inject } from '@angular/core';
import { Task, TaskStatus } from '../models/Task';
import { Observable } from 'rxjs';
import { apiEndpoint } from '../constants/constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  http = inject(HttpClient)

  addTask(data: Task): Observable<Task> {
    return this.http.post<Task>
      (`${apiEndpoint.TodoEndpoint.addTodo}`, data);
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>
    (`${apiEndpoint.TodoEndpoint.getAllTodo}`);
  }

  getAllTasksByStatus(status: TaskStatus): Observable<Task[]> {
    return this.http.get<Task[]>(
      `${apiEndpoint.TodoEndpoint.getTodosByStatus}/${status}`);
  }

  deleteTask(id: string): Observable<Task> {
    return this.http.delete<Task>(`${apiEndpoint.TodoEndpoint.deleteTodo}/${id}`);
  }

  updateTask(data: Task): Observable<Task> {
    return this.http.put<Task>
      (`${apiEndpoint.TodoEndpoint.updateTodo}`, data);
  }
}
