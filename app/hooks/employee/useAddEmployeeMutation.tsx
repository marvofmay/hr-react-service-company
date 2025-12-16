import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import Employee from '@/app/types/Employee';
import { useTranslation } from 'react-i18next';
import { SERVICE_COMPANY_URL } from '@/app/utility/constans';

const addEmployee = async (employee: Employee, token: string): Promise<string> => {
    const response = await axios.post(
        `${SERVICE_COMPANY_URL}/api/employees`,
        {
            firstName: employee.firstName,
            lastName: employee.lastName,
            pesel: employee.pesel,
            employmentFrom: employee.employmentFrom,
            departmentUUID: employee.department.uuid,
            positionUUID: employee.position.uuid,
            contractTypeUUID: employee.contractType.uuid,
            roleUUID: employee.role.uuid,
            email: employee.email,
            address: employee.address,
            externalCode: employee.externalCode,
            internalCode: employee.internalCode,
            active: employee.active,
            phones: employee.phones.filter(p => p.trim() !== ""),
            parentEmployeeUUID: employee.parentEmployee?.uuid !== '' ? employee.parentEmployee?.uuid : null,
            employmentTo: employee.employmentTo
        },
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
    );
    return response.data.message;
};

const useAddEmployeeMutation = () => {
    const { t } = useTranslation();

    return useMutation({
        mutationFn: (employee: Employee) => {
            const token = localStorage.getItem("auth_token");
            if (!token) throw new Error(t('common.message.tokenIsMissing'));
            return addEmployee(employee, token);
        }
    });
};

export default useAddEmployeeMutation;