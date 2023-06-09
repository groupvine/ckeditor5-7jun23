import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import EmailWidgetCommand from './email-widget-command';

export default class EmailWidgetEditing extends Plugin {
    static get requires() {
        return [ Widget ];
    }

    init() {
        // console.log( 'EmailWidgetEditing#init() got called' );
        this._defineSchema();
        // this._defineConverters();

        this.editor.commands.add( 'gv-email-widget', new EmailWidgetCommand( this.editor ) );

        this.editor.config.define( 'emailWidget', {
            canAddWidget : true,
            types: [
                { label : 'Comments',     type : 'ew/comments' },
                { label : 'Simple RSVP',  type : 'ew/rsvp'  },
                { label : 'How Many?',    type : 'ew/howmany'     }
            ]
        } );
    }

    _defineSchema() {
        // Already defined in user-attribute (using the same gv-metatag schema)
    }
}

