import Papa from 'papaparse';

export default () => new Promise<string[][]>((resolve, reject) => {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', '.csv, .tsv, .txt'); // parser auto-detects delimiter
    fileInput.onchange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const file = target.files && target.files[0];
        if (!file) return;
        Papa.parse(file, {
            header: false,
            complete: results => {
                document.body.removeChild(fileInput);
                resolve(results.data as any);
            },
            error: err => {
                document.body.removeChild(fileInput);
                reject(err);
            }
        });
    };
    document.body.appendChild(fileInput);
    fileInput.click();
});
