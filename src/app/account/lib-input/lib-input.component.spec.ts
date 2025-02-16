/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LibInputComponent } from './lib-input.component';

describe('LibInputComponent', () => {
  let component: LibInputComponent;
  let fixture: ComponentFixture<LibInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
