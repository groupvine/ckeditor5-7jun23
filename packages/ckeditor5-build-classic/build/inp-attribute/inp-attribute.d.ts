import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import InputAttributeUI from './inp-attribute-ui';
export default class InputAttribute extends Plugin {
    static get requires(): (typeof InputAttributeUI)[];
}
