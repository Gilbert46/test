import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimePage } from './time.page';

describe('TimePage', () => {
  let component: TimePage;
  let fixture: ComponentFixture<TimePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
