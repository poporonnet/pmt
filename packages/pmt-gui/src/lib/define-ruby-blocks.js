/**
 * Define Ruby blocks
 * @param {ScratchBlocks} ScratchBlocks target to define Ruby blocks.
 * @return {ScratchBlocks} ScratchBlocks defined ScratchBlocks.
 */
export default function (ScratchBlocks) {
    const name = 'ruby';
    if (ScratchBlocks.Categories.hasOwnProperty(name)) {
        return ScratchBlocks;
    }
    ScratchBlocks.Categories[name] = name;
    ScratchBlocks.Colours[name] = {
        primary: '#CC0043',
        secondary: '#DB4D7B',
        tertiary: '#7A0028'
    };
    ScratchBlocks.Extensions.register(
        `colours_${name}`,
        ScratchBlocks.ScratchBlocks.VerticalExtensions.colourHelper(name)
    );

    ScratchBlocks.Blocks.ruby_statement = {
        init: function () {
            this.jsonInit({
                type: 'ruby_statement',
                message0: '%1',
                args0: [
                    {
                        type: 'input_value',
                        name: 'STATEMENT'
                    }
                ],
                category: ScratchBlocks.Categories.ruby,
                extensions: ['colours_ruby', 'shape_statement']
            });
        }
    };

    ScratchBlocks.Blocks.ruby_statement_with_block = {
        init: function () {
            this.jsonInit({
                type: 'ruby_statement_with_block',
                message0: '%1 do %2',
                message1: '%1',
                message2: 'end',
                args0: [
                    {
                        type: 'input_value',
                        name: 'STATEMENT'
                    },
                    {
                        type: 'input_value',
                        name: 'ARGS'
                    }
                ],
                args1: [
                    {
                        type: 'input_statement',
                        name: 'SUBSTACK'
                    }
                ],
                category: ScratchBlocks.Categories.ruby,
                extensions: ['colours_ruby', 'shape_statement']
            });
        }
    };

    ScratchBlocks.Blocks.ruby_expression = {
        init: function () {
            this.jsonInit({
                type: 'ruby_expression',
                message0: '%1',
                args0: [
                    {
                        type: 'input_value',
                        name: 'EXPRESSION'
                    }
                ],
                category: ScratchBlocks.Categories.ruby,
                extensions: ['colours_ruby', 'output_boolean']
            });
        }
    };

    ScratchBlocks.Blocks.ruby_range = {
        init: function () {
            this.jsonInit({
                type: 'ruby_range',
                message0: '%1..%2',
                args0: [
                    {
                        type: 'input_value',
                        name: 'FROM'
                    },
                    {
                        type: 'input_value',
                        name: 'TO'
                    }
                ],
                category: ScratchBlocks.Categories.ruby,
                extensions: ['colours_ruby', 'output_boolean']
            });
        }
    };

    ScratchBlocks.Blocks.ruby_exclude_range = {
        init: function () {
            this.jsonInit({
                type: 'ruby_exclude_range',
                message0: '%1...%2',
                args0: [
                    {
                        type: 'input_value',
                        name: 'FROM'
                    },
                    {
                        type: 'input_value',
                        name: 'TO'
                    }
                ],
                category: ScratchBlocks.Categories.ruby,
                extensions: ['colours_ruby', 'output_boolean']
            });
        }
    };

    return ScratchBlocks;
}
