import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { type Item, type DowncastWriter, type ViewNode } from 'ckeditor5/src/engine';

import UserAttributeCommand from './user-attribute-command';

// import './theme/user-attribute.css';

import { dateVer }             from '../lib';

import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';


export default class UserAttributeEditing extends Plugin {
    static get requires() {
        return [ Widget ];
    }

    init() {
        // console.log( 'UserAttributeEditing#init() got called' );
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'gv-metatag', new UserAttributeCommand( this.editor ) );

        this.editor.config.define( 'userAttribute', {
            types: [
                { label : 'First Name', type : 'attribute/firstname' },
                { label : 'Last Name',  type : 'attribute/lastname'  },
                { label : 'Email',      type : 'attribute/email'     }
            ],
            metaImgBaseUrl: null    // null default, so this is required
        } );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'gv-metatag', {
            // Allow wherever text is allowed plus in tableCells
            // allowIn: 'tableCell',
            allowWhere: '$text',

            // The user-attribute will act as an inline node:
            isInline: true,

            // The inline widget is self-contained so it cannot be split by the caret and can be selected:
            isObject: true,

            // The user-attribute can have many types: firstname, lastname, email, id, etc.
            allowAttributes: [ 'type', 'ewId', 'ver', 'accountId' ]
        } );
    }

    _defineConverters() {
        const conversion = this.editor.conversion;
        const metaImgBaseUrl = this.editor.config.get('userAttribute.metaImgBaseUrl') as string;

        conversion.for( 'upcast' ).elementToElement( {
            // be sure it converts ahead of regular images
            converterPriority: 'highest',
            view: {
                name: 'span',
                classes: [ 'gv-metatag' ]
            },
            model: ( viewElement, {writer: modelWriter} ) => {
                // Note that this is called after the custom GV data processor's 
                // toView() has run

                // console.log( 'upcast conversion', 
                //   viewElement.getAttribute('data-ewid'), 
                //   viewElement.getAttribute('data-account') );

                // Extract the "type" from the src URL
                const child:ViewNode|undefined = viewElement.getChild(0);

                if (child == null) {
                    return null;
                }

                //
                // Hack ... may want to cast to TextProxy to access .data ??
                //
                let textChild = child as any;
                
                if (textChild['data'] == null) {
                    return null;
                }

                const attType = (textChild['data'] as string).trim();

                let data:any = {
                    type : attType
                };

                // Check for supported data attrbutes
                let ewId = viewElement.getAttribute('data-ewid');
                if (ewId != null) {
                    data['ewId'] = ewId;
                    data['ver']  = dateVer();
                    data['accountId'] = viewElement.getAttribute('data-account');
                }

                // console.log("Upcast: " + attType);
                return modelWriter.createElement( 'gv-metatag', data );
            }
        } );

        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'gv-metatag',
            view: ( modelItem, {writer: viewWriter} ) => {
                const widgetElement = createUserAttributeView( modelItem, viewWriter );

                // Enable widget handling on a gv-metatag element inside the editing view.
                return toWidget( widgetElement, viewWriter );
            }
        } ).add( dispatcher => dispatcher.on( 'attribute:ver', handleVerChange ) );

        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'gv-metatag',
            view: ( modelItem, {writer: viewWriter} ) => {
                return createUserAttributeView( modelItem, viewWriter );
            }
        } ).add( dispatcher => dispatcher.on( 'attribute:ver', handleVerChange ) );

        // Helper method for both downcast converters.
        function createUserAttributeView( modelItem:Item, viewWriter:DowncastWriter ) {
            const attType = modelItem.getAttribute( 'type' );
            const attEwId = modelItem.getAttribute( 'ewId' );
            const attVer  = modelItem.getAttribute( 'ver' );
            const attAccId = modelItem.getAttribute( 'accountId' );

            // console.log( 'createuserAttributeView', attType, attEwId, attVer, attAccId);

            let src = metaImgBaseUrl + '/' + attType;
            if (attEwId != null) {
                src += "?ewid=" + attEwId;
                if (attAccId) {
                    src += "&account=" + attAccId;
                }
                src += "&_=" + attVer;   // cache-buster, for late
            }

            const userAttributeView = viewWriter.createContainerElement( 'img', {src : src});
            // console.log("Downcast: " + attType);

            return userAttributeView;
        }

        function handleVerChange ( evt:any, data:any, conversionApi:any ) {
            // no-op
            return;
            
            /*
            // see: https://stackoverflow.com/questions/51319311/refreshing-a-ckeditor5-widget-upon-model-changes
            let writer = conversionApi.writer;
            
            const myModelElement = data.item;

            // Mark element as consumed by conversion.
            conversionApi.consumable.consume( data.item, evt.name );

            // Get mapped view element to update.
            const viewElement    = conversionApi.mapper.toViewElement( myModelElement );
            const newViewElement = createUserAttributeView( myModelElement, {writer: writer} ); // update src

            // Replace view element

            let range  = data.range;
            let pos    = data.range.start;

            writer.remove(range);
            writer.insert(pos, newViewElement);
            */
        }
    }
}
