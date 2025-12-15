import Department from '../types/Department';

const departments: Department[] = [
    {
        uuid: '1',
        company: {
            uuid: '1',
            fullName: 'Tech Innovators Inc.'
        },
        parentDepartment: {
            uuid: null,
            name: null,
        },
        name: 'Department 1',
        internalCode: 'xxx',
        description: 'Department 1 ...',
        active: true,
        address: {
            country: "Polska",
            city: "Warszawa",
            postcode: "11-222",
            street: "Wiejska 4b/12"
        },
        phones: ['123-123-123'],
        emails: ['example@email.com'],
        webs: ['https://example.com'],
        contacts: [{
            type: 'phone',
            data: "121212"
        }],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
    }
];

export default departments;
