import Role from '../types/Role';

const roles: Role[] = [
    {
        uuid: '1',
        name: 'guest',
        description: 'A user with limited access, typically only able to view public content.',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
    },
    {
        uuid: '2',
        name: 'user',
        description: 'A registered user with access to standard features and personal content.',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
    },
    {
        uuid: '3',
        name: 'content creator',
        description: 'Responsible for creating new content, such as articles, posts, or media.',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
    },
    {
        uuid: '4',
        name: 'content editor',
        description: 'Can edit and improve existing content to maintain quality and relevance.',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
    },
    {
        uuid: '5',
        name: 'content moderator',
        description: 'Reviews and moderates content to ensure it meets guidelines and standards.',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
    },
    {
        uuid: '6',
        name: 'admin',
        description: 'Manages users and settings; has broader control over platform features.',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
    },
    {
        uuid: '7',
        name: 'super admin',
        description: 'Has the highest level of control with full access to all system features.',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
    },
];

export default roles;
