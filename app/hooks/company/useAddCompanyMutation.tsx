import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import Company from '@/app/types/Company';
import { useTranslation } from 'react-i18next';
import { SERVICE_COMPANY_URL } from '@/app/utility/constans';

const addCompany = async (company: Company, token: string): Promise<string> => {
    const response = await axios.post(
        `${SERVICE_COMPANY_URL}/api/companies`,
        {
            fullName: company.fullName,
            shortName: company.shortName,
            internalCode: company.internalCode,
            nip: company.nip,
            regon: company.regon,
            description: company.description,
            parentCompanyUUID: company.parentCompany?.uuid !== '' ? company.parentCompany?.uuid : null,
            industryUUID: company.industry.uuid,
            active: company.active,
            phones: company.phones.filter(p => p.trim() !== ""),
            emails: company.emails.filter(e => e.trim() !== ""),
            websites: company.webs.filter(w => w.trim() !== ""),
            address: company.address
        },
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
    );
    return response.data.message;
};

const useAddCompanyMutation = () => {
    const { t } = useTranslation();

    return useMutation({
        mutationFn: (company: Company) => {
            const token = localStorage.getItem("auth_token");
            if (!token) throw new Error(t('common.message.tokenIsMissing'));
            return addCompany(company, token);
        }
    });
};

export default useAddCompanyMutation;