import {Component, ViewChild, ElementRef} from "@angular/core";
import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";

import {BsDropdownDirective} from "./dropdown.directive";

@Component({
    standalone: false,
    template: `
        <div class="dropdown" #outer>
            <button #outerToggle type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Outer
            </button>
            <ul class="dropdown-menu">
                <li>
                    <div class="dropdown" #inner>
                        <button #innerToggle type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Inner
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" #innerItem>Apply</a></li>
                        </ul>
                    </div>
                </li>
                <li><a class="dropdown-item" #outerItem>Outer item</a></li>
            </ul>
        </div>
        <button #outsideButton type="button">Outside</button>
    `
})
class NestedHost {
    @ViewChild("outer") outer!: ElementRef<HTMLElement>;
    @ViewChild("inner") inner!: ElementRef<HTMLElement>;
    @ViewChild("outerToggle") outerToggle!: ElementRef<HTMLElement>;
    @ViewChild("innerToggle") innerToggle!: ElementRef<HTMLElement>;
    @ViewChild("innerItem") innerItem!: ElementRef<HTMLElement>;
    @ViewChild("outerItem") outerItem!: ElementRef<HTMLElement>;
    @ViewChild("outsideButton") outsideButton!: ElementRef<HTMLElement>;
}

describe("BsDropdownDirective", () => {
    let fixture: ComponentFixture<NestedHost>;
    let host: NestedHost;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [NestedHost, BsDropdownDirective]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NestedHost);
        host = fixture.componentInstance;
        // Attach to body so document-level click handlers in BsDropdownService can fire
        document.body.appendChild(fixture.nativeElement);
        fixture.detectChanges();
    });

    afterEach(() => {
        document.body.removeChild(fixture.nativeElement);
        fixture.destroy();
    });

    it("opens the outer dropdown when its toggle is clicked", () => {
        host.outerToggle.nativeElement.click();
        fixture.detectChanges();
        expect(host.outer.nativeElement.classList).toContain("show");
    });

    it("keeps the ancestor dropdown open when a nested toggle is clicked (ES-31345)", () => {
        host.outerToggle.nativeElement.click();
        fixture.detectChanges();
        expect(host.outer.nativeElement.classList).toContain("show");

        host.innerToggle.nativeElement.click();
        fixture.detectChanges();

        expect(host.outer.nativeElement.classList).toContain("show");
        expect(host.inner.nativeElement.classList).toContain("show");
    });

    it("closes the outer dropdown on an outside click", () => {
        host.outerToggle.nativeElement.click();
        fixture.detectChanges();
        expect(host.outer.nativeElement.classList).toContain("show");

        host.outsideButton.nativeElement.click();
        fixture.detectChanges();

        expect(host.outer.nativeElement.classList).not.toContain("show");
    });

    it("closes the outer dropdown when a non-nested dropdown-item is clicked", () => {
        host.outerToggle.nativeElement.click();
        fixture.detectChanges();
        expect(host.outer.nativeElement.classList).toContain("show");

        host.outerItem.nativeElement.click();
        fixture.detectChanges();

        expect(host.outer.nativeElement.classList).not.toContain("show");
    });
});
