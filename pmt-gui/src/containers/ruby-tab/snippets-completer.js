import BaseCompleter from './base-completer';

import ControlSnippets from './control-snippets.json';
import OperatorsSnippets from './operators-snippets.json';
import VariablesSnippets from './variables-snippets.json';
import ProcedureSnippets from './procedure-snippets.json';
import ToolsSnippets from './tools-snippets.json';

class SnippetsCompleter extends BaseCompleter {
    #completions = [];

    constructor () {
        super();

        const snippetsList = [
            ControlSnippets,
            OperatorsSnippets,
            VariablesSnippets,
            ProcedureSnippets,
            ToolsSnippets
        ];
        snippetsList.forEach(snippets => {
            for (const [caption, item] of Object.entries(snippets)) {
                item.caption = caption;
                item.type = 'snippet';
                this.#completions.push(item);
            }
        });
    }

    getCompletions (editor, session, pos, prefix, callback) {
        callback(null, this.#completions);
    }
}

export default SnippetsCompleter;
