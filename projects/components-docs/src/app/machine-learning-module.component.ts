import { GlobalService } from "./global.service";

export class DocBaseModule {

  title: string;

  components = [];

  text = ``;

  constructor(public globalService: GlobalService) { }

}
