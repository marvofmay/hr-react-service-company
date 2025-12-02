import Department from '../types/Department';

const departments: Department[] = [
    {
        uuid: '1',
        company: {
            uuid: '1',
            name: 'Tech Innovators Inc.',
        },
        departmentSuperior: {
            uuid: null,
            name: null,
        },
        name: 'Department 1',
        description: 'Department 1 ...',
        active: true,
        address: {
            country: "Polska",
            city: "Warszawa",
            postcode: "11-222",
            street: "Wiejska 4b/12"
        },
        phone: '123-123-123',
        email: 'example@email.com',
        web: 'https://example.com',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
    },
    {
        uuid: '2',
        company: {
            uuid: '1',
            name: 'Tech Innovators Inc.',
        },
        departmentSuperior: {
            uuid: null,
            name: null,
        },
        name: 'Department 2',
        description: 'Department 2 ...',
        active: true,
        address: {
            country: "Polska",
            city: "Gdańsk",
            postcode: "12-123",
            street: "Cich 4/14"
        },
        phone: '123-123-123',
        email: 'example@email.com',
        web: 'https://example.com',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
    },
    {
        uuid: '3',
        company: {
            uuid: '1',
            name: 'Tech Innovators Inc.',
        },
        departmentSuperior: {
            uuid: '2',
            name: 'Department 2',
        },
        name: 'Department 3',
        description: 'Department 3 ...',
        active: true,
        address: {
            country: "Polska",
            city: "Gdynia",
            postcode: "11-333",
            street: "Stolarska 14b/3"
        },
        phone: '123-123-123',
        email: 'example@email.com',
        web: 'https://example.com',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
    },
];

export default departments;
