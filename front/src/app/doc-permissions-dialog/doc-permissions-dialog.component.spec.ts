import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocPermissionsDialogComponent } from './doc-permissions-dialog.component';

describe('ObjPermissionsDialogComponent', () => {
  let component: DocPermissionsDialogComponent;
  let fixture: ComponentFixture<DocPermissionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocPermissionsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocPermissionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
