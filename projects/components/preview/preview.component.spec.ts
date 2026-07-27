import { ChangeDetectorRef, ElementRef } from '@angular/core';

import { Preview } from './preview.component';

/** Vitest counterpart of the former `jasmine.createSpyObj()`. */
function createSpyObj(methodNames: string[], properties: Record<string, unknown> = {}): any {
    return Object.fromEntries([
        ...methodNames.map(name => [name, vi.fn()]),
        ...Object.entries(properties)
    ]);
}

describe('Preview', () => {
    let component: Preview;

    const mockPreviewService = createSpyObj(['getPreviewData']);
    const mockPreviewFrames = createSpyObj(['subscribe', 'unsubscribe']);
    const mockSanitizer = createSpyObj(['bypassSecurityTrustResourceUrl']);
    const mockAppService = createSpyObj(['updateUrlForCors'], { origin: 'http://localhost' });
    const mockSearchService = createSpyObj(['notifyOpenOriginalDocument'], { query: undefined });
    const mockPrefs = createSpyObj(['get', 'set']);
    const mockCdRef = createSpyObj(['detectChanges']);
    const mockUi = createSpyObj(['addElementResizeListener', 'removeElementResizeListener']);
    const mockEl = { nativeElement: document.createElement('div') } as ElementRef<HTMLElement>;
    const mockEvent = new MouseEvent('click') as UIEvent;

    beforeEach(() => {
        component = new Preview(
            mockPreviewService,
            mockPreviewFrames,
            mockSanitizer as any,
            mockAppService as any,
            mockSearchService as any,
            mockPrefs as any,
            mockCdRef as ChangeDetectorRef,
            mockUi as any,
            mockEl
        );
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    describe('zoom postMessage on zoom actions', () => {
        beforeEach(() => {
            vi.spyOn(component, 'sendMessage').mockImplementation((() => undefined) as never);
        });

        it('should send zoom with new factor when zooming in', () => {
            const initialScale = component.scale;
            component.zoomInAction.action!(component.zoomInAction, mockEvent);
            expect(component.sendMessage).toHaveBeenCalledWith({ action: 'zoom', factor: initialScale + component.scaleIncrement });
        });

        it('should send zoom with new factor when zooming out', () => {
            const initialScale = component.scale;
            component.zoomOutAction.action!(component.zoomOutAction, mockEvent);
            expect(component.sendMessage).toHaveBeenCalledWith({ action: 'zoom', factor: initialScale - component.scaleIncrement });
        });

        it('should send zoom on ready with current scale', () => {
            vi.spyOn(component, 'getHighlights').mockReturnValue([]);
            vi.spyOn(component, 'updateActions').mockImplementation((() => undefined) as never);
            component.onReady();
            expect(component.sendMessage).toHaveBeenCalledWith({ action: 'zoom', factor: component.scale });
        });

        it('zoom in should increment scale by scaleIncrement', () => {
            const before = component.scale;
            component.zoomInAction.action!(component.zoomInAction, mockEvent);
            expect(component.scale).toBeCloseTo(before + component.scaleIncrement);
        });

        it('zoom out should decrement scale by scaleIncrement', () => {
            const before = component.scale;
            component.zoomOutAction.action!(component.zoomOutAction, mockEvent);
            expect(component.scale).toBeCloseTo(before - component.scaleIncrement);
        });
    });
});
