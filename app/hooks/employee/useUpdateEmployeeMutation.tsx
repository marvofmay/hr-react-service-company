import { useMutation, useQueryClient } from '@tanstack/react-query';
import Employee from '../../types/Employee';
import { useTranslation } from 'react-i18next';

const updateEmployee = async (updatedEmployee: Employee): Promise<[]> => {

    return [];
};

const useUpdateEmployeeMutation = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        },
        onError: (error) => {
            console.error(t('employee.update.error'), error);
        },
    });
};

export default useUpdateEmployeeMutation;
