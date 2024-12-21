export default interface Industry {
    uuid: string;
    name: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string | null;
    deletedAt?: string | null;
}