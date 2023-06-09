import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import './theme/inp-attribute.css';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
export default class InputAttributeEditing extends Plugin {
    static get requires(): (typeof Widget)[];
    init(): void;
    _defineSchema(): void;
    _defineConverters(): void;
}
