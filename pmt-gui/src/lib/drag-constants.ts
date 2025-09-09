type DragConstantKeys =
  | 'SOUND'
  | 'COSTUME'
  | 'SPRITE'
  | 'CODE'
  | 'BACKPACK_SOUND'
  | 'BACKPACK_COSTUME'
  | 'BACKPACK_SPRITE'
  | 'BACKPACK_CODE';

type DragConstants = Record<DragConstantKeys, DragConstantKeys>;

const DragConstants: DragConstants = {
    SOUND: 'SOUND',
    COSTUME: 'COSTUME',
    SPRITE: 'SPRITE',
    CODE: 'CODE',

    BACKPACK_SOUND: 'BACKPACK_SOUND',
    BACKPACK_COSTUME: 'BACKPACK_COSTUME',
    BACKPACK_SPRITE: 'BACKPACK_SPRITE',
    BACKPACK_CODE: 'BACKPACK_CODE'
};

export default DragConstants;
