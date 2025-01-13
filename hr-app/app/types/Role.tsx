import Permission from "./Permission";

export default interface Role {
    uuid: string;
    name: string;
    description?: string;
    permissions?: Permission[];
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
}