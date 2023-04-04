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
        var elements = getElementsById(id);
        elements.item(0).scrollIntoView({ block: 'center', behavior: 'auto' });
        if (usePassageHighlighter) {
            selectPassage(elements);
        }
        else {
            selectHighlight(elements);
        }
    }
    function selectPassage(elements) {
        passageHighlighter.style.display = 'none';
        var pos = [];
        elements.forEach(function (el) {
            var box = el.getBoundingClientRect();
            if (box.width && box.height) {
                pos.push(box);
            }
        });
        var margin = 4;
        var left = Math.max(0, Math.min.apply(Math, pos.map(function (p) { return p.left; })) - margin);
        var top = Math.max(0, Math.min.apply(Math, pos.map(function (p) { return p.top; })) - margin);
        var right = Math.max.apply(Math, pos.map(function (p) { return p.right; })) + margin;
        var bottom = Math.max.apply(Math, pos.map(function (p) { return p.bottom; })) + margin;
        passageHighlighter.style.left = "".concat(window.scrollX + left, "px");
        passageHighlighter.style.top = "".concat(window.scrollY + top, "px");
        passageHighlighter.style.width = (right - left) + 'px';
        passageHighlighter.style.height = (bottom - top) + 'px';
        passageHighlighter.style.display = 'block';
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
        var data = getHighlightPositions(highlight);
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
    function getHighlightPositions(highlight) {
        var positions = [];
        var height = Math.max(document.documentElement.scrollHeight, window.innerHeight);
        var offset = -document.documentElement.getBoundingClientRect().top;
        document.querySelectorAll("span.".concat(highlight, ",tspan.").concat(highlight)).forEach(function (el) {
            var box = el.getBoundingClientRect();
            positions.push({
                id: el.id,
                top: 100 * (offset + box.top) / height,
                height: 100 * box.height / height,
                text: (el.textContent || '')
            });
        });
        return positions;
    }
    function removeAllClasses(classname) {
        var selected = document.querySelectorAll(".".concat(classname));
        selected.forEach(function (el) { return el.classList.remove(classname); });
    }
    function removeAllElements(selector) {
        document.querySelectorAll(selector).forEach(function (e) { return e.remove(); });
    }
});
