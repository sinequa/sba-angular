import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BsPreviewMinimapComponent } from './preview-minimap.component';

describe('PreviewMinimapComponent', () => {
  let component: BsPreviewMinimapComponent;
  let fixture: ComponentFixture<BsPreviewMinimapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BsPreviewMinimapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BsPreviewMinimapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
