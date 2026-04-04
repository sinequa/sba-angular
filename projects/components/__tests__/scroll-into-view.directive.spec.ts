import { Component, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ScrollIntoView, ScrollIntoViewOptions } from '../utils/directives/scroll-into-view';

@Component({
  template: `<div [sqScrollIntoView]="options"></div>`
})
class TestHostComponent {
  options: ScrollIntoViewOptions = { active: false, first: false };
}

describe('ScrollIntoView directive', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directive: ScrollIntoView;
  let nativeEl: HTMLElement;
  let scrollIntoViewSpy: jasmine.Spy;

  function change(prev: ScrollIntoViewOptions | undefined, curr: ScrollIntoViewOptions): Record<string, SimpleChange> {
    return { sqScrollIntoView: new SimpleChange(prev, curr, prev === undefined) };
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, ScrollIntoView]
    });
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const directiveEl = fixture.debugElement.query(By.directive(ScrollIntoView));
    directive = directiveEl.injector.get(ScrollIntoView);
    nativeEl = directiveEl.nativeElement;

    scrollIntoViewSpy = spyOn(nativeEl, 'scrollIntoView');
  });

  it('should not scroll when active is false', () => {
    directive.options = { active: false, first: false };
    directive.ngOnChanges(change(undefined, { active: false, first: false }));
    expect(scrollIntoViewSpy).not.toHaveBeenCalled();
  });

  it('should scroll when active transitions false → true', () => {
    directive.options = { active: true, first: false };
    directive.ngOnChanges(change({ active: false, first: false }, { active: true, first: false }));
    expect(scrollIntoViewSpy).toHaveBeenCalledOnceWith({ block: 'nearest', inline: 'nearest' });
  });

  it('should scroll with block:nearest regardless of first flag', () => {
    directive.options = { active: true, first: true };
    directive.ngOnChanges(change({ active: false, first: false }, { active: true, first: true }));
    expect(scrollIntoViewSpy).toHaveBeenCalledOnceWith({ block: 'nearest', inline: 'nearest' });
  });

  it('should NOT scroll again when active stays true across multiple CD cycles (bug fix)', () => {
    // First transition: false → true → scrolls once
    directive.options = { active: true, first: false };
    directive.ngOnChanges(change({ active: false, first: false }, { active: true, first: false }));
    expect(scrollIntoViewSpy).toHaveBeenCalledTimes(1);

    scrollIntoViewSpy.calls.reset();

    // Subsequent CD cycles: new object reference, same active:true value → must NOT scroll
    directive.ngOnChanges(change({ active: true, first: false }, { active: true, first: false }));
    directive.ngOnChanges(change({ active: true, first: false }, { active: true, first: false }));

    expect(scrollIntoViewSpy).not.toHaveBeenCalled();
  });

  it('should scroll again when active transitions true → false → true', () => {
    directive.options = { active: true, first: false };
    directive.ngOnChanges(change({ active: false, first: false }, { active: true, first: false }));
    scrollIntoViewSpy.calls.reset();

    directive.options = { active: false, first: false };
    directive.ngOnChanges(change({ active: true, first: false }, { active: false, first: false }));
    expect(scrollIntoViewSpy).not.toHaveBeenCalled();

    directive.options = { active: true, first: false };
    directive.ngOnChanges(change({ active: false, first: false }, { active: true, first: false }));
    expect(scrollIntoViewSpy).toHaveBeenCalledTimes(1);
  });

  it('should scroll when active is true on first change (no previous value)', () => {
    directive.options = { active: true, first: false };
    directive.ngOnChanges(change(undefined, { active: true, first: false }));
    expect(scrollIntoViewSpy).toHaveBeenCalledOnceWith({ block: 'nearest', inline: 'nearest' });
  });
});
