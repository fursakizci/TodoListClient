import { Injectable, inject } from '@angular/core';
import { Task, TaskStatus } from '../models/Task';
import { Observable } from 'rxjs';
import { apiEndpoint } from '../constants/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  http = inject(HttpClient);

  private createNoCacheHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
  }

  addTask(data: Task): Observable<Task> {
    return this.http.post<Task>(
      `${apiEndpoint.TodoEndpoint.addTodo}`, 
      data,
      { headers: this.createNoCacheHeaders() }
    );
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(
      `${apiEndpoint.TodoEndpoint.getAllTodo}`,
      { headers: this.createNoCacheHeaders() }
    );
  }

  getAllTasksByStatus(status: TaskStatus): Observable<Task[]> {
    return this.http.get<Task[]>(
      `${apiEndpoint.TodoEndpoint.getTodosByStatus}/${status}`,
      { headers: this.createNoCacheHeaders() }
    );
  }

  deleteTask(id: string): Observable<Task> {
    return this.http.delete<Task>(
      `${apiEndpoint.TodoEndpoint.deleteTodo}/${id}`,
      { headers: this.createNoCacheHeaders() }
    );
  }

  updateTask(data: Task): Observable<Task> {
    return this.http.put<Task>(
      `${apiEndpoint.TodoEndpoint.updateTodo}`, 
      data,
      { headers: this.createNoCacheHeaders() }
    );
  }
}
