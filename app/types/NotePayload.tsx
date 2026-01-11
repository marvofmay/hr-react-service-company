import { NotePriority } from "./NotePriority";

export default interface Note {
    uuid?: string | null;
    title?: string;
    content: string,
    priority: NotePriority;
}