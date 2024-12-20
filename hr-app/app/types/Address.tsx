export default interface Address {
    country: string,
    city: string,
    postcode: string,
    street: string,
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
}