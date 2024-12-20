export default interface Role {
    uuid: string;
    name: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
}
