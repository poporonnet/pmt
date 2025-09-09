import layout, {STAGE_DISPLAY_SCALES, STAGE_SIZE_MODES, STAGE_DISPLAY_SIZES} from '../lib/layout-constants';

/**
 * Shape of computed stage dimensions
 */
type StageDimensions = {
    height: number;
    width: number;
    scale: number;
    heightDefault: number;
    widthDefault: number;
};

const STAGE_DIMENSION_DEFAULTS = {
    // referencing css/units.css,
    // spacingBorderAdjustment = 2 * $full-screen-top-bottom-margin +
    //   2 * $full-screen-border-width
    fullScreenSpacingBorderAdjustment: 12,
    // referencing css/units.css,
    // menuHeightAdjustment = $stage-menu-height
    menuHeightAdjustment: 44
};

/**
 * Resolve the current GUI and browser state to an actual stage size enum value.
 * @param stageSizeMode - the state of the stage size toggle button.
 * @param isFullSize - true if the window is large enough for the large stage at its full size.
 * @return the stage size enum value we should use in this situation.
 */
const resolveStageSize = (stageSizeMode: string, isFullSize: boolean): string => {
    if (stageSizeMode === STAGE_SIZE_MODES.small) {
        return STAGE_DISPLAY_SIZES.small;
    }
    if (isFullSize) {
        return STAGE_DISPLAY_SIZES.large;
    }
    return STAGE_DISPLAY_SIZES.largeConstrained;
};

/**
 * Retrieve info used to determine the actual stage size based on the current GUI and browser state.
 * @param stageSize - the current fully-resolved stage size.
 * @param isFullScreen - true if full-screen mode is enabled.
 * @return an object describing the dimensions of the stage.
 */
const getStageDimensions = (stageSize: string, isFullScreen: boolean): StageDimensions => {
    const stageDimensions = {
        heightDefault: layout.standardStageHeight,
        widthDefault: layout.standardStageWidth,
        height: 0,
        width: 0,
        scale: 0
    } as StageDimensions;

    if (isFullScreen) {
        stageDimensions.height = window.innerHeight -
            STAGE_DIMENSION_DEFAULTS.menuHeightAdjustment -
            STAGE_DIMENSION_DEFAULTS.fullScreenSpacingBorderAdjustment;

        stageDimensions.width = stageDimensions.height + (stageDimensions.height / 3);

        if (stageDimensions.width > window.innerWidth) {
            stageDimensions.width = window.innerWidth;
            stageDimensions.height = stageDimensions.width * .75;
        }

        stageDimensions.scale = stageDimensions.width / stageDimensions.widthDefault;
    } else {
        stageDimensions.scale = STAGE_DISPLAY_SCALES[stageSize];
        stageDimensions.height = stageDimensions.scale * stageDimensions.heightDefault;
        stageDimensions.width = stageDimensions.scale * stageDimensions.widthDefault;
    }

    // Round off dimensions to prevent resampling/blurriness
    stageDimensions.height = Math.round(stageDimensions.height);
    stageDimensions.width = Math.round(stageDimensions.width);

    return stageDimensions;
};

/**
 * Take a pair of sizes for the stage (a target height and width and a default height and width),
 * calculate the ratio between them, and return a CSS transform to scale to that ratio.
 * @param sizeInfo An object containing dimensions of the target and default stage sizes.
 * @returns the CSS transform
 */
const stageSizeToTransform = (
    {width, height, widthDefault, heightDefault}:
    {width: number; height: number; widthDefault: number; heightDefault: number}
): {transform: string} | undefined => {
    const scaleX = width / widthDefault;
    const scaleY = height / heightDefault;
    if (scaleX === 1 && scaleY === 1) {
        // Do not set a transform if the scale is 1 because
        // it messes up `position: fixed` elements like the context menu.
        return undefined;
    }
    return {transform: `scale(${scaleX},${scaleY})`};
};

export {
    getStageDimensions,
    resolveStageSize,
    stageSizeToTransform
};
