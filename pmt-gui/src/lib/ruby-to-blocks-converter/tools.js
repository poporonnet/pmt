/* global Opal */
import _ from 'lodash';

const ToolsConverter = {
    onSend: function (
        // eslint-disable-next-line no-unused-vars
        receiver, name, args, rubyBlockArgs, rubyBlock, node
    ) {
        let block;
        if ((this._isSelf(receiver) || receiver === Opal.nil) && !rubyBlock) {
            switch (name) {
            case 'puts':
                if (args.length === 1 && this._isNumberOrStringOrBlock(args[0])) {
                    block = this.createBlock('tools_puts', 'statement');
                    const textArg = this._isNumber(args[0]) ? args[0].toString() : args[0];
                    this._addTextInput(block, 'TEXT', textArg, 'test');
                    return block;
                }
                break;
            }
        }
    }
};


export default ToolsConverter;
