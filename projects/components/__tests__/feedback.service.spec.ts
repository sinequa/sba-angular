import { EMPTY } from 'rxjs';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AppService } from '@sinequa/core/app-utils';
import { IntlService, LOCALES_CONFIG } from '@sinequa/core/intl';
import { MODAL_CONFIRM, MODAL_PROMPT, ModalService } from '@sinequa/core/modal';
import { MODAL_LOGIN } from '@sinequa/core/login';
import { NotificationsService } from '@sinequa/core/notification';
import { AuditWebService, START_CONFIG } from '@sinequa/core/web-services';

import { FeedbackService } from '../feedback';
import { AppLocalesConfig } from './mocks/app.locales.config';
import { startConfig } from './mocks/start.config';

describe('FeedbackService', () => {
    let service: FeedbackService;
    let auditService: AuditWebService;

    beforeEach(() => {
        const IntlServiceFactory = () => ({ parseDate: () => {} });

        TestBed.configureTestingModule({
            providers: [
                FeedbackService,
                AppService,
                AuditWebService,
                ModalService,
                NotificationsService,
                { provide: START_CONFIG, useValue: startConfig },
                { provide: MODAL_LOGIN, useValue: 'MODAL_LOGIN' },
                { provide: MODAL_CONFIRM, useValue: 'MODAL_CONFIRM' },
                { provide: MODAL_PROMPT, useValue: 'MODAL_PROMPT' },
                { provide: IntlService, useFactory: IntlServiceFactory },
                { provide: LOCALES_CONFIG, useClass: AppLocalesConfig },
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
            ]
        });

        service = TestBed.inject(FeedbackService);
        auditService = TestBed.inject(AuditWebService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('sendUserFeedback — XSS sanitization (ES-30919)', () => {
        let spyNotify: jasmine.Spy;

        beforeEach(() => {
            spyNotify = spyOn(auditService, 'notify').and.returnValue(EMPTY);
        });

        it('should send plain text unchanged', () => {
            service.sendUserFeedback('content', 'Great search results!', false);

            const event = spyNotify.calls.mostRecent().args[0][0];
            expect(event.detail.detail).toBe('Great search results!');
        });

        it('should encode < and > to prevent HTML injection', () => {
            service.sendUserFeedback('content', '<script>alert("xss")</script>', false);

            const event = spyNotify.calls.mostRecent().args[0][0];
            expect(event.detail.detail).toBe('&lt;script&gt;alert("xss")&lt;/script&gt;');
        });

        it('should neutralize the MBDA attack payload (hidden form injection)', () => {
            const payload = `<form action="https://search.example.com/form?action=save" method="POST">` +
                `<input type="hidden" name="datatype" value="domain">` +
                `</form>`;

            service.sendUserFeedback('other', payload, false);

            const event = spyNotify.calls.mostRecent().args[0][0];
            expect(event.detail.detail).not.toContain('<form');
            expect(event.detail.detail).not.toContain('<input');
            expect(event.detail.detail).toContain('&lt;form');
            expect(event.detail.detail).toContain('&lt;input');
        });

        it('should neutralize img onerror XSS vector', () => {
            service.sendUserFeedback('ui', '<img src=x onerror=alert(1)>', false);

            const event = spyNotify.calls.mostRecent().args[0][0];
            expect(event.detail.detail).toBe('&lt;img src=x onerror=alert(1)&gt;');
        });

        it('should preserve special characters that are not HTML tags', () => {
            service.sendUserFeedback('lang', 'Price is 5 & 10 "quoted" value', false);

            const event = spyNotify.calls.mostRecent().args[0][0];
            expect(event.detail.detail).toBe('Price is 5 & 10 "quoted" value');
        });

        it('should call auditService.notify with the correct event type', () => {
            service.sendUserFeedback('content', 'test message', false);

            expect(spyNotify).toHaveBeenCalledTimes(1);
            const event = spyNotify.calls.mostRecent().args[0][0];
            expect(event.type).toBe('UserFeedback_UserFeedback');
            expect(event.detail.message).toBe('content');
        });
    });
});
