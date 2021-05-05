import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DocPermissionsDialogComponent } from './doc-permissions-dialog/doc-permissions-dialog.component';
import { ApiControllerService } from './services/api-controller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DialogService]
})
export class AppComponent {
  title = 'FileExplorer';

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
}
