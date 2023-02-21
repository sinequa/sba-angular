type PreviewMessage =
  | { action: 'init', highlights?: PreviewHighlightColors[] }
  | { action: 'get-html', ids: string[] }
  | { action: 'get-text', ids: string[] }
  | { action: 'get-positions', highlight: string }
  | { action: 'highlight', highlights: PreviewHighlightColors[] }
  | { action: 'select', id: string }
  | { action: 'paging' };

interface PreviewHighlightColors {
  name: string;
  color?: string;
  bgColor?: string;
}

interface PagingConfig {

}

document.addEventListener("DOMContentLoaded", function() {

  // Add the origin of your application (localhost:4200 is included for development purposes)
  const TRUSTED_ORIGINS = [
    'http://localhost:4200',
    'https://localhost:4200',
    'https://vm-su-sba.sinequa.com:13343',
    'http://localhost'
  ];

  // Until we get the first message from the SBA, we don't know which origin it has (among the trusted origins)
  let parentOrigin = '*';

  // A <style> element we can use to inject dynamic CSS in the preview
  let styleElement: HTMLStyleElement;

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
  function receiveMessage(event: MessageEvent) {
    if (!TRUSTED_ORIGINS.includes(event.origin)) {
      return;
    }

    const data = event.data as PreviewMessage;

    switch (data.action) {
      case 'init': init(event.origin, data.highlights); break;
      case 'get-html': getHtml(data.ids); break;
      case 'get-text': getText(data.ids); break;
      case 'get-positions': getPositions(data.highlight); break;
      case 'highlight': highlight(data.highlights); break;
      case 'select': select(data.id); break;
      case 'paging': break;
    }
  }

  /**
   * Return messages/data to the SBA
   */
  function returnMessage(type: string, data?: any) {
    parent.postMessage({ type, data, url: window.location.href }, parentOrigin);
  }


  // Actions from the SBA

  /**
   * Initialize the preview
   */
  function init(origin: string, highlights?: PreviewHighlightColors[]) {
    parentOrigin = origin;
    const head = document.head || document.getElementsByTagName('head')[0]
    styleElement = document.createElement('style');
    head.appendChild(styleElement);

    document.addEventListener("mouseup", () => onMouseUp());
    document.addEventListener("mousemove", e => onMouseMove(e));
    window.addEventListener("scroll", () => returnMessage("scroll", {x: window.scrollX, y: window.scrollY}));

    if (highlights) {
      highlight(highlights);
    }
  }

  /**
   * Specify which highlights to display
   */
  function highlight(highlights: PreviewHighlightColors[]) {
    styleElement.textContent = highlights
      .map(highlight =>
        `span.${highlight.name} {
          color: ${highlight.color};
          background-color: ${highlight.bgColor};
        }`)
      .join('\n');
  }

  /**
   * Select a highlight (apply additional classes and scroll to the view the element)
   */
  function select(id: string) {
    unselect();
    const elements = getElements(id);
    elements.forEach((el, i) => {
      const first = i === 0;
      const last = i === elements.length - 1;
      if (el instanceof SVGElement) {
        setHighlightSelectionSVG(el, first, last);
      }
      else {
        el.classList.add('sq-current');
        if (first) el.classList.add('sq-first');
        if (last) el.classList.add('sq-last');
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
    removeAllElements('svg line.sq-svg')
  }

  /**
   * Return the HTML content of a list of elements (by id)
   */
  function getHtml(ids: string[]) {
    const data = ids.map(id => getHighlightHtml(id));
    returnMessage('get-html-results', data);
  }

  /**
   * Return the text content of a list of elements (by id)
   */
  function getText(ids: string[]) {
    const data = ids.map(id => getHighlightText(id));
    returnMessage('get-text-results', data);
  }

  /**
   * Return the positions and text of a specific highlight type
   */
  function getPositions(highlight: string) {
    const data = getHighlightPositions(highlight);
    returnMessage('get-positions-results', data);
  }

  /**
   * Emit a message on mouse up with the selected text and its position in the document
   */
  function onMouseUp() {
    const selection = document.getSelection();
    const selectedText = selection ? selection.toString().trim() : "";
    if (selection && selectedText) {
      const range = selection.getRangeAt(0);
      const position = range.getBoundingClientRect();
      returnMessage("text-selection", {selectedText, position});
    }
    else {
      returnMessage("text-selection");
    }
  }


  let currentId: string|undefined;

  function onMouseMove(event: MouseEvent) {
    const el = event.target as Element;
    if(el.attributes["data-entity-display"] && el.id !== currentId) {
      currentId = el.id;
      returnMessage('highlight-hover', {id: el.id, position: el.getBoundingClientRect()});
    }
    else if(currentId && el.id !== currentId) {
      currentId = undefined;
      returnMessage('highlight-hover');
    }
  }


  // SVG Utils

  /**
   * Update the location of the entities' SVG background (for some converters)
   */
  function setSvgBackgroundPositionAndSize(): void {
    document.querySelectorAll("svg").forEach(svg => {
      svg.querySelectorAll("tspan").forEach(tspan => {
        const bgId = tspan.getAttribute("data-entity-background");
        if (bgId) {
          const rect = document.getElementById(bgId);
          if (rect) {
            resizeSvgBackground(rect, tspan);
          }
        }
      });
    });
  }

  function resizeSvgBackground(rect: Element, tspan: SVGTSpanElement): void {

    const text: SVGTSpanElement = tspan;
    const textBoxPixel: DOMRect = text.getBoundingClientRect();
    const textBoxSVG: SVGRect = text.getBBox();
    if (textBoxPixel.height === 0 || textBoxPixel.width === 0) return;
    const scaleX = textBoxSVG.width / textBoxPixel.width;
    const scaleY = textBoxSVG.height / textBoxPixel.height;
    const deltaX = 2 * scaleX;
    const deltaY = 2 * scaleY;

    const firstCharRect = tspan.getExtentOfChar(0);
    const tspanWidth = tspan.getComputedTextLength();

    rect.setAttribute("x", String(firstCharRect.x - deltaX));
    rect.setAttribute("y", String(firstCharRect.y - deltaY));
    rect.setAttribute("width", String(tspanWidth + 2 * deltaX));
    rect.setAttribute("height", String(textBoxSVG.height + 2 * deltaY));
    const valueTransform = text.getAttribute("transform");
    if (valueTransform) rect.setAttribute("transform", valueTransform);
  }

  function setHighlightSelectionSVG(elt: SVGElement, isFirst: boolean, isLast: boolean): void {
    const bgId = elt.getAttribute("data-entity-background");
    if (!bgId) return;
    const rect = document.querySelector(bgId) as SVGRectElement;
    if (!rect) return;

    const group = rect.parentNode;
    const rectPosition = rect.getBBox();

    if (group) {
      const top = rectPosition.y;
      const bottom = rectPosition.y + rectPosition.height;
      const left = rectPosition.x;
      const right = rectPosition.x + rectPosition.width;
      const valueTransform = rect.getAttribute("transform");
      addSvgLine(group, left, top, right, top, valueTransform);
      addSvgLine(group, left, bottom, right, bottom, valueTransform);
      if (isFirst) addSvgLine(group, left, top, left, bottom, valueTransform);
      if (isLast) addSvgLine(group, right, top, right, bottom, valueTransform);
    }
  }

  function addSvgLine(group: Node, x1: number, y1: number, x2: number, y2: number, transform: string | null): void {
    const line: Element = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("class", 'sq-svg');
    line.setAttribute("x1", String(x1));
    line.setAttribute("y1", String(y1));
    line.setAttribute("x2", String(x2));
    line.setAttribute("y2", String(y2));
    if (transform) line.setAttribute("transform", transform);
    group.appendChild(line);
  }


  // Utils

  function getElements(id: string): NodeListOf<Element> {
    return document.querySelectorAll(`#${id}`);
  }

  function getHighlightText(id: string): string {
    let text = "";
    getElements(id).forEach(n => text += n.textContent + " ");
    return text;
  }

  function getHighlightHtml(id: string): string {
    let html = "";
    getElements(id).forEach(n => html += n.innerHTML + " ");
    return html;
  }

  function getHighlightPositions(highlight: string) {
    const positions: {top: number, height: number, text: string}[] = [];
    const height = document.body.scrollHeight;
    document.querySelectorAll(`span.${highlight},tspan.${highlight}`).forEach(el => {
      const box = el.getBoundingClientRect();
      positions.push({
        top: box.top / height,
        height: box.height / height,
        text: el.textContent || ''
      });
    });
  }

  function removeAllClasses(classname: string) {
    const selected = document.querySelectorAll(`.${classname}`);
    selected.forEach(el => el.classList.remove(classname));
  }

  function removeAllElements(selector: string) {
    document.querySelectorAll(selector).forEach(e => e.remove());
  }

});
