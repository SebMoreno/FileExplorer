import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Doc, State, User } from '../interfaces/api-interfaces';
import { MessageService } from 'primeng/api';

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

  constructor(private http: HttpClient, private ms: MessageService) {
    this.updateState();
    this.http.get<string[]>(`${this.baseUrl}/permissions`, {headers: this.httpHeaders}).subscribe({
      next: users => this.usersList = users.map(u => ({user: u})),
      error: () => this.handleError('Hubo un error obteniendo los usuarios disponibles')
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
      error: () => this.handleError('Hubo un error accediendo al servidor')
    });
  }

  changeDirectory(directory: string): void {
    this.http.post<string>(`${this.baseUrl}/doc-handler`, {directory}, {headers: this.httpHeaders}).subscribe({
      next: this.updateState.bind(this),
      error: () => this.handleError('Hubo un error entrando al directorio, quizá no tienes los permisos necesarios, intenta ejecutar el servidor como root')
    });
  }

  doActionWithDocuments(documents: string[], destiny: string): void {
    const action = this.action;
    this.http.patch<string>(`${this.baseUrl}/doc-handler`, {
      documents,
      destiny,
      action
    }, {headers: this.httpHeaders}).subscribe({
      next: (err) => {
        if (err) {
          this.handleError(err);
        }
        this.clearSelection();
        this.updateState();
      },
      error: () => this.handleError('Hubo un error pegando los documentos, quizá no tienes los permisos necesarios, intenta ejecutar el servidor como root')
    });
  }

  setPermissionsAndOwner(name: string, user: string, permissions: Permissions): void {
    this.http.post<{ mod: string, own: string }>(`${this.baseUrl}/permissions`,
      {name, user, permissions},
      {headers: this.httpHeaders}).subscribe({
      next: (err) => {
        if (err.mod) {
          this.handleError(err.mod);
        } else {
          this.showSuccessMessage('Permisos', 'Los permisos del documento fueron cambiados con éxito');
        }
        if (err.own) {
          this.handleError(err.own);
        } else {
          this.showSuccessMessage('Propietario', 'El propietario fue cambiado con éxito');
        }
        this.updateState();
      },
      error: () => this.handleError('Hubo un error accediendo al servidor')
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
      error: () => this.handleError('Hubo un error accediendo al servidor')
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
      error: () => this.handleError('Hubo un error accediendo al servidor')
    });
  }

  createDocument(name: string, type: 'dir' | 'file'): void {
    this.http.put<string>(`${this.baseUrl}/doc-handler`, {name, type}, {headers: this.httpHeaders}).subscribe({
      next: (err) => {
        if (err) {
          this.handleError(err);
        }
        this.clearSelection();
        this.updateState();
      },
      error: () => this.handleError('Hubo un error accediendo al servidor')
    });
  }

  clearSelection(): void {
    this.selection.fill(false);
  }

  handleError(err: string): void {
    this.ms.add({severity: 'error', summary: 'Un error ha ocurrido', detail: err, life: 10000});
  }

  showSuccessMessage(title: string, msg: string): void {
    this.ms.add({severity: 'success', summary: title, detail: msg});
  }
}
