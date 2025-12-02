import { useMutation, useQueryClient } from '@tanstack/react-query';
import Employee from '../../types/Employee';
import fakeEmployees from '../../fakeData/Employees';
import { useTranslation } from 'react-i18next';

const updateEmployee = async (updatedEmployee: Employee): Promise<Employee[]> => {
    const updatedEmployees = fakeEmployees.map(employee =>
        employee.uuid === updatedEmployee.uuid ? updatedEmployee : employee
    );

    return updatedEmployees;
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
