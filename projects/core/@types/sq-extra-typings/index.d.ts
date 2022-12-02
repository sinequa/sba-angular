interface HTMLElement {
    scrollIntoViewIfNeeded(center: boolean);
}

interface Navigator {
    msSaveOrOpenBlob: (Blob: Blob | string, filename: string) => void;
}