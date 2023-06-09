import Command from '@ckeditor/ckeditor5-core/src/command';
import type { Element } from 'ckeditor5/src/engine';

export default class InputAttributeCommand extends Command {

    public override execute( {value}:{value:any} ) {
        const editor = this.editor;

        editor.model.change( writer => {
            // Create a <gv-input-attribute> elment with name "type" attribute...
            const inputAtt = writer.createElement( 'gv-input-attribute', { type: value.abbrev } );

            // ... and insert it into the document.
            editor.model.insertContent( inputAtt );

            // Put the selection after the inserted element.
            writer.setSelection( inputAtt, 'after' );
        } );
    }

    public override refresh() : void {
        const model = this.editor.model;
        const selection = model.document.selection;

        if (selection.focus != null) {
            this.isEnabled = model.schema.checkChild( selection.focus.parent as Element,
                                                      'gv-input-attribute' );
        } else {
            this.isEnabled = false;
        }
    }
}
