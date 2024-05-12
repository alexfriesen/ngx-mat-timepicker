import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

import { DemoComponent } from './demo.component';
import { injectIcons } from '../../utils/inject-icons';

describe('DemoComponent', () => {
  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideNoopAnimations(),
        provideHttpClient(),
        provideNativeDateAdapter(),
      ],
      imports: [DemoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.runInInjectionContext(() => {
      injectIcons();
    });

    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
