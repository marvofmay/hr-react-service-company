import { useMutation, useQueryClient } from '@tanstack/react-query';
import Employee from '../../types/Employee';
import fakeEmployees from '../../fakeData/Employees';
import { useTranslation } from 'react-i18next';

const deleteEmployee = async (employeeToDelete: Employee): Promise<Employee[] | []> => {
    const currentEmployees = fakeEmployees.filter(employee => employee.uuid !== employeeToDelete.uuid);

    return currentEmployees
};

const useDeleteEmployeeMutation = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        },
        onError: (error) => {
            console.error(t('employee.delete.error'), error);
        },
    });
};

export default useDeleteEmployeeMutation;
