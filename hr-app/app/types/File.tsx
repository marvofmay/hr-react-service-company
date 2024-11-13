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
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}
