import jpegThumbnail from './jpeg-thumbnail';

const spritePayload = (id: string, vm: any) => {
    const target = vm.runtime.getTargetById(id);
    if (!target) return null;

    return vm.exportSprite(
        id,
        'base64'
    ).then((zippedSprite: string) => {
        const payload = {
            type: 'sprite',
            name: target.sprite.name,
            mime: 'application/zip',
            body: zippedSprite,
            // Filled in below
            thumbnail: ''
        };

        const costumeDataUrl = target.sprite.costumes[target.currentCostume].asset.encodeDataURI();

        return jpegThumbnail(costumeDataUrl).then(thumbnail => {
            payload.thumbnail = thumbnail.replace('data:image/jpeg;base64,', '');
            return payload;
        });
    });
};

export default spritePayload;
