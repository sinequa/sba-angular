document.addEventListener("DOMContentLoaded", function () {
    // Add the origin of your application (localhost:4200 is included for development purposes)
    var TRUSTED_ORIGINS = [
        'http://localhost:4200',
        'https://localhost:4200',
        'https://vm-su-sba.sinequa.com:13343',
        'http://localhost'
    ];
    // Until we get the first message from the SBA, we don't know which origin it has (among the trusted origins)
    var parentOrigin = '*';
    // A <style> element we can use to inject dynamic CSS in the preview
    var styleElement;
    // For document with SVG, resize the rect elements
    setSvgBackgroundPositionAndSize();
    // Listen to messages from the SBA
    window.addEventListener("message", receiveMessage);
    // Send the "ready" message to the SBA
    returnMessage("ready");
    // Functions
    /**
     * Handle messages from the SBA
     */
    function receiveMessage(event) {
        if (!TRUSTED_ORIGINS.includes(event.origin)) {
            return;
        }
        var data = event.data;
        switch (data.action) {
            case 'init':
                init(event.origin, data.highlights);
                break;
            case 'get-html':
                getHtml(data.ids);
                break;
            case 'get-text':
                getText(data.ids);
                break;
            case 'get-positions':
                getPositions(data.highlight);
                break;
            case 'highlight':
                highlight(data.highlights);
                break;
            case 'select':
                select(data.id);
                break;
            case 'paging': break;
        }
    }
    /**
     * Return messages/data to the SBA
     */
    function returnMessage(type, data) {
        parent.postMessage({ type: type, data: data, url: window.location.href }, parentOrigin);
    }
    // Actions from the SBA
    /**
     * Initialize the preview
     */
    function init(origin, highlights) {
        parentOrigin = origin;
        var head = document.head || document.getElementsByTagName('head')[0];
        styleElement = document.createElement('style');
        head.appendChild(styleElement);
        document.addEventListener("mouseup", function () { return onMouseUp(); });
        document.addEventListener("mousemove", function (e) { return onMouseMove(e); });
        window.addEventListener("scroll", function () { return returnMessage("scroll", { x: window.scrollX, y: window.scrollY }); });
        if (highlights) {
            highlight(highlights);
        }
    }
    /**
     * Specify which highlights to display
     */
    function highlight(highlights) {
        styleElement.textContent = highlights
            .map(function (highlight) {
            return "span.".concat(highlight.name, " {\n          color: ").concat(highlight.color, ";\n          background-color: ").concat(highlight.bgColor, ";\n        }");
        })
            .join('\n');
    }
    /**
     * Select a highlight (apply additional classes and scroll to the view the element)
     */
    function select(id) {
        unselect();
        var elements = getElements(id);
        elements.forEach(function (el, i) {
            var first = i === 0;
            var last = i === elements.length - 1;
            if (el instanceof SVGElement) {
                setHighlightSelectionSVG(el, first, last);
            }
            else {
                el.classList.add('sq-current');
                if (first)
                    el.classList.add('sq-first');
                if (last)
                    el.classList.add('sq-last');
            }
        });
        elements.item(0).scrollIntoView({ block: 'center', behavior: 'auto' });
    }
    /**
     * Unselect the currently selected element
     */
    function unselect() {
        removeAllClasses('sq-current');
        removeAllClasses('sq-first');
        removeAllClasses('sq-last');
        removeAllElements('svg line.sq-svg');
    }
    /**
     * Return the HTML content of a list of elements (by id)
     */
    function getHtml(ids) {
        var data = ids.map(function (id) { return getHighlightHtml(id); });
        returnMessage('get-html-results', data);
    }
    /**
     * Return the text content of a list of elements (by id)
     */
    function getText(ids) {
        var data = ids.map(function (id) { return getHighlightText(id); });
        returnMessage('get-text-results', data);
    }
    /**
     * Return the positions and text of a specific highlight type
     */
    function getPositions(highlight) {
        var data = getHighlightPositions(highlight);
        returnMessage('get-positions-results', data);
    }
    /**
     * Emit a message on mouse up with the selected text and its position in the document
     */
    function onMouseUp() {
        var selection = document.getSelection();
        var selectedText = selection ? selection.toString().trim() : "";
        if (selection && selectedText) {
            var range = selection.getRangeAt(0);
            var position = range.getBoundingClientRect();
            returnMessage("text-selection", { selectedText: selectedText, position: position });
        }
        else {
            returnMessage("text-selection");
        }
    }
    var currentId;
    function onMouseMove(event) {
        var el = event.target;
        if (el.attributes["data-entity-display"] && el.id !== currentId) {
            currentId = el.id;
            returnMessage('highlight-hover', { id: el.id, position: el.getBoundingClientRect() });
        }
        else if (currentId && el.id !== currentId) {
            currentId = undefined;
            returnMessage('highlight-hover');
        }
    }
    // SVG Utils
    /**
     * Update the location of the entities' SVG background (for some converters)
     */
    function setSvgBackgroundPositionAndSize() {
        document.querySelectorAll("svg").forEach(function (svg) {
            svg.querySelectorAll("tspan").forEach(function (tspan) {
                var bgId = tspan.getAttribute("data-entity-background");
                if (bgId) {
                    var rect = document.getElementById(bgId);
                    if (rect) {
                        resizeSvgBackground(rect, tspan);
                    }
                }
            });
        });
    }
    function resizeSvgBackground(rect, tspan) {
        var text = tspan;
        var textBoxPixel = text.getBoundingClientRect();
        var textBoxSVG = text.getBBox();
        if (textBoxPixel.height === 0 || textBoxPixel.width === 0)
            return;
        var scaleX = textBoxSVG.width / textBoxPixel.width;
        var scaleY = textBoxSVG.height / textBoxPixel.height;
        var deltaX = 2 * scaleX;
        var deltaY = 2 * scaleY;
        var firstCharRect = tspan.getExtentOfChar(0);
        var tspanWidth = tspan.getComputedTextLength();
        rect.setAttribute("x", String(firstCharRect.x - deltaX));
        rect.setAttribute("y", String(firstCharRect.y - deltaY));
        rect.setAttribute("width", String(tspanWidth + 2 * deltaX));
        rect.setAttribute("height", String(textBoxSVG.height + 2 * deltaY));
        var valueTransform = text.getAttribute("transform");
        if (valueTransform)
            rect.setAttribute("transform", valueTransform);
    }
    function setHighlightSelectionSVG(elt, isFirst, isLast) {
        var bgId = elt.getAttribute("data-entity-background");
        if (!bgId)
            return;
        var rect = document.querySelector(bgId);
        if (!rect)
            return;
        var group = rect.parentNode;
        var rectPosition = rect.getBBox();
        if (group) {
            var top_1 = rectPosition.y;
            var bottom = rectPosition.y + rectPosition.height;
            var left = rectPosition.x;
            var right = rectPosition.x + rectPosition.width;
            var valueTransform = rect.getAttribute("transform");
            addSvgLine(group, left, top_1, right, top_1, valueTransform);
            addSvgLine(group, left, bottom, right, bottom, valueTransform);
            if (isFirst)
                addSvgLine(group, left, top_1, left, bottom, valueTransform);
            if (isLast)
                addSvgLine(group, right, top_1, right, bottom, valueTransform);
        }
    }
    function addSvgLine(group, x1, y1, x2, y2, transform) {
        var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("class", 'sq-svg');
        line.setAttribute("x1", String(x1));
        line.setAttribute("y1", String(y1));
        line.setAttribute("x2", String(x2));
        line.setAttribute("y2", String(y2));
        if (transform)
            line.setAttribute("transform", transform);
        group.appendChild(line);
    }
    // Utils
    function getElements(id) {
        return document.querySelectorAll("#".concat(id));
    }
    function getHighlightText(id) {
        var text = "";
        getElements(id).forEach(function (n) { return text += n.textContent + " "; });
        return text;
    }
    function getHighlightHtml(id) {
        var html = "";
        getElements(id).forEach(function (n) { return html += n.innerHTML + " "; });
        return html;
    }
    function getHighlightPositions(highlight) {
        var positions = [];
        var height = document.body.scrollHeight;
        document.querySelectorAll("span.".concat(highlight, ",tspan.").concat(highlight)).forEach(function (el) {
            var box = el.getBoundingClientRect();
            positions.push({
                top: box.top / height,
                height: box.height / height,
                text: el.textContent || ''
            });
        });
    }
    function removeAllClasses(classname) {
        var selected = document.querySelectorAll(".".concat(classname));
        selected.forEach(function (el) { return el.classList.remove(classname); });
    }
    function removeAllElements(selector) {
        document.querySelectorAll(selector).forEach(function (e) { return e.remove(); });
    }
});
