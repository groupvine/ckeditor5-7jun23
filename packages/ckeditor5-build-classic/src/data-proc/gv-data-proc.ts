import { Plugin, type Editor } from 'ckeditor5/src/core';
import { HtmlDataProcessor, UpcastWriter, type ViewDocumentFragment } from 'ckeditor5/src/engine';

import { convertMetaImgsToView } from '../lib';

export default class GVDataProcessor extends HtmlDataProcessor {

    private _dbgLevel:number;

    constructor(editor:Editor) {
        super(editor.data.viewDocument);
        this._dbgLevel = editor.config.get('debugLevel') as number;
    }

    public override toData( viewFragment:ViewDocumentFragment ) : string {
        if (this._dbgLevel > 5) {
            console.log("DataProcessor.toData:", viewFragment.toString());
        }

        return super.toData(viewFragment);
    }

    public override toView( data:string ) : ViewDocumentFragment {
        // Convert metaimg tags to tags like <span
        // class="gv-metatag">... </span> to avoid CKEditor5 core
        // conversions from changing <img> tags to <figure><img>...

        if (this._dbgLevel > 5) {
            console.log("DataProcessor.toView pre:", data);
        }

        let newData = convertMetaImgsToView(data, {debugLevel : this._dbgLevel});

        //
        // Now use original HTMLDataProcessor's toView() 
        //

        if (this._dbgLevel > 5) {
            if (newData) {
                console.log("DataProcessor.toView post:", newData.toString());
            } else {
                console.log("DataProcessor.toView post: null!?");
            }
        }

        let viewData = super.toView(newData);

        if (this._dbgLevel > 5) {
            if (viewData) {
                console.log("DataProcessor.toView done:", viewData.toString());
            } else {
                console.log("DataProcessor.toView done: null!?");
            }
        }

        return viewData;
    }
}
