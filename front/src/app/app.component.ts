import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DocPermissionsDialogComponent } from './doc-permissions-dialog/doc-permissions-dialog.component';
import { ApiControllerService } from './services/api-controller.service';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DialogService]
})
export class AppComponent {

  createMenuItems: MenuItem[] = [
    {label: 'Archivo de texto', icon: PrimeIcons.FILE, command: () => this.captureInput('newFile')},
    {label: 'Directorio', icon: PrimeIcons.FOLDER_OPEN, command: () => this.captureInput('newDir')}
  ];
  captureInputDialog = false;
  inputString = '';
  action: 'newDir' | 'newFile' | 'rename' = 'rename';

  constructor(private dialogService: DialogService, public apics: ApiControllerService) {
  }

  openPermissionsDialog(): void {
    this.dialogService.open(DocPermissionsDialogComponent,
      {
        header: 'pripra',
        showHeader: false,
        dismissableMask: true
      });
  }

  access(index: number): void {
    this.apics.changeDirectory(this.apics.content[index].name);
  }

  folderUp(): void {
    this.apics.changeDirectory('..');
  }

  toClipboard(action: 'move' | 'copy'): void {
    this.apics.action = action;
    this.apics.clipboard = this.apics.content
      .filter((d, i) => this.apics.selection[i])
      .map(d => this.apics.path + '/' + d.name);
    this.apics.clearSelection();
  }

  pasteHere(): void {
    this.apics.doActionWithDocuments(this.apics.clipboard, this.apics.path);
  }

  deleteDocument(): void {
    this.apics.deleteDocument(
      this.apics.content
        .filter((d, i) => this.apics.selection[i])
        .map(d => d.name)
    );
  }

  captureInput(action: 'newDir' | 'newFile' | 'rename'): void {
    this.captureInputDialog = true;
    this.action = action;
  }

  execAction(): void {
    this.inputString = this.inputString.trim().replace(/ /g, '-');
    switch (this.action) {
      case 'newDir':
        this.apics.createDocument(this.inputString, 'dir');
        break;
      case 'newFile':
        this.apics.createDocument(this.inputString + '.txt', 'file');
        break;
      case 'rename':
        this.apics.renameDocument(this.apics.firstSelectedDocument.name, this.inputString);
        break;
    }
    this.inputString = '';
    this.captureInputDialog = false;
  }
}
