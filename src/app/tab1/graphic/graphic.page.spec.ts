import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraphicPage } from './graphic.page';

describe('GraphicPage', () => {
  let component: GraphicPage;
  let fixture: ComponentFixture<GraphicPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GraphicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
