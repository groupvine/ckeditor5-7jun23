// see: https://github.com/ckeditor/ckeditor5/issues/2077

import { DomEventObserver } from '@ckeditor/ckeditor5-engine';

export class DoubleClickObserver extends DomEventObserver<'dblclick'> {
    public readonly domEventType = 'dblclick';

    public override onDomEvent( domEvent : MouseEvent ) : void {
	this.fire( domEvent.type, domEvent );
    }
}
