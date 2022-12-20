import { CdkDropList } from "@angular/cdk/drag-drop";
import { Directive, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { DragAndDropManagerService } from "./drag-drop-manager.service";

@Directive({
  selector: '[dragAndDropManager]'
})
export class DragAndDropManagerDirective implements OnInit, OnDestroy {

  private manager!: Subscription;

  constructor(
    private dropList: CdkDropList,
    private managerService: DragAndDropManagerService
  ) { }

  ngOnInit(): void {
    this.managerService.register(this.dropList.id)
    this.manager = this.managerService.onListChange().subscribe(x => {
      this.dropList.connectedTo = x.reverse();
    })
  }

  ngOnDestroy(): void {
    this.manager.unsubscribe()
  }
}
