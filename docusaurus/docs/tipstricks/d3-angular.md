---
layout: default
title: D3 and Angular
parent: Tips and Tricks
sidebar_position: 11
---

# Combining D3 and Angular

## What is D3.js

The [Data-Driven Documents (D3) library](https://d3js.org/) is one of the most popular libraries for producing interactive charts. There are **many** samples of charts available on the Internet, which can be reused in an Angular application.

Most charting libraries, like [ngx-charts](https://swimlane.github.io/ngx-charts/) or [Highcharts](https://www.highcharts.com/), package many pre-defined charts that can be configured with a bunch of options. The problem with this approach is that there are many degrees of freedom when building an interactive chart, and no amount of options can handle them all. At some point you will need to do something that wasn't forseen by the component's designer.

For this reason, D3 does not package any pre-defined chart. Instead, it packages many **primitives** and **algorithms** to efficiently build exactly the custom chart that you need. This approach is very powerful, especially when looking at the huge variety of D3's gallery of visualization, none looking like another.

The drawback is that D3 is difficult to learn and to use. Even after working with it for a long time, you can be easily confused by its complex code, especially when charts grow in complexity (multiple "behaviors", transition, update mechanism, etc.).

If you want to learn about D3, their [latest tutorial](https://observablehq.com/@d3/learn-d3?collection=@d3/learn-d3) covers a lot of the key concepts and can be done completely online.

## D3 concepts

D3 essentially draws charts as [Scalable Vector Graphics](https://developer.mozilla.org/fr/docs/Web/SVG) (SVG) and everything revolves around modifying these SVG and listening to users mouse and keyboard interactions on these SVG.

It is important to be relatively familiar with the SVG language to understand D3 generally and this page in particular.

For example, the following SVG code renders as follow:

```html
<svg width="200" height="200" style="background-color: #eee;">
    <rect x="30" y="100" width="50" height="80" fill="#d00"></rect>
    <rect x="80" y="50" width="50" height="130" fill="#0d0"></rect>
    <rect x="130" y="20" width="50" height="160" fill="#00d"></rect>
</svg>
```
```html
<svg width="200" height="200" style="background-color: #eee;">
    <rect x="30" y="100" width="50" height="80" fill="#d00"></rect>
    <rect x="80" y="50" width="50" height="130" fill="#0d0"></rect>
    <rect x="130" y="20" width="50" height="160" fill="#00d"></rect>
</svg>
```

This is exactly the kind of SVG that D3 can generate, except of course it normally generates them with JavaScript code.

**In most examples you see online, the SVG actually starts empty and is populated with elements programmatically.**

For example, to reproduce the example above:

```html
<!-- An empty SVG -->
<svg id="my-svg"></svg>

<script>
const svg = d3.select("#my-svg")
    .attr("width", 200) // Set the attributes of the SVG element
    .attr("height", 200)
    .style("background-color", "#eee");

svg.append("rect") // Create a <rect> element
    .attr("x", 10) // Set each attribute of the new <rect element>
    .attr("y", 100)
    .attr("width", 50)
    .attr("height", 80)
    .attr("fill", "#d00");

// etc. for the 2 other rects

</script>
```

Of course, in practice what you want to plot on the screen is **data**, which unfortunately is not measured on a scale of **pixels**. So we need to somehow transform our data into proportionate numbers for our `x`, `y`, `width`, `height`, and even `fill` attributes. This is where D3 starts to come in handy, with the concept of **Scale** (See [d3-scale](https://github.com/d3/d3-scale)).

Let's say the data from the chart above is in fact defined as below:

```js
const data = [
    {label: 'banana', value: 0.8},
    {label: 'apple', value: 1.3},
    {label: 'strawberry', value: 1.6}
];
```

Let's refactor the example above using D3 scales:

```js
// Create a scale for the X axis, that maps each label to a range of pixels
const xScale = d3.scaleBand()
    .domain(data.map(d => d.label)) // ['banana', 'apple', 'strawberry']
    .range([30, 190]) // The first bar will start at 30px, and the last will end at 190px

// Create a scale for the Y axis, that maps each numerical value to a pixel dimension
const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)]) // The Y axis will always start at 0
    .range([180, 20]) // The 0 is mapped to 180px (the bottom of the chart - 20px for margin) and the max is mapped to 20px (the height of the chart + 20px for margin)

// Create a scale for the colors. Each index will yield a different color
const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

// Now we can build our <rect> in a for-loop!
for(let i=0; i<data.length; i++) {
    svg.append("rect")
        .attr("x", xScale(data[i].label))
        .attr("y", yScale(data[i].value))
        .attr("width", xScale.bandwidth())
        .attr("height", yScale(0) - yScale(data[i].value))
        .attr("fill", colorScale(i));
}
```

This generates the following SVG:

![d3 bar char](/assets/tipstricks/d3-bars.png)

Note that the code above generalizes for any amount and scale of data and SVG dimensions.

If you are familiar with D3, the for-loop probably looks at bit strange to you. Indeed, the idiomatic way of writing it with D3 would be instead:

```js
svg.selectAll(".bar")
    .data(data) // We are "attaching" the data to DOM elements
    .enter() // Here we select only the elements that enter the DOM
    .append("rect") // For each new element, we insert a <rect>
    .attr("class", "bar")
    .attr("x", d => xScale(d.label)) // Works as before, except we access the data with arrow functions
    .attr("y", d => yScale(d.value))
    .attr("width", xScale.bandwidth())
    .attr("height", d => yScale(0) - yScale(d.value))
    .attr("fill", (d,i) => colorScale(i));
```

This syntax is a lot more powerful for reasons that become clear when you use more advanced features of D3.

While we're here, let's use D3's axes primitives to nicely visualize our labels and numerical values:

```js
svg.append("g") // Create a new <g> element
    .attr("transform", `translate(0, 180)`) // Move it to the bottom
    .call(d3.axisBottom(xScale)); // Turn it into an axis

svg.append("g") // Create a new <g> element
    .attr("transform", `translate(30, 0)`) // Move it to the left of the chart
    .call(d3.axisLeft(yScale)); // Turn it into an axis
```

![d3 bar char](/assets/tipstricks/d3-bars-axes.png)

This is D3's most basic example. There are many other primitives and algorithms, but in the end it always comes down to manipulating the DOM in an efficient way.

But, let's stop here for a second... Because **Angular is also really good at manipulating the DOM**. Unlike D3, Angular does not force you to create and modify every DOM element programmatically by writing JavaScript. Instead, Angular uses a template language which manages a lot of the functionalities of D3 selections, but in a way that is a lot more expressive and pleasant.

## Leveraging Angular

Instead of creating our `<rect>` elements programmatically, let's use Angular's template language:

```html
<svg width="200" height="200" style="background-color: #eee;">
    <rect *ngFor="let d of data; let i=index"
        [attr.x]="xScale(d.label)"
        [attr.y]="yScale(d.value)"
        [attr.width]="xScale.bandwidth()"
        [attr.height]="yScale(0) - yScale(d.value)"
        [attr.fill]="colorScale(i)">
    </rect>
</svg>
```

This descriptive approach has various advantages:

- It is a lot more expressive than the equivalent code based on `d3.select()`. What you see is what you get. There is no risk of forgetting to call a `.select()` or an `.append()`. A new developer reading this understands immediately what is going on.
- This code updates automatically and efficiently when the data and scales change. Angular takes care of adding or remove the necessary DOM elements for you, whereas the equivalent task is non-trivial when you need to do it programmatically.
- This removes a significant part of the code from your component and makes it easier to debug and maintain.

Let's see how this component's controller looks like:

```ts
@Component({
    selector: 'my-chart',
    templateUrl: 'my-chart.html' // Template shown above
})
export class MyChart {
    @Input() data;

    xScale = d3.scaleBand().range([30, 190]);
    yScale = d3.scaleLinear().range([180, 20]);
    colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    /**
     * When the data changes, we only need to update our scales,
     * and the template will magically update!
     * */
    ngOnChanges() {
        this.xScale.domain(this.data.map(d => d.label));
        this.yScale.domain([0, d3.max(this.data, d => d.value)]);
    }
}
```

You'll notice the chart does not contain axes. This is because axes are complex and cannot be easily replaced by Angular template syntax. However, we can still leverage Angular to simplify things.

Let's start by adding and positioning the two `<g>` elements that will contain the X and Y axes:

```html
<svg width="200" height="200" style="background-color: #eee;">
    <rect *ngFor="let d of data; let i=index"
        [attr.x]="xScale(d.label)"
        ...>
    </rect>
    <g #xAxis transform="translate(0, 180)"></g>
    <g #yAxis transform="translate(30, 0)"></g>
</svg>
```

Notice the `#xAxis` and `#yAxis` identifiers. We can use them to retrieve these elements in the controller:

```ts
@ViewChild("xAxis") gx: ElementRef;
@ViewChild("yAxis") gy: ElementRef;
```

Now we can draw our axes with:

```ts
drawAxes() {
    d3.select(this.gx.nativeElement)
        .call(d3.axisBottom(this.xScale));

    d3.select(this.gy.nativeElement)
        .call(d3.axisLeft(this.yScale));
}
```

However, there is an issue here: The `gx` and `gy` elements will be `undefined` until the DOM is first rendered, and `ngOnChanges()` gets called before that! This is why we need to use `ngAfterViewInit()`, which runs once after the template is first rendered:

```ts
ngOnChanges() {
    this.xScale.domain(this.data.map(d => d.label));
    this.yScale.domain([0, d3.max(this.data, d => d.value)]);

    if(this.gx){ // We draw the axes unless the view hasn't yet been rendered
        this.drawAxes();
    }
}

ngOnAfterViewInit() {
    if(this.data) { // We draw the axes if there's any data (ie. the scales have been initialized in ngOnChanges())
        this.drawAxes();
    }
}
```

## Methodology

### 1) Component scope

In Angular you can design tiny components that do very few things or large components that do a lot of things.

In the case of charts, a good pattern is that your component should take the data as an `Input()`, without including interactions with the server (if the data needs to be refreshed from the server, because of user interactions, you can create a parent component that takes care of this). **Your component should be in charge of drawing a SVG, updating that SVG when the data changes and emitting events when users interact with the data.**

The good thing about having the data as an input is that Angular will call `ngOnChanges()` and refresh the view just when you need it.

### 2) Mock-up

When you want to develop a new chart, a good idea is to first write a mock SVG manually, to list the elements the you need and how they should be positioned together.

It is even easier if you start from an example you find online: the whole structure is available if you just inspect the SVG element.

### 3) Declarative vs. Programmatic

Some elements need to be created programmatically, like the axes in our example above. This is the case every time you see the pattern `.select(...).call(some D3 primitive)`. The `call()` function means the D3 functionality is packaged as a function that modifies existing DOM element(s) (by adding sub-elements, or adding listeners, etc.). In this case, use a container element with an id as we did above for the axes. You can then access the native element by using `@ViewChild` and then call the D3 primitive.

Apart from these special elements, you should generally write the SVG declaratively, as a regular Angular template, using `*ngFor` and `*ngIf` to create the right number of elements in the right place, as we did for the `<rect>` elements above.

The template might look like this for a multi-line chart:

```html
<svg [attr.viewBox]="'0 0 '+width+' '+height">

    <g [attr.transform]="'translate('+this.margin.left+','+ margin.top +')'">

        <!-- One path per series. line is a d3 shape primitive defined in the controller -->
        <path *ngFor="let series of data" [attr.d]="line(series)">
        </path>

        <!-- Containers for "special" elements -->
        <g #xAxis class="axis"></g>
        <g #yAxis class="axis"></g>
    </g>

</svg>
```

### 4) Pseudo code

It is easy to write D3 code that looks a bit like a plate of spaghetti, where it's hard to tell if the methods are called once or many times, and how they relate to each other.

Generally, this is the structure your component should have:

```ts
export class MyChart {
    // The data type here is for a multiline chart
    @Input() data: {x: number, y: number}[][];

    // You can have many settings if needed. A good practice is to defined default values
    @Input() width = 200;
    @Input() height = 200;
    @Input() margin = {top: 20, bottom: 20, left: 20, right: 20};

    // Container(s) for the "special" elements (that need to be created programmatically)
    @ViewChild("xAxis") xAxis: ElementRef;
    @ViewChild("yAxis") yAxis: ElementRef;

    // Scales, shapes, behaviors, etc. which need to be used in the template.
    x;
    y;
    line;

    // Called first
    constructor() {
        // Initialize the scales, shapes behaviors
        // Note: Using ngOnInit is potentially risky as it gets called AFTER the first ngOnChanges()

        this.x = d3.scaleLinear()
            .range([0, this.innerWidth]);

        this.y = d3.scaleLinear()
            .range([this.innerHeight, 0]);

        this.line = d3.line()
            .x(d => this.x(d.x))
            .y(d => this.y(d.y));

    }

    // Called second (and every time data or settings are changed)
    ngOnChanges() {

        // Update primitives that depend on the data (computation of min/max not shown)
        this.x.domain([minX, maxX]);
        this.y.domain([minY, maxY]);

        // If the view has been rendered already
        if(this.xAxis) {
            this.redrawSpecialElements();
        }
    }

    // Called third (and only once)
    ngAfterViewInit() {

        // Some "special" elements only need to be drawn once and for all (eg. a Brush or Zoom behavior, or a fixed-scale axis).
        // This can be done here.

        // No need to draw the chart if there is no data yet
        if(this.data) {
            this.redrawSpecialElements();
        }
    }

    redrawSpecialElements() {

        // Re-draw special elements
        d3.select(this.xAxis.nativeElement)
            .call(d3.axisBottom(this.x));

        d3.select(this.yAxis.nativeElement)
            .call(d3.axisLeft(this.y));
    }

    // Helper methods for the inner dimension of the chart (removing the margins)

    get innerWidth(): number {
        return this.width - this.margin.left - this.margin.right;
    }

    get innerHeight(): number {
        return this.height - this.margin.top - this.margin.bottom;
    }
}
```

### 5) Interactions

You can add many types of interactions to a chart.

The most simple ones are CSS effects applied on hover. These effects can be animated with transitions. For example:

```scss
.line {
    opacity: 0.6;
}
.line:hover {
    opacity: 1;
    transition: opacity 0.2s ease-in 0s;
}
```

Then there are effects that require event listeners and callbacks. Here we can use typical event listeners, such as `(mouseenter)`, `(mousemove)`, `(mouseleave)` or `(click)`. For example, we can listen to a user click on a bar (of the bar chart from our first example).

```html
<rect *ngFor="let d of data; let i=index"
    [attr.x]="xScale(d.label)"
    [attr.y]="yScale(d.value)"
    [attr.width]="xScale.bandwidth()"
    [attr.height]="yScale(0) - yScale(d.value)"
    [attr.fill]="colorScale(i)"

    (click)="onClick(d)"> <!-- Notice the (click) callback -->
</rect>
```

And in the controller:

```ts
onClick(d: {label: string, value: number}) {
    // We can do anything with the data that was clicked on!
    // Including modifying the data itself, which would cause the view to be redrawn.
    console.log(d);
}
```

Then, there are more complex interactions, like D3 [zoom](https://github.com/d3/d3-zoom), [brush](https://github.com/d3/d3-brush) or [drag](https://github.com/d3/d3-drag), which involve multiple listeners (to monitor mouse wheel, mouse click, movement, etc.). These interactions cannot be easily implemented in our template. Like the axes in the example above, we need to apply these behaviors programmatically to an existing DOM element.

For example, we can create a zoom behavior, and apply it to our SVG element:

```html
<svg #mysvg>
    ...
</svg>
```

With:

```ts
@ViewChild("mysvg") svg;

ngOnAfterViewInit() {
    // We create a Zoom behavior and apply it to the SVG element
    // The onZoom method is called when the user "zooms" (scroll with the mouse wheel) over the SVG
    const zoom = d3.zoom()
        .on("zoom", () => this.onZoom());
    d3.select(this.svg.nativeElement)
        .call(zoom);
}

onZoom() {
    const transform = d3.zoomTransform(this.svg.nativeElement);
    // The transform object allows us to either transform elements directly
    // For example: d3.select(svg).attr("transform", transform)

    // Or modify our scales, which will redraw the shapes in our template automatically
    this.x = transform.rescaleX(this.x);
    // Since we modify the X axis, we do need to redraw the axis programmatically
    // (because they axes are created programmatically in the first place, not via templating)
    d3.select(this.xAxis.nativeElement)
        .call(d3.axisBottom(this.x));
}
```

### 6) Transitions

D3 also provides a powerful API for transitioning elements smoothly between states. For example, when the data changes, you may want to animate the shapes (lines, paths, etc.) from their previous locations to the new ones. If the scale is changed following the data change, you would also animate the axes.

For example:

```ts
// We modify the X scale because of new data
this.x.domain([newMin, newMax]);

d3.select(this.xAxis.nativeElement) // Select the axis
    .transition() // Create a transition
    .duration(1000) // Which lasts for 1000ms
    .call(d3.axisBottom(this.x)); // Animate the axis from its current state to the new state (using the updated X domain).
```

Unfortunately transitions can only be applied to D3 selections, which at first seems like this approach is incompatible with the declarative approach described above.

Note that Angular also has a [transition API](https://angular.io/guide/transition-and-triggers) which can be used to transition between different states. This approach can be quite powerful, but it is limited to CSS styles,(for example transitioning from opacity 0 to 1 when an element is created). It doesn't seem currently possible to transition attributes, like the `x` and `y` coordinates of SVG primitives.

**There is a workaround to apply a real D3 transition to the elements declared in our Angular template.** Notice that the elements depend on the **scale** objects. So every time we modify a scale, Angular redraws the elements. In the example above we change the scale instantaneously, which means the elements transition instantaneously too. But it is possible to modify the scale at every step of the transition, which means Angular will update our SVG elements at every step too!

This looks as follows (using the same example as before):

```ts
// Store the old domain
const oldDomain = this.x.domain();
// We modify the X scale because of new data
this.x.domain([newMin, newMax]);
// Create an interpolator for our domain
const interpolator = d3.interpolateArray(oldDomain, this.x.domain());

d3.select(this.xAxis.nativeElement) // Select the axis
    .transition() // Create a transition
    .duration(1000) // Which lasts for 1000ms
    .tween("domain interpolation", () => (t) => {
        this.x.domain(interpolator(t)); // At every step of the transition we update the X scale's domain
    })
    .call(d3.axisBottom(this.x)); // Animate the axis from its current state to the new state (using the updated X domain).
```

With the above workaround, not only is the X axis smoothly transitioning between 2 domains, but also will any shape which directly or indirectly depends on the `x` scale!

As a last recommendation, be careful to **never mix transitions and User interactions**. If you start a transition, but in the meantime the user can zoom in and out, moving some elements, you will most definitely have a conflict, which may result in an unknown intermediate state.

If your chart contains interactions and transitions, be sure to turn off interactions before starting the transitions and turn them back on after.
