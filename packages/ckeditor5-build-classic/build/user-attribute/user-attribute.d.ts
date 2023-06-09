import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import UserAttributeUI from './user-attribute-ui';
export default class UserAttribute extends Plugin {
    static get requires(): (typeof UserAttributeUI)[];
}
