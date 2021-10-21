import { Component, ContentChild, Inject, Input, OnDestroy, OnInit, TemplateRef } from "@angular/core";
import { Action } from "@sinequa/components/action";
import { BasketsService } from "@sinequa/components/baskets";
import { AbstractFacet } from "@sinequa/components/facet";
import { SelectionService } from "@sinequa/components/selection";
import { UIService } from "@sinequa/components/utils";
import { NotificationsService } from "@sinequa/core/notification";
import { DownloadWebService, DocBuilderWebService, StartConfig, START_CONFIG } from "@sinequa/core/web-services";

@Component({
    selector: 'sq-slide-builder',
    templateUrl: './slide-builder.component.html',
    styleUrls: ['./slide-builder.component.scss']
})
export class SlideBuilderComponent extends AbstractFacet implements OnInit, OnDestroy {
    @ContentChild(TemplateRef, {static: false}) recordTpl: TemplateRef<any>;
    @Input() enableSaveAsBasket = true;
    
    public exportInProgress = false;
    
    public clearSlidesAction: Action;
    public exportSlidesAction: Action;
    public saveAsBasketAction: Action;

    constructor(
        @Inject(START_CONFIG) public startConfig: StartConfig,
        public selectionService: SelectionService,
        public notificationsService: NotificationsService,
        public downloadWebService: DownloadWebService,
        public docBuilderWebService: DocBuilderWebService,
        public basketService: BasketsService,
        public ui: UIService
    ){
        super();
    }

    ngOnInit() {
        // Clear selection to avoid non-slide selected documents
        this.selectionService.clearSelectedRecords("presentation-builder");

        this.clearSlidesAction = new Action({
            icon: "fas fa-times",
            title: "msg#slideCollection.clear",
            action: () => this.selectionService.clearSelectedRecords("presentation-builder")
        });
      
        this.exportSlidesAction = new Action({
            icon: "fas fa-file-download",
            title: "msg#slideCollection.exportSlides",
            action: () => this.exportSlideCollection()
        });

        this.saveAsBasketAction = new Action({
            icon: "fas fa-inbox",
            title: "msg#slideCollection.collection",
            action: () => this.basketService.addToBasketModal(
                this.selectionService.getSelectedIds()
            )
        });
    }

    ngOnDestroy() {
        this.selectionService.clearSelectedRecords();
    }

    public get actions(): Action[] {
        const actions: Action[] = [];
        if(this.selectionService.haveSelectedRecords) {
            actions.push(this.exportSlidesAction);
            if(this.enableSaveAsBasket){
                actions.push(this.saveAsBasketAction);
            }
            actions.push(this.clearSlidesAction);
        }
        return actions;
    }

    // Export slide deck to Powerpoint
    exportSlideCollection() {
        
        let ids = this.selectionService.getSelectedIds();
        
        this.exportInProgress = true;
        
        const auditEvent = {
            type: "SlideCollectionExport",
            detail: {
                detail: ids.join(';')
            }
        }

        this.docBuilderWebService.downloadSlides(ids, auditEvent).subscribe(() => {
            this.notificationsService.info("msg#slideCollection.exportSucceeded");
            this.selectionService.clearSelectedRecords("presentation-builder");
            this.exportInProgress = false;
        });
    }
}