/**
 * Utility to convert data URIs to blobs
 * Adapted from https://stackoverflow.com/questions/12168909/blob-from-dataurl
 */
export default function dataURItoBlob (dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], {type: mimeString});
    return blob;
}
