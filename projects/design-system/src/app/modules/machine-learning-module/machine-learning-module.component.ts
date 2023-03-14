import { Component } from '@angular/core';
import { DocAnswerCardComponent } from './answer-card/answer-card.component';
import { DocPassageListComponent } from './passage-list/passage-list.component';
import { DocTopPassagesComponent } from './top-passages/top-passages.component';

@Component({
  selector: 'doc-machine-learning-module',
  templateUrl: '../../module-template.html'
})
export class DocMachineLearningModuleComponent {

  title = 'Machine Learning Module';
  description = `#### Reference documentation
  Please checkout the reference documentation auto-generated from source code.

#### Features
This module introduces the Neural Search components displaying Answers and Passages extracted from the documents according to your search.

#### Prerequisites
The SBA framework requires some configuration on the Sinequa server in order to have access to Neural Search features. Note that it comes within the usual query API and not an additional one, so there is nothing to change there.

On the server, your application needs to be linked to a query web service with Neural Search enabled. To do so, you need to have an index with Neural Search configuration set, you can then link a query web service to this index and enable Neural Search in the Search Settings tab, you then can use it for your SBA application’s query.

#### Import

    import { MLModule } from '@sinequa/components/machine-learning';

    @NgModule({
      imports: [
          /*....*/
          MLModule,
          /*....*/
      ],
      /*....*/
    })

This module is internationalized: If not already the case, you need to import its messages for the language(s) of your application. For example, in your app’s src/locales/en.ts:

    ...
    import {enML} from "@sinequa/components/machine-learning";

    const messages = Utils.merge({}, ..., enML, appMessages);

#### API usage

This module exports the AnswerCardComponent, TopPassagesComponent and PassageListComponent components that are responsible for displaying the Neural Search data from your query.`;

  components = [
    DocAnswerCardComponent,
    DocPassageListComponent,
    DocTopPassagesComponent
  ];

  constructor() { }

}
