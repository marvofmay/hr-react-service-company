import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { SERVICE_COMPANY_URL } from '@/app/utils/constans';
import PositionPayload from '@/app/types/PositionPayload';

const addPosition = async (position: PositionPayload, token: string): Promise<string> => {
    const response = await axios.post(
        `${SERVICE_COMPANY_URL}/api/positions`,
        {
            name: position.name,
            description: position.description,
            departmentsUUIDs: position.departmentsUUIDs,
            active: position.active
        },
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
    );
    return response.data.message;
};

const useAddPositionMutation = () => {
    const { t } = useTranslation();

    return useMutation({
        mutationFn: (position: PositionPayload) => {
            const token = localStorage.getItem("auth_token");
            if (!token) throw new Error(t('common.message.tokenIsMissing'));
            return addPosition(position, token);
        }
    });
};

export default useAddPositionMutation;
