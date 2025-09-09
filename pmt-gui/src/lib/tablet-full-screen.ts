import bowser from 'bowser';

/**
 * Helper method to request full screen in the browser when on a tablet.
 */
export default function (): void {
    if (bowser.tablet) {
        const docEl = document.documentElement as any;
        if ((bowser.webkit || (bowser as any).blink) && docEl.webkitRequestFullScreen) {
            docEl.webkitRequestFullScreen();
        }
        if ((bowser as any).gecko && docEl.mozRequestFullScreen) {
            docEl.mozRequestFullScreen();
        }
    }
}
