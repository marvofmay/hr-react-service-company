import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { SERVICE_COMPANY_URL } from '@/app/utils/constans';
import NotePayload from '@/app/types/NotePayload';

const addNote = async (notePayload: NotePayload, token: string): Promise<string> => {
    const response = await axios.post(
        `${SERVICE_COMPANY_URL}/api/users/notes`,
        notePayload,
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
    );
    return response.data.message;
};

const useAddNoteMutation = () => {
    const { t } = useTranslation();

    return useMutation({
        mutationFn: (note: NotePayload) => {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                throw new Error(t('common.message.tokenIsMissing'));
            }

            return addNote(note, token);
        }
    });
};

export default useAddNoteMutation;