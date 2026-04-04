import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "preview-navigator",
  standalone: true,
  template: `
    <button class="btn btn-light"
      (click)="firstPage.emit()"
      [disabled]="isFirst()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class=""
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
        />
      </svg>
    </button>
    <button class="btn btn-light"
      (click)="prevPage.emit()"
      [disabled]="isFirst()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class=""
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
    </button>

    <div class="d-inline-flex gap-1 align-items-center text-body">
      <input
        #page
        type="text"
        class="input-page border rounded w-100 text-center"
        [min]="1"
        [max]="total || 1"
        [value]="current"
        (keydown.enter)="goto(page.value)"
        (focus)="page.select()"
        pattern="\\d+"
      />

      <span>/</span>
      <span>{{ total }}</span>
    </div>
    <button class="btn btn-light"
      (click)="nextPage.emit()"
      [disabled]="isLast()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class=""
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
      </svg>
    </button>
    <button class="btn btn-light"
      aria-label="Page suivante"
      (click)="lastPage.emit()"
      [disabled]="isLast()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
        />
      </svg>
    </button>
  `,
  styles: [
    `
    :host {
      width: 300px;
    }
    button > svg {
      width: 1rem;
      height: 1rem;
    }
    .input-page {
      outline: none;
      &:invalid {
        background-color: lightpink;
      }
    }
    `
  ],
  host: {
    "class": "d-inline-flex gap-1 justify-content-around bg-light border rounded px-2 py-1",
    "[class.invisible]": "!total || total <= 1"
  },
})
export class PreviewNavigator {
  @Output() firstPage = new EventEmitter<void>();
  @Output() prevPage = new EventEmitter<void>();
  @Output() nextPage = new EventEmitter<void>();
  @Output() lastPage = new EventEmitter<void>();
  @Output() gotoPage = new EventEmitter<number>();

  @Input() total = 1;
  @Input() current = 1;

  isFirst = () => this.current <= 1;
  isLast = () => this.current >= this.total;

  goto(raw: string | number) {
    const t = this.total || 1;
    let n = Math.floor(Number(raw) || 1);
    n = Math.max(1, Math.min(n, t));
    this.gotoPage.emit(n);
  }
}
