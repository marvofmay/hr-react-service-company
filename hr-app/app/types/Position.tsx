export default interface Position {
    uuid: string;
    name: string;
    description: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}
