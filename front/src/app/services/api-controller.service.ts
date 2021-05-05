import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Document, State } from '../interfaces/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiControllerService {

  baseUrl = environment.ServerUrl;
  httpHeaders = new HttpHeaders({'Content-type': 'application/json'});
  path: string | undefined;
  content: Document[] = [];

  constructor(private http: HttpClient) {
    this.getState();
  }

  getState(): void {
    this.http.get<State>(`${this.baseUrl}/info`, {headers: this.httpHeaders}).subscribe({
      next: state => {
        this.path = state.path;
        this.content = state.content;
      },
      error: err => console.log(err)
    });
  }

  changeDirectory(directory: string): void {
    this.http.post<string>(`${this.baseUrl}/info`, {directory}, {headers: this.httpHeaders}).subscribe({
      next: this.getState.bind(this)
    });
  }
}
