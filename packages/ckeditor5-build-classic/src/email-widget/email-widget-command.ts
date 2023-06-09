import Command from '@ckeditor/ckeditor5-core/src/command';
import type { Element } from 'ckeditor5/src/engine';

export default class EmailWidgetCommand extends Command {

    public override execute( {value}:{value:any} ) {
        // Handled in dropdownView in UI
        return;
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
