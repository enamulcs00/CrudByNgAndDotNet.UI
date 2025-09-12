/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LearningScssResponsiveDesignComponent } from './learning-scss-responsive-design.component';

describe('LearningScssResponsiveDesignComponent', () => {
  let component: LearningScssResponsiveDesignComponent;
  let fixture: ComponentFixture<LearningScssResponsiveDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningScssResponsiveDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningScssResponsiveDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
