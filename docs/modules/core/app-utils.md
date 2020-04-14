---
layout: default
title: App Utils Module
parent: Core
grand_parent: Modules
nav_order: 1
---

# App Utils Module

## Reference documentation

Please check out the [reference documentation]({{site.baseurl}}core/modules/AppUtilsModule.html) auto-generated from source code.

## Overview

The App Utils module contains utilities for working with the configuration of a Sinequa SBA. It can be used by simply importing the module.

```ts
import { AppUtilsModule } from '@sinequa/core/app-utils';
...
@NgModule({
    imports: [
        ...
        AppUtilsModule
    ]
}}
```

## AppService

This service includes an `init` method which is called automatically by `LoginService.login` and loads the app configuration using
`AppWebService.get`. It maintains the currently active `ccquery` which can be used by higher level services and components. Each time
`ccquery` changes a `QueryChangedEvent` is emitted by the service.

The service provides facilities for working with various Sinequa configuration elements linked to an application:
- web services
- lists
- index columns and their aliases

## Query

The App Utils module contains a `Query` class which implements the `IQuery` interface. This class provides methods for working
with faceted search (`selects`) and advanced search parameters.

A select expression uses Sinequa fielded search syntax. For example, to include a filter on the authors column in a query:

```ts
const query = new Query(this.appService.ccquery.name);
query.addSelect('authors:[tolkein, martin]', 'Authors');
```

A select can removed either by its index or by the name of the associated facet. In the latter case
there is an option to remove all selects pertaining to the facet.

```ts
// Remove the first select from the list
query.removeSelect(0);
// Remove all selects in the Authors facet
query.removeSelect('Authors', true);
```

Advanced search parameters are added by specifying their field (or column) name and the value (string, number, Date, boolean) or
an array of such values.

```ts
const query = new Query(this.appService.ccquery.name);
query.setAdvancedValue('authors', ['tolkein', 'martin']);
```

An advanced operator can also be specified to implement ranges:

```ts
import { AdvancedOperator } from '@sinequa/core/web-services';
...
// where size > 1024 and size <= 30720
query.setAdvancedValue('size', 1024, AdvancedOperator.GT);
query.setAdvancedValue('size', 30720, AdvancedOperator.LTE);
```

Advanced search parameters can be removed by specifying `undefined` as the value. If an operator was included
when adding the value then it must also be specified when removing it.

```ts
// The following two lines are equivalent...
query.removedAdvancedValue('size', AdvancedOperator.GT);
query.setAdvancedValue('size', undefined, AdvancedOperator.GT);
```

## Format Service

The `FormatService` is used to format values retrieved from a Sinequa index according to their type and the current locale.
Numbers, dates and booleans are all handled by default. Custom formatters can also be assigned to columns in the Sinequa
administration. The `memorysize` and `language` formatters are provided by default. The strings used in these formatters
are defined in the messages in the [Intl Module]({{site.baseurl}}modules/core/intl.html).

```ts
// The following will display "size: 2.92Kb" when using the en locale
let column = this.appService.getColumn('size');
// Note that this would normally be configured in the Sinequa administration
column.formatter = 'memorysize';
console.log('size:', this.formatService.format(3000, column));
// The following will display "language: French" when using the en locale
column = this.appService.getColumn('documentlanguages');
// Note that this would normally be configured in the Sinequa administration
column.formatter = 'language';
console.log('language:', this.formatService.format('fr', column));
```

Custom formatters can be provided by overriding the `FormatService`

```ts
import { Injectable } from '@angular/core/';
import { FormatService, ValueItem } from '@sinequa/core/app-utils';
import { FieldValue } from '@sinequa/core/base';
import { CCColumn } from '@sinequa/core/web-services';
...
@Injectable({
    providedIn: 'root'
})
export class MyFormatService extends FormatService {
    // Add support for a custom formatter
    formatValue: (valueItem: ValueItem | FieldValue, column?: CCColumn): string {
        if (column && column.formatter === 'mycustomformatter') {
            let [value, display] = this.getValueAndDisplay(valueItem);
            switch (value) {
                case 0:
                    return "zero";
                case 1:
                    return "one";
                case 2:
                    return "two";
            }
        }
        return super.formatValue(valueItem, column);
    }
};
...
// Provide
@NgModule({
    providers: [
        { provider: FormatService, useClass: MyFormatService }
    ]
})
```

Similarly, parsers can also be specified. These are used to parse values in fielded search expressions. A `memorysize` parser is included
by default so that fielded search expressions such as `size:>=25Kb` can be used. Note that server-side support for custom parsers is also
required so that the expressions can be parsed on the server. A server-side custom parser takes the form of a function plugin named
`ParseExpressionValue` which takes the custom parser name and the value to be parsed as parameters:

```cs
public class ParseExpressionValue : FunctionPlugin
{
    public override string GetValue(IDocContext ctxt, params string[] values)
    {
        if (values.Length <= 1) return null;
        var parser = values[0];
        var value = values[1];
        if (parser == "mycustomparser")
        {
            // return the parsed value here
        }
        return null;
    }		
}
```