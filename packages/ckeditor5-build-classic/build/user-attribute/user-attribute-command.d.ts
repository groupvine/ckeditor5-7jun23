import Command from '@ckeditor/ckeditor5-core/src/command';
export default class UserAttributeCommand extends Command {
    execute({ value, ewId, accountId }: {
        value: any;
        ewId: any;
        accountId: any;
    }): void;
    refresh(): void;
}
