export default interface Permission {
    uuid: string;
    name: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string | null;
    deletedAt?: string | null;
}