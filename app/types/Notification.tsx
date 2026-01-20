export default interface Notification {
    uuid: string;
    receivedAt: string | null;
    readAt?: string | null;
    createdAt?: string;
    deletedAt?: string | null;
    message: {
        uuid: string;
        title: string;
        content: string;
        channelCode: 'intenal' | 'email' | 'sms';
        createdAt?: string;
        deletedAt?: string | null;
    }
}