import { ChangeDetectorRef, ElementRef } from '@angular/core';

import { Preview } from './preview.component';

describe('Preview', () => {
    let component: Preview;

    const mockPreviewService = jasmine.createSpyObj('PreviewService', ['getPreviewData']);
    const mockPreviewFrames = jasmine.createSpyObj('PreviewFrameService', ['subscribe', 'unsubscribe']);
    const mockSanitizer = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustResourceUrl']);
    const mockAppService = jasmine.createSpyObj('AppService', ['updateUrlForCors'], { origin: 'http://localhost' });
    const mockSearchService = jasmine.createSpyObj('SearchService', ['notifyOpenOriginalDocument'], { query: undefined });
    const mockPrefs = jasmine.createSpyObj('UserPreferences', ['get', 'set']);
    const mockCdRef = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
    const mockUi = jasmine.createSpyObj('UIService', ['addElementResizeListener', 'removeElementResizeListener']);
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
            spyOn(component, 'sendMessage');
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
            spyOn(component, 'getHighlights').and.returnValue([]);
            spyOn(component, 'updateActions');
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
