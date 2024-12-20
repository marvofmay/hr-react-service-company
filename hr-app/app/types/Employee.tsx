import Address from "./Address";
import ContractType from "./ContractType";
import Position from "./Position";
import Role from "./Role";

export default interface Employee {
    uuid: string;
    externalUUID?: string | null;
    company: {
        uuid: string;
        name: string;
    };
    department: {
        uuid: string;
        name: string;
    };
    employeeSuperior: {
        uuid: string | null;
        firstName: string | null;
        lastName: string | null;
    }
    firstName: string;
    lastName: string;
    pesel: string;
    email: string;
    phone: string[];
    employmentFrom: string;
    employmentTo: string | null;
    position: Position;
    contractType: ContractType;
    role: Role;
    active: boolean;
    address: Address;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
}
