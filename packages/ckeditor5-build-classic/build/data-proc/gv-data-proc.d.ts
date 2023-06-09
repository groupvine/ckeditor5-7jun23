import { type Editor } from 'ckeditor5/src/core';
import { HtmlDataProcessor, type ViewDocumentFragment } from 'ckeditor5/src/engine';
export default class GVDataProcessor extends HtmlDataProcessor {
    private _dbgLevel;
    constructor(editor: Editor);
    toData(viewFragment: ViewDocumentFragment): string;
    toView(data: string): ViewDocumentFragment;
}
