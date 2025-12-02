export default interface Notification {
    uuid: string;
    moduleName: string;
    moduleRecordUUID: string;
    type: string;
    title: string;
    message: string;
    source: string;
    active: boolean;
    status: string;
    readedAt?: string | null;
    createdAt?: string;
    deletedAt?: string | null;
}