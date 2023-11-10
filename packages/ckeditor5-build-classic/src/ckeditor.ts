/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import { ClassicEditor as ClassicEditorBase } from '@ckeditor/ckeditor5-editor-classic';

// import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
// import { CKFinder } from '@ckeditor/ckeditor5-ckfinder';
// import { EasyImage } from '@ckeditor/ckeditor5-easy-image';
// import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace';

import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Italic, Underline } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload, ImageResize } from '@ckeditor/ckeditor5-image';
import { Link, LinkImage } from '@ckeditor/ckeditor5-link';
import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent';
import { List } from '@ckeditor/ckeditor5-list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { Table, TableToolbar, TableCaption, TableProperties, TableCellProperties, TableColumnResize } from '@ckeditor/ckeditor5-table';

import { TextTransformation } from '@ckeditor/ckeditor5-typing';
// import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices';

import { Font } from '@ckeditor/ckeditor5-font';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { RemoveFormat } from '@ckeditor/ckeditor5-remove-format';
import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';

import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters';
// import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials';
// import SpecialCharactersMathematical from '@ckeditor/ckeditor5-special-characters/src/specialcharactersmathematical';
// import SpecialCharactersText from '@ckeditor/ckeditor5-special-characters/src/specialcharacterstext';
// import SpecialCharactersArrows from '@ckeditor/ckeditor5-special-characters/src/specialcharactersarrows';
import {SpecialCharactersGVArrows, 
        SpecialCharactersGVEmojis, 
        SpecialCharactersGVMath, 
        SpecialCharactersGVText } from './specialchars';

// Source / HTML support plugins
import { GeneralHtmlSupport } from '@ckeditor/ckeditor5-html-support';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';
import { HtmlEmbed } from '@ckeditor/ckeditor5-html-embed';

//
// Custom GroupVine plugins
//

import GVDataProcessorPlugin from './data-proc/data-proc';
import GVClipboardPlugin from './clipboard/clipboard';
import UserAttribute from './user-attribute/user-attribute';
import InputAttribute from './inp-attribute/inp-attribute';
import EmailWidget from './email-widget/email-widget';


export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
        Essentials,
        // UploadAdapter,
        Autoformat,
        Bold,
        Italic,
        Underline,
        BlockQuote,
        // CKFinder,
        // CloudServices,
        // EasyImage,
        Heading,
        // FindAndReplace,
        Image,
        ImageCaption,
        ImageToolbar,
        ImageUpload,
        ImageResize,
        ImageStyle, 
        LinkImage,

        Indent,
        IndentBlock,
        Link,
        List,
        // MediaEmbed,
        Paragraph,
        PasteFromOffice,
        Table,
        TableToolbar,
        TableCaption,
        TableProperties,
        TableCellProperties,
        TableColumnResize,
        Font,

        SimpleUploadAdapter,
        Alignment,
        RemoveFormat,

        // HTML support
        GeneralHtmlSupport,
        SourceEditing,
        HtmlEmbed,

        // GroupVine plugins
        GVDataProcessorPlugin,
        GVClipboardPlugin,
        UserAttribute,
        InputAttribute,
        EmailWidget,

        SpecialCharacters, 
        // SpecialCharactersEssentials, 
        SpecialCharactersGVEmojis,
        SpecialCharactersGVArrows,
        SpecialCharactersGVText,
        SpecialCharactersGVMath,

        TextTransformation
];

