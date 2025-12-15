import Employee from "../types/Employee";

const userProfiles: Employee[] = [
    {
        uuid: '77eaa379-8f25-4de8-b899-84e518f9dbb2',
        externalUUID: '1257-323-12',
        company: {
            uuid: '1',
            name: 'Company 1'
        },
        department: {
            uuid: '1',
            name: 'Department 1'
        },
        employeeSuperior: {
            uuid: null,
            firstName: null,
            lastName: null,
        },
        position: {
            uuid: '1',
            name: 'Position 1'
        },
        contractType: {
            uuid: '1',
            name: 'Contract type 1'
        },
        address: {
            country: 'Polska',
            city: 'Gdańsk',
            postcode: '11-111',
            street: 'Cicha 2',
        },
        role: {
            uuid: '1',
            name: 'Role 1'
        },
        firstName: 'Emil',
        lastName: 'Johnson',
        pesel: '72022586569',
        email: 'emil.johnson@email.com',
        phone: ["333-222-111", "111-222-333"],
        employmentFrom: '2009-01-01',
        employmentTo: null,
        active: true,
        createdAt: '2024-06-11T15:30:45',
        updatedAt: '2024-12-17T07:30:00',
        deletedAt: null,
    },
];

export default userProfiles;