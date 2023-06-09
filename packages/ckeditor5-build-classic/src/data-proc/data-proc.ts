import GVDataProcessor from './gv-data-proc';

import { Plugin, type Editor } from 'ckeditor5/src/core';

// A plugin which will replace the default DP with the GVDataProcessor
export default class GVDataProcessorPlugin extends Plugin {
    constructor( editor:Editor ) {
        super( editor );

        editor.data.processor = new GVDataProcessor(editor);
    }
}
