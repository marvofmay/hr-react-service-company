import { useMutation, useQueryClient } from '@tanstack/react-query';
import Employee from '../../types/Employee';
import fakeEmployees from '../../fake_data/Employees';
import { useTranslation } from 'react-i18next';

const addEmployee = async (employee: Employee): Promise<Employee[]> => {
    const newEmployee = { ...employee, uuid: `${fakeEmployees.length + 1}` };
    fakeEmployees.push(newEmployee);

    return fakeEmployees;
};

const useAddEmployeeMutation = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        },
        onError: (error) => {
            console.error(t('employee.add.error'), error);
        },
    });
};

export default useAddEmployeeMutation;
