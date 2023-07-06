import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePostPopupComponent } from './update-post-popup.component';

describe('UpdatePostPopupComponent', () => {
  let component: UpdatePostPopupComponent;
  let fixture: ComponentFixture<UpdatePostPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePostPopupComponent]
    });
    fixture = TestBed.createComponent(UpdatePostPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
