import User from "./User";

export type NotePriority = 'low' | 'medium' | 'high';

export default interface Note {
    uuid: string;
    title?: string;
    content: string,
    priority: NotePriority;
    user: User,
    createdAt: string;
    updatedAt?: string | null;
    deletedAt?: string | null;
}