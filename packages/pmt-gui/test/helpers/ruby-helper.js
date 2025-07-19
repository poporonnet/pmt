import bindAll from 'lodash.bindall';
import {EDIT_MENU_XPATH} from './menu-xpaths';

class RubyHelper {
    constructor (seleniumHelper) {
        bindAll(this, [
            'fillInRubyProgram',
            'currentRubyProgram',
            'expectInterconvertBetweenCodeAndRuby'
        ]);

        this.seleniumHelper = seleniumHelper;
        this.clickText = seleniumHelper.clickText;
        this.clickXpath = seleniumHelper.clickXpath;
    }

    get driver () {
        return this.seleniumHelper.driver;
    }

    currentRubyProgram () {
        return this.driver.executeScript(`return ace.edit('ruby-editor').getValue();`);
    }

    fillInRubyProgram (code) {
        code = code.replace(/\n/g, '\\n').replace(/'/g, "\\'");
        return this.driver.executeScript(`ace.edit('ruby-editor').setValue('${code}');`);
    }

    async expectInterconvertBetweenCodeAndRuby (code) {
        await this.clickText('Ruby', '*[@role="tab"]');
        await this.fillInRubyProgram(code);
        await this.clickText('Code', '*[@role="tab"]');
        await this.clickXpath(EDIT_MENU_XPATH);
        await this.clickText('Generate Ruby from Code');
        await this.clickText('Ruby', '*[@role="tab"]');
        expect(await this.currentRubyProgram()).toEqual(`${code}\n`);
    }
}

export default RubyHelper;
