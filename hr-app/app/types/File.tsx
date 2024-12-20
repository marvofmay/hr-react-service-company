export enum FileType {
    DOCUMENT = 'DOCUMENT',
    PHOTO = 'PHOTO',
    VIDEO = 'VIDEO',
    AUDIO = 'AUDIO',
}

export enum FileKind {
    USER_PHOTO = 'USER_PHOTO',
    COMPANY_LOGO = 'COMPANY_LOGO',
    AGREEMENT = 'AGREEMENT',
    REPORT = 'REPORT',
    OTHER = 'OTHER',
}

export default interface File {
    uuid: string;
    type: FileType;
    kind: FileKind;
    filePath: string;
    originalName: string;
    hashedName: string;
    extension: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
}
