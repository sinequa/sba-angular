import { inject } from "@angular/core";
import { GlobalService } from "src/app/global.service";

export class BaseComponent {
  globalService = inject(GlobalService);
}
