import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjPermissionsDialogComponent } from './obj-permissions-dialog.component';

describe('ObjPermissionsDialogComponent', () => {
  let component: ObjPermissionsDialogComponent;
  let fixture: ComponentFixture<ObjPermissionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjPermissionsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjPermissionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
