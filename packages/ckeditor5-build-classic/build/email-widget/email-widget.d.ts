import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import EmailWidgetUI from './email-widget-ui';
export default class EmailWidget extends Plugin {
    static get requires(): (typeof EmailWidgetUI)[];
}
