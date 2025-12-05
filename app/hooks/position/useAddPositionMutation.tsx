import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import Position from '@/app/types/Position';
import { useTranslation } from 'react-i18next';
import { SERVICE_COMPANY_URL } from '@/app/utility/constans';

const addPosition = async (position: Position, token: string): Promise<string> => {
    const response = await axios.post(
        `${SERVICE_COMPANY_URL}/api/positions`,
        { name: position.name, description: position.description },
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
    );
    return response.data.message;
};

const useAddPositionMutation = () => {
    const { t } = useTranslation();

    return useMutation({
        mutationFn: (position: Position) => {
            const token = localStorage.getItem("auth_token");
            if (!token) throw new Error(t('common.message.tokenIsMissing'));
            return addPosition(position, token);
        }
    });
};

export default useAddPositionMutation;
