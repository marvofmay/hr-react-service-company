import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Image from 'next/image';

const AvatarForm: React.FC = () => {
    const { t } = useTranslation();

    const DEFAULT_AVATAR_URL = '/icons/avatar-default.png';
    const WOMAN_AVATAR_URL = '/icons/woman.png';
    const MAN_AVATAR_URL = '/icons/man.png';

    const [avatarUrl, setAvatarUrl] = useState<string>(DEFAULT_AVATAR_URL);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isCustomAvatar, setIsCustomAvatar] = useState<boolean>(false);
    const [isSaved, setIsSaved] = useState<boolean>(false); // Dodany stan
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && isValidFile(file)) {
            setSelectedFile(file);
            const temporaryUrl = URL.createObjectURL(file);
            setAvatarUrl(temporaryUrl);
            setIsCustomAvatar(true);
            setIsSaved(false); // Resetujemy stan zapisu
        } else {
            toast.error(t('userProfile.avatar.invalidFile'));
            clearFileInput();
        }
    };

    const isValidFile = (file: File): boolean => {
        const allowedExtensions = ['image/png', 'image/jpeg', 'image/jpg'];
        return allowedExtensions.includes(file.type);
    };

    const handleAvatarChange = (avatar: string) => {
        setAvatarUrl(avatar);
        setIsCustomAvatar(false);
        setSelectedFile(null);
        clearFileInput();
        setIsSaved(false); // Resetujemy stan zapisu
    };

    const clearFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSaveAvatar = async () => {
        try {
            const payload = new FormData();

            if (isCustomAvatar && selectedFile) {
                payload.append('type', 'custom');
                payload.append('avatar', selectedFile);
            } else {
                payload.append('type', 'default');
                payload.append('avatar', avatarUrl);
            }

            await axios.post('https://httpbin.org/post', payload, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const progress = Math.round(
                            (progressEvent.loaded / progressEvent.total) * 100
                        );
                        setUploadProgress(progress);
                    }
                },
            });

            toast.success(t('userProfile.avatar.upload.success'));
            setUploadProgress(0);
            setSelectedFile(null);
            clearFileInput();
            setIsSaved(true); // Ustawiamy zapis na sukces
        } catch (error) {
            console.error(error);
            toast.error(t('userProfile.avatar.upload.error'));
            setUploadProgress(0);
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg text-xs">
            <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
                    <Image
                        src={avatarUrl}
                        alt={t('avatar.alt')}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="defaultAvatar"
                                value={MAN_AVATAR_URL}
                                checked={!isCustomAvatar && avatarUrl === MAN_AVATAR_URL}
                                onChange={() => handleAvatarChange(MAN_AVATAR_URL)}
                            />
                            {t('userProfile.avatar.man')}
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="defaultAvatar"
                                value={WOMAN_AVATAR_URL}
                                checked={!isCustomAvatar && avatarUrl === WOMAN_AVATAR_URL}
                                onChange={() => handleAvatarChange(WOMAN_AVATAR_URL)}
                            />
                            {t('userProfile.avatar.woman')}
                        </label>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <label htmlFor="avatarUpload" className="text-sm font-medium">
                        {t('userProfile.avatar.upload.label')}
                    </label>
                    <input
                        id="avatarUpload"
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        className="text-sm"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                    {!isSaved && ( // Ukrywamy przycisk, jeśli zapisano
                        <button
                            type="button"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={handleSaveAvatar}
                        >
                            {t('userProfile.avatar.upload.button')}
                        </button>
                    )}
                </div>

                {uploadProgress > 0 && (
                    <div className="w-full max-w-xs">
                        <div className="h-2 bg-gray-200 rounded-full">
                            <div
                                className="h-full bg-blue-500 rounded-full"
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                            {t('userProfile.avatar.upload.progress', { progress: uploadProgress })}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AvatarForm;
