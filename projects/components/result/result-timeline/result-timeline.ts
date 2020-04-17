import {Component, Input, OnChanges, ViewChild, ElementRef,SimpleChanges} from "@angular/core";
import {Record, EntityItem} from "@sinequa/core/web-services";
import {Utils} from "@sinequa/core/base";

import {Timeline, DataSet} from "vis";
import moment from "moment";

@Component({
    selector: "sq-result-timeline",
    templateUrl: "./result-timeline.html"
})
export class ResultTimeline implements OnChanges {
    @Input() record: Record;
    @Input() dates: EntityItem[];
    @Input() events: EntityItem[];
    @Input() min_year: number = 0;
    @Input() max_year: number = 10000;
    @Input() min_dates: number = 1;
    @Input() max_dates: number = 100;
    @ViewChild('container', {static: true}) container: ElementRef;

    options : any = {'minHeight' : '150px', 'margin':{'axis': 5, 'item': 5}};
    items : DataSet<any>;
    timeline : Timeline;

    ngOnChanges(changes:SimpleChanges) {

        if(!!changes['record']){
            this.updateTimeline();
        }
    }

    updateTimeline(){

        if(!this.items){
            this.items = new DataSet();
        }

        this.items.clear();

        const dates = this.dates || [];
        const events = this.events || [];

        let data: { id: string, content: string, start: Date }[] = [];
        const all_ids: string[] = [];
        const all_dates: Date[] = [];

        events.forEach(event => {
            const data_date = event.display;
            const cooc = data_date.substring(1,data_date.length-1).split(")#(");
            const date = new Date(cooc[1]);
            //console.log("cooc1:",data_date[i+2]);
            const pos = event.locations.split(",")[0];
            //console.log(cooc);
            const year = date.getFullYear();
            //console.log(year);
            //console.log(regdate.test(date) );
            //console.log( year < 2050 && year > 1950);
            const id = this.record.id + "#" + pos;
            if(year < this.max_year && year > this.min_year && all_ids.indexOf(id)===-1){
                data.push({id: id, content: cooc[0], start: date});
                all_dates.push(date);
                all_ids.push(id);
            }
        });

        dates.forEach(dateobj => {
            const date = <Date>(<unknown>dateobj.display);    // Dates are automatically converted from string...
            //console.log("date:",data_date[i+1]);
            const pos = dateobj.locations.split(",")[0];
            const year = date.getFullYear();
            const id = this.record.id + "#" + pos;
            if(year < this.max_year && year > this.min_year && all_dates.indexOf(date)===-1 && all_ids.indexOf(id)===-1){
                data.push({id: id, content: moment(date).format('ll'), start: date});
                all_ids.push(id);
            }
        });

        if(data.length >= this.min_dates){

            if(data.length> this.max_dates )
                data = data.slice(0, this.max_dates);

            //console.log(data);

            this.items.add(data);

            if(!this.timeline){
                this.timeline = new Timeline(this.container.nativeElement, this.items, this.options);
            }else{
                this.timeline.fit();
            }

            try{
                this.timeline.removeCustomTime("date-modified");
            }catch{
                // No date-modified
            }

            if(Utils.isString(this.record.modified) && this.record.modified.length>=10){
                this.timeline.addCustomTime(this.record.modified.substring(0,10), "date-modified");
            }

            this.timeline.on('select', properties => {
                //console.log('selected items: ' + properties.items);
                //console.log('event: ', properties.event);
                //console.log(properties);
                if(properties.items.length>0){
                    //var id = properties.items[0].split("#");
                    console.log(this.items.get(properties.items[0]));
                    //var date = items._data[properties.items[0]].start;
                    //var url = "search?action=select&resultid="+RESULTID+"&item=%22Tag%3B"+settings.date_column+"%3B"+date+"%3B"+date+"%22"
                    //popup_extract(id[0], parseInt(id[1]), properties.event.target,url);
                }
            });

        }else{
            console.log("no timeline for this doc...");
        }
    }
}