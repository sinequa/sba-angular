import { inject } from "@angular/core";
import { GlobalService } from "src/app/shared/global.service";

export class BaseComponent {
  globalService = inject(GlobalService);
}
