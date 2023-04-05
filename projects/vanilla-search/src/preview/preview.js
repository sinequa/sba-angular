document.addEventListener("DOMContentLoaded", function () {
    var TRUSTED_ORIGINS = [
        'http://localhost:4200',
        'https://localhost:4200',
        window.origin
    ];
    var parentOrigin = '*';
    var styleElement;
    var passageHighlighter;
    setSvgBackgroundPositionAndSize();
    window.addEventListener("message", receiveMessage);
    returnMessage("ready");
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
                select(data.id, data.usePassageHighlighter);
                break;
            case 'unselect':
                unselect();
                break;
            case 'paging': break;
        }
    }
    function returnMessage(type, data) {
        parent.postMessage({ type: type, data: data, url: window.location.href }, parentOrigin);
    }
    function init(origin, highlights) {
        parentOrigin = origin;
        styleElement = document.createElement('style');
        document.head.appendChild(styleElement);
        passageHighlighter = document.createElement('div');
        passageHighlighter.id = 'sq-passage-highlighter';
        passageHighlighter.style.position = 'absolute';
        passageHighlighter.style.display = 'none';
        document.body.appendChild(passageHighlighter);
        document.addEventListener("mouseup", function () { return onMouseUp(); });
        document.addEventListener("mousemove", function (e) { return onMouseMove(e); });
        window.addEventListener("scroll", function () { return returnMessage("scroll", { x: window.scrollX, y: window.scrollY }); });
        if (highlights) {
            highlight(highlights);
        }
    }
    function highlight(highlights) {
        styleElement.textContent = highlights
            .map(function (highlight) {
            return "span.".concat(highlight.name, " {\n          color: ").concat(highlight.color, ";\n          background-color: ").concat(highlight.bgColor, ";\n        }\n        tspan.").concat(highlight.name, " {\n          fill: ").concat(highlight.color, ";\n        }\n        rect.").concat(highlight.name, " {\n          fill: ").concat(highlight.bgColor, ";\n        }\n        ");
        })
            .join('\n');
    }
    function select(id, usePassageHighlighter) {
        if (usePassageHighlighter === void 0) { usePassageHighlighter = false; }
        unselect();
        var elements = Array.from(getElementsById(id));
        var visibleElements = elements.filter(function (el) {
            var box = el.getBoundingClientRect();
            return box.width && box.height;
        });
        (visibleElements[0] || elements[0]).scrollIntoView({ block: 'center', behavior: 'auto' });
        if (usePassageHighlighter) {
            selectPassage(visibleElements);
        }
        else {
            selectHighlight(elements);
        }
        returnMessage('selected-position', getVerticalPositions(visibleElements)[0]);
    }
    function selectPassage(elements) {
        passageHighlighter.style.display = 'none';
        var box = getBoundingBox(elements);
        if (box) {
            var margin = 4;
            var left = Math.max(0, box.left - margin);
            var top_1 = Math.max(0, box.top - margin);
            var right = box.right + margin;
            var bottom = box.bottom + margin;
            passageHighlighter.style.left = "".concat(window.scrollX + left, "px");
            passageHighlighter.style.top = "".concat(window.scrollY + top_1, "px");
            passageHighlighter.style.width = (right - left) + 'px';
            passageHighlighter.style.height = (bottom - top_1) + 'px';
            passageHighlighter.style.display = 'block';
        }
    }
    function selectHighlight(elements) {
        elements.forEach(function (el, i) {
            var first = i === 0;
            var last = i === elements.length - 1;
            if (el instanceof SVGElement) {
                selectHighlightSVG(el, first, last);
            }
            else {
                el.classList.add('sq-current');
                if (first)
                    el.classList.add('sq-first');
                if (last)
                    el.classList.add('sq-last');
            }
        });
    }
    function unselect() {
        removeAllClasses('sq-current');
        removeAllClasses('sq-first');
        removeAllClasses('sq-last');
        removeAllElements('svg line.sq-svg');
        passageHighlighter.style.display = 'none';
    }
    function getHtml(ids) {
        var data = ids.map(function (id) { return getHighlightHtmlById(id); });
        returnMessage('get-html-results', data);
    }
    function getText(ids) {
        var data = ids.map(function (id) { return getHighlightTextById(id); });
        returnMessage('get-text-results', data);
    }
    function getPositions(highlight) {
        var allHighlights = Array.from(document.querySelectorAll("span.".concat(highlight, ",tspan.").concat(highlight)));
        var data = getVerticalPositions(allHighlights);
        returnMessage('get-positions-results', data);
    }
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
    function selectHighlightSVG(elt, isFirst, isLast) {
        var bgId = elt.getAttribute("data-entity-background");
        if (!bgId)
            return;
        var rect = document.querySelector(bgId);
        if (!rect)
            return;
        var group = rect.parentNode;
        var rectPosition = rect.getBBox();
        if (group) {
            var top_2 = rectPosition.y;
            var bottom = rectPosition.y + rectPosition.height;
            var left = rectPosition.x;
            var right = rectPosition.x + rectPosition.width;
            var valueTransform = rect.getAttribute("transform");
            addSvgLine(group, left, top_2, right, top_2, valueTransform);
            addSvgLine(group, left, bottom, right, bottom, valueTransform);
            if (isFirst)
                addSvgLine(group, left, top_2, left, bottom, valueTransform);
            if (isLast)
                addSvgLine(group, right, top_2, right, bottom, valueTransform);
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
    function getElementsById(id) {
        return document.querySelectorAll("#".concat(id));
    }
    function getHighlightTextById(id) {
        var text = "";
        getElementsById(id).forEach(function (n) { return text += n.textContent + " "; });
        return text;
    }
    function getHighlightHtmlById(id) {
        var html = "";
        getElementsById(id).forEach(function (n) { return html += n.innerHTML + " "; });
        return html;
    }
    function getVerticalPositions(elements) {
        var offset = -document.documentElement.getBoundingClientRect().top;
        var docHeight = Math.max(document.documentElement.scrollHeight, window.innerHeight);
        var groups = new Map();
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var el = elements_1[_i];
            var id = el.id;
            if (id) {
                if (!groups.has(id)) {
                    groups.set(id, []);
                }
                groups.get(id).push(el);
            }
        }
        var positions = [];
        for (var _a = 0, _b = Array.from(groups.entries()); _a < _b.length; _a++) {
            var _c = _b[_a], id = _c[0], el = _c[1];
            var box = getBoundingBox(el);
            if (box) {
                var top_3 = 100 * (offset + box.top) / docHeight;
                var height = 100 * box.height / docHeight;
                var text = el.map(function (e) { return e.textContent; }).join(' ');
                var type = id.substring(0, id.lastIndexOf('_'));
                positions.push({ id: id, type: type, top: top_3, height: height, text: text });
            }
        }
        return positions;
    }
    function getBoundingBox(elements) {
        var boxes = elements
            .map(function (el) { return el.getBoundingClientRect(); })
            .filter(function (b) { return b.width && b.height; });
        if (boxes.length === 0) {
            return undefined;
        }
        var left = Math.min.apply(Math, boxes.map(function (p) { return p.left; }));
        var top = Math.min.apply(Math, boxes.map(function (p) { return p.top; }));
        var right = Math.max.apply(Math, boxes.map(function (p) { return p.right; }));
        var bottom = Math.max.apply(Math, boxes.map(function (p) { return p.bottom; }));
        return new DOMRect(left, top, right - left, bottom - top);
    }
    function removeAllClasses(classname) {
        var selected = document.querySelectorAll(".".concat(classname));
        selected.forEach(function (el) { return el.classList.remove(classname); });
    }
    function removeAllElements(selector) {
        document.querySelectorAll(selector).forEach(function (e) { return e.remove(); });
    }
});
