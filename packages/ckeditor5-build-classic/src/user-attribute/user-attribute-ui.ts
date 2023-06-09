import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { type Command } from 'ckeditor5/src/core';
import { addListToDropdown, createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import { type ListDropdownButtonDefinition } from 'ckeditor5/src/ui';

import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import Model from '@ckeditor/ckeditor5-ui/src/model';

import { isMobile } from '../lib';


export default class UserAttributeUI extends Plugin {

    init() {
        const editor   = this.editor;
        const t = editor.t;   // translator, used in t() calls below
        const userAttTypes = this.editor.config.get('userAttribute.types') as Array<any>;

        // The "user-attribute" dropdown must be registered among the UI components of the editor
        // to be displayed in the toolbar.
        editor.ui.componentFactory.add( 'gv-user-attribute', locale => {
            const dropdownView = createDropdown( locale );

            dropdownView.set('class', 'personalizeDropdown');

            // Populate the list in the dropdown with items.
            addListToDropdown( dropdownView, getDropdownItemsDefinitions( userAttTypes ) );
            let isMob = isMobile();

            dropdownView.buttonView.set( {
                // The t() function helps localize the editor. All strings enclosed in t() can be
                // translated and change when the language of the editor changes.
                label: (isMob ? t('A') : t('Attribute')),
                tooltip: "Insert member attribute or recipient-specific link",
                class: 'personalizeMenu',  // handled in styles.scss (isMob ? 'personalizeMenuMob' : 'personalizeMenu'),
                withText: true
            } );

            // Execute the command when the dropdown item is clicked (executed).
            this.listenTo( dropdownView, 'execute', evt => {
                let source = evt.source as any;
                editor.execute( 'gv-metatag', { value: source.commandParam } );
                editor.editing.view.focus();
            } );

            //
            // Disable when in source-editing mode or other modes where all other commands 
            // are being disabled
            //

            let command = this.editor.commands.get( 'gv-metatag' ) as Command;

            // Note that dropdownView.buttonView.isEnabled already bound to dropdownView.isEnabled 
            dropdownView.bind( 'isEnabled' ).to( command );  

            return dropdownView;
        } );
    }
}

function getDropdownItemsDefinitions( userAttTypes:{type:string, label:string}[] ) {
    const itemDefinitions = new Collection<ListDropdownButtonDefinition>();
    let definition:ListDropdownButtonDefinition;

    for ( const typeObj of userAttTypes ) {
        const model = new Model( {
            commandParam: typeObj.type,
            label: typeObj.label,
            withText: true
        } );

        // Add the item definition to the collection.
        itemDefinitions.add( { type : 'button', model } );
    }

    return itemDefinitions;
}
