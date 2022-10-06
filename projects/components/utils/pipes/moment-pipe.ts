import {Pipe} from "@angular/core";
import { DateFnsPipe } from "./date-fns.pipe";

/**
 * @deprecated 11.8.2 - Kept only for backward compatibility
 */
@Pipe({ name: "sqMoment", pure: false })
export class MomentPipe extends DateFnsPipe{}
