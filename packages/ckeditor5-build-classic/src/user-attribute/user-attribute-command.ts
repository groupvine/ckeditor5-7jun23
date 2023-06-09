import Command from '@ckeditor/ckeditor5-core/src/command';
import type { Element } from 'ckeditor5/src/engine';

import { dateVer }             from '../lib';

export default class UserAttributeCommand extends Command {

    // This is shared with email-widgets code, so support ewId arg
    // (using EW2015 parameter destructuring syntax)

    public override execute( {value, ewId, accountId}:{value:any, ewId:any, accountId:any} ) {
        // console.log("UserAttributeCommand.execute:", value, ewId, accountId);

        const editor = this.editor;

        editor.model.change( writer => {
            // console.log( 'UserAttributeCommand.change' );

            // Create a <gv-metatag> elment with name "type" attribute...
            let atts:any = {type : value};
            if (ewId !== null) {
                atts['ewId'] = ewId;
                atts['ver']  = dateVer();
                atts['accountId'] = accountId;
            }
            const userAtt = writer.createElement( 'gv-metatag', atts );

            // ... and insert it into the document.
            editor.model.insertContent( userAtt );

            // Put the selection *after* the inserted element.
            writer.setSelection( userAtt, 'after' );  // was: 'on'

            // Add space, to avoid problem where the gv-metatag is deleted for some
            // or unable to type after entering something like:
            //    Hello <attribute>
            // (Some text, a space, then insert attribute, then try to type)
            // Hopefully, this gets fixed with CKEditor upgrade!

            writer.insertText( ' ', userAtt, 'after' );

            // Move selection back to just after the attribute
            // writer.setSelection( userAtt, 'after' );

            /*
            // From: https://stackoverflow.com/questions/54162496/ckeditor5-insert-text-without-breaking-current-element
            const selection = editor.model.document.selection;
            const currentAttributes = selection.getAttributes();
            const insertPosition = selection.focus;

            writer.insertText( ' ', currentAttributes, insertPosition );
            */

        } );
    }

    public override refresh() : void {
        const model = this.editor.model;
        const selection = model.document.selection;

        if (selection.focus != null) {
            this.isEnabled = model.schema.checkChild( selection.focus.parent as Element,
                                                      'gv-metatag' );
        } else {
            this.isEnabled = false;
        }
        
    }
}
