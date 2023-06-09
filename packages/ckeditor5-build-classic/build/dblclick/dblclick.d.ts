import { DomEventObserver } from '@ckeditor/ckeditor5-engine';
export declare class DoubleClickObserver extends DomEventObserver<'dblclick'> {
    readonly domEventType = "dblclick";
    onDomEvent(domEvent: MouseEvent): void;
}
