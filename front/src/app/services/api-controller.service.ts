import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Doc, State, User } from '../interfaces/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiControllerService {

  baseUrl = environment.ServerUrl;
  httpHeaders = new HttpHeaders({'Content-type': 'application/json'});
  path = '';
  content: Doc[] = [];
  selection: boolean[] = [];
  clipboard: string[] = [];
  action: 'move' | 'copy' = 'copy';
  usersList: User[] = [];

  constructor(private http: HttpClient) {
    this.updateState();
    this.http.get<string[]>(`${this.baseUrl}/permissions`, {headers: this.httpHeaders}).subscribe({
      next: users => this.usersList = users.map(u => ({user: u})),
      error: this.handleError.bind(this)
    });
  }

  get firstSelectedDocument(): Doc {
    return this.content.filter((d, i) => this.selection[i])[0];
  }

  get selectionLength(): number {
    return this.content.filter((d, i) => this.selection[i]).length;
  }

  updateState(): void {
    this.http.get<State>(`${this.baseUrl}/doc-handler`, {headers: this.httpHeaders}).subscribe({
      next: state => {
        this.path = state.path;
        this.content = state.content.sort((a, b) => a.type.localeCompare(b.type));
        this.selection = new Array(this.content.length).fill(false);
      },
      error: this.handleError.bind(this)
    });
  }

  changeDirectory(directory: string): void {
    this.http.post<string>(`${this.baseUrl}/doc-handler`, {directory}, {headers: this.httpHeaders}).subscribe({
      next: this.updateState.bind(this)
    });
  }

  doActionWithDocuments(documents: string[], destiny: string): void {
    const action = this.action;
    this.http.patch<string>(`${this.baseUrl}/doc-handler`, {documents, destiny, action}, {headers: this.httpHeaders}).subscribe({
      next: (err) => {
        if (err) {
          this.handleError(err);
        }
        this.clearSelection();
        this.updateState();
      },
      error: this.handleError.bind(this)
    });
  }

  setPermissionsAndOwner(name: string, user: string, permissions: Permissions): void {
    this.http.post<{ mod: string, own: string }>(`${this.baseUrl}/permissions`,
      {name, user, permissions},
      {headers: this.httpHeaders}).subscribe({
      next: (err) => {
        if (err.mod) {
          this.handleError(err.mod);
        }
        if (err.own) {
          this.handleError(err.own);
        }
        this.updateState();
      },
      error: this.handleError.bind(this)
    });
  }

  deleteDocument(documents: string[]): void {
    this.http.put<string>(`${this.baseUrl}/permissions`, {documents}, {headers: this.httpHeaders}).subscribe({
      next: (err) => {
        if (err) {
          this.handleError(err);
        }
        this.clearSelection();
        this.updateState();
      },
      error: this.handleError.bind(this)
    });
  }

  renameDocument(old: string, updated: string): void {
    this.http.patch<string>(`${this.baseUrl}/permissions`, {old, updated}, {headers: this.httpHeaders}).subscribe({
      next: (err) => {
        if (err) {
          this.handleError(err);
        }
        this.clearSelection();
        this.updateState();
      },
      error: this.handleError.bind(this)
    });
  }

  createDocument(name: string, type: 'dir' | 'file'): void {
    this.http.put(`${this.baseUrl}/doc-handler`, {name, type}, {headers: this.httpHeaders}).subscribe({
      next: (err) => {
        if (err) {
          this.handleError(err);
        }
        this.clearSelection();
        this.updateState();
      },
      error: this.handleError.bind(this)
    });
  }

  clearSelection(): void {
    this.selection.fill(false);
  }

  handleError(err: any): void {
    console.error(err);
  }
}
