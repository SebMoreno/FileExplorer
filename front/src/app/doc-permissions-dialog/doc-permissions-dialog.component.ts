import { Component, OnInit } from '@angular/core';
import { ApiControllerService } from '../services/api-controller.service';
import { Doc, User } from '../interfaces/api-interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-obj-permissions-dialog',
  templateUrl: './doc-permissions-dialog.component.html',
  styleUrls: ['./doc-permissions-dialog.component.scss']
})
export class DocPermissionsDialogComponent implements OnInit {

  owner: User;
  doc: Doc;
  permissionsForm: FormGroup;

  constructor(public apics: ApiControllerService, private fb: FormBuilder, public ref: DynamicDialogRef) {
    this.doc = apics.firstSelectedDocument;
    this.owner = {user: this.doc.owner};
    this.permissionsForm = fb.group({
      owner: fb.group(this.doc.permissions.owner),
      group: fb.group(this.doc.permissions.group),
      other: fb.group(this.doc.permissions.other)
    });
  }

  ngOnInit(): void {
  }

  saveChanges(): void {
    this.apics.setPermissionsAndOwner(this.doc.name, this.owner.user, this.permissionsForm.value);
    this.close();
  }

  close(): void {
    this.ref.close();
  }
}