// Editor configuration.
ClassicEditor.defaultConfig = {
        fontSize: {
            options: [
                8,
                10,
                12,
                'default',
                16,
                18,
                20,
                24,
                28,
                32,
                40,
                50
            ]
        },

        // For the General HTML Support plugin
        // Should at least support <style>, so we can inject styling at the start
        htmlSupport: {
            allow: [
                {
                    // Allow all all elements except for those on this list
                    name: /^(?!html$|meta$|link$|frame$|iframe$|script$|embed$)/,
                    // Allow all attributes except for those starting with "on..."
                    attributes: /^(?!on.*)/,
                    classes: true,
                    styles: true
                }
            ]
        },

        link: {
            defaultProtocol: 'http://'
        },

        htmlEmbed: {
            showPreviews: true,
            sanitizeHtml: (inputHtml:string) => {
                // Overwrite when including CKEditor to use sanitizer!
                return {
                    hasChanged: false,
                    html: inputHtml
                };
            }
        },

        toolbar: {
                // shouldNotGroupWhenFull : true,

                items: [
                        'heading',
                        'fontSize', 
                        'fontFamily',
                        'bold',
                        'italic',
                        'underline',
                        '|',
                        'bulletedList',
                        'numberedList',
                        'alignment',
                        '|',
                        'gv-user-attribute',
                        'gv-email-widget',
                        'gv-input-attribute',
                        'fontColor', 'fontBackgroundColor',
                        'insertTable',
                        '|',
                        'outdent',
                        'blockQuote',
                        '|',
                        'link',
                        'imageUpload',
                        // 'mediaEmbed',
                        'specialCharacters',
                        'removeformat',
                        'htmlEmbed',
                        'sourceEditing',
                        '|',
                        // 'findAndReplace',
                        'undo',
                        'redo'
                ]
        },

        image: {
            styles: {
                options: [
                    'alignLeft', 'alignCenter', 'alignRight'
                ]
            },

            // Configure the available image resize options.
            resizeOptions: [
                {
                    name: 'imageResize:original',
                    label: 'Original',
                    value: null
                },
                {
                    name: 'imageResize:50',
                    label: '50%',
                    value: '50'
                },
                {
                    name: 'imageResize:75',
                    label: '75%',
                    value: '75'
                }
            ],

            toolbar: [
                'imageStyle:alignLeft', 
                'imageStyle:alignCenter', 
                'imageStyle:alignRight',
                '|',
                'imageResize',
                '|',
                'linkImage',
                '|',
                'toggleImageCaption',
                'imageTextAlternative'
            ]
        },

        table: {
                contentToolbar: [
                        'tableColumn',
                        'tableRow',
                        'mergeTableCells',
                        'toggleTableCaption',
                        'tableProperties',
                        'tableCellProperties'
                ]
        },

        heading: {
            options: [
                // view.name and view.classes will apply to generated HTML; class will apply to heading in Editor dropdown
                { model: 'paragraph', title: 'Normal', class: 'ck-heading_paragraph' },

                { model: 'heading1', view: {name : 'h1', classes : 'gv-h1'}, 
                  title: 'Title', class: 'ck-heading_heading1 gv-heading1' },

                { model: 'heading2', view: {name : 'h2', classes : 'gv-h2'}, 
                  title: 'Section', class: 'ck-heading_heading2 gv-heading2' },

                { model: 'heading3', view: {name : 'h3', classes : 'gv-h3'}, 
                  title: 'Subsection', class: 'ck-heading_heading3 gv-heading3' }
            ]
        },

        fontFamily : {
            supportAllValues: true,
            options: [
                'default',
                'Arial, Helvetica, sans-serif',
                'Arial Black, Helvetica, sans-serif',
                'Courier New, Courier, monospace',
                'Comic Sans MS, Helvetica, sans-serif',
                'Georgia, serif',
                'Impact, Arial Black, Arial, sans-serif',
                'Lucida Sans Unicode, Lucida Grande, sans-serif',
                'Tahoma, Geneva, sans-serif',
                'Times New Roman, Times, serif',
                'Trebuchet MS, Helvetica, sans-serif',
                'Ubuntu, Arial, sans-serif',
                'Ubuntu Mono, Courier New, Courier, monospace',
                'Verdana, Geneva, sans-serif'
            ]
        },


        // This value must be kept in sync with the language defined in webpack.config.js.
        language: 'en'
};
