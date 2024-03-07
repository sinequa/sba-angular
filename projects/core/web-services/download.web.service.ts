import { Observable } from 'rxjs';

import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Utils } from "@sinequa/core/base";

/**
 * A service to manage navigator downloads
 */
@Injectable({
    providedIn: "root"
})
export class DownloadWebService {

    /**
     * Subscribes to the given observable to trigger a download action on the navigator
     * when the observed object is ready.
     *
     * @param observable The observable to subscribe.
     * @param name The file name to save
     * @returns The observable for chaining.
     */
    public download(observable: Observable<HttpResponse<Blob>>, name?: string): Observable<HttpResponse<Blob>> {
        Utils.subscribe(
            observable,
            (response: HttpResponse<Blob>) => {
                const header = response.headers.get('content-disposition');
                const fileName = name || (header !== null ? header!.split('filename=')[1].replace('"', '').replace('"', '') : "");

                if (response.body === null) return response;
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    // For IE
                    window.navigator.msSaveOrOpenBlob(response.body, fileName);
                } else  {
                    const link = document.createElement('a');
                    document.body.appendChild(link);
                    const blobUrl = window.URL.createObjectURL(response.body);
                    link.href = blobUrl;
                    link.download = fileName;
                    link.click();
                    link.remove();
                    window.URL.revokeObjectURL(blobUrl);
                }

                return response;
            }
        );
        return observable;
    }
}
