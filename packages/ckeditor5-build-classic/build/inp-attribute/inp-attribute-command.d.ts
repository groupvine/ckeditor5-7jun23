import Command from '@ckeditor/ckeditor5-core/src/command';
export default class InputAttributeCommand extends Command {
    execute({ value }: {
        value: any;
    }): void;
    refresh(): void;
}
