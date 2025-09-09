export default (filename: string, blob: Blob): void => {
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);

    // Use special ms version if available to get it working on Edge.
    const navAny = navigator as Navigator & { msSaveOrOpenBlob?: (blob: Blob, fileName?: string) => boolean };
    if (navAny.msSaveOrOpenBlob) {
        navAny.msSaveOrOpenBlob(blob, filename);
        return;
    }

    if ('download' in HTMLAnchorElement.prototype) {
        const url = window.URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = filename;
        downloadLink.type = blob.type;
        downloadLink.click();
        // remove the link after a timeout to prevent a crash on iOS 13 Safari
        window.setTimeout(() => {
            document.body.removeChild(downloadLink);
            window.URL.revokeObjectURL(url);
        }, 1000);
    } else {
        // iOS 12 Safari, open a new page and set href to data-uri
        let popup = window.open('', '_blank');
        const reader = new FileReader();
        reader.onloadend = function () {
            if (popup && typeof reader.result === 'string') {
                popup.location.href = reader.result;
            }
            popup = null;
        };
        reader.readAsDataURL(blob);
    }

};
