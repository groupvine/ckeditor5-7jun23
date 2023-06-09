import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { type Command } from 'ckeditor5/src/core';
import { addListToDropdown, createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import { type ListDropdownButtonDefinition } from 'ckeditor5/src/ui';

import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import Model from '@ckeditor/ckeditor5-ui/src/model';


export default class InputAttributeUI extends Plugin {

    init() {
        const editor   = this.editor;
        const t = editor.t;   // translator, used in t() calls below
        const inputAttTypes = this.editor.config.get('inputAttribute.types') as Array<any>;

        // The "input-attribute" dropdown must be registered among the UI components of the editor
        // to be displayed in the toolbar.
        editor.ui.componentFactory.add( 'gv-input-attribute', locale => {
            const dropdownView = createDropdown( locale );

            // Populate the list in the dropdown with items.
            addListToDropdown( dropdownView, getDropdownItemsDefinitions( inputAttTypes ) );

            dropdownView.buttonView.set( {
                // The t() function helps localize the editor. All strings enclosed in t() can be
                // translated and change when the language of the editor changes.
                label: t( 'Input' ),
                tooltip: "Insert input field",
                withText: true
            } );

            // Execute the command when the dropdown item is clicked (executed).
            this.listenTo( dropdownView, 'execute', evt => {
                let source = evt.source as any;
                editor.execute( 'gv-input-attribute', { value: source.commandParam } );
                editor.editing.view.focus();
            } );

            //
            // Disable when in source-editing mode or other modes where all other commands 
            // are being disabled
            //

            let command = this.editor.commands.get( 'gv-input-attribute' ) as Command;

            // Note that dropdownView.buttonView.isEnabled already bound to dropdownView.isEnabled 
            dropdownView.bind( 'isEnabled' ).to( command );  

            return dropdownView;
        } );
    }
}

function getDropdownItemsDefinitions( inputAttTypes:{title:string}[] ) {
    const itemDefinitions = new Collection<ListDropdownButtonDefinition>();
    let definition:ListDropdownButtonDefinition;
    
    let label;
    for ( const typeObj of inputAttTypes ) {
        label = typeObj.title;

        // Special handling for certain labels.
        // (Don't want to change the titles, since that affects
        // the attribute names wherever used, tho 'groups' and 'lists'
        // are pretty special in any case)

        if (label.toLowerCase() === 'group') {
            label = 'Select sub-groups';
        } else if (label.toLowerCase() === 'list') {
            label = 'Select lists';
        }

        const model = new Model( {
            commandParam: typeObj,
            label: label,
            withText: true
        } );

        // Add the item definition to the collection.
        itemDefinitions.add( { type: 'button', model } );
    }

    return itemDefinitions;
}
