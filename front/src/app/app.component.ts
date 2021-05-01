import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ObjPermissionsDialogComponent } from './obj-permissions-dialog/obj-permissions-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DialogService]
})
export class AppComponent {
  title = 'FileExplorer';

  constructor(public dialogService: DialogService) {
    
  }

  openPermissionsDialog(): void {
    this.dialogService.open(ObjPermissionsDialogComponent,
      {
        header: 'pripra',
        showHeader: false,
        dismissableMask: true
      });
  }
}