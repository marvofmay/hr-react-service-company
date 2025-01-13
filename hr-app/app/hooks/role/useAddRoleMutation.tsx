// import axios from 'axios';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import Role from '@/app/types/Role';
// import { useTranslation } from 'react-i18next';
// import { SERVICE_COMPNY_URL } from '@/app/utility/constans';

// const addRole = async (role: Role, token: string): Promise<string> => {
//     try {
//         const response = await axios.post(
//             `${SERVICE_COMPNY_URL}/api/roles`,
//             {
//                 name: role.name,
//                 description: role.description,
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );

//         return response.data.message;
//     } catch (error: any) {
//         if (axios.isAxiosError(error) && error.response?.status === 401) {
//             window.location.href = '/user/logout';
//         }

//         const errorMessage = error.response?.data?.message;

//         throw new Error(errorMessage);
//     }
// };

// const useAddRoleMutation = () => {
//     const queryClient = useQueryClient();
//     const { t } = useTranslation();

//     return useMutation({
//         mutationFn: (role: Role) => {
//             const token = localStorage.getItem('token');

//             if (!token) {
//                 throw new Error(t('common.message.tokenIsMissing'));
//             }

//             return addRole(role, token);
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ['roles'] });
//         },
//         onError: (error) => {
//             console.error(t('role.add.error'), error);
//         },
//     });
// };

// export default useAddRoleMutation;
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Role from '@/app/types/Role';
import { useTranslation } from 'react-i18next';
import { SERVICE_COMPNY_URL } from '@/app/utility/constans';

const addRole = async (role: Role, token: string): Promise<string> => {
    try {
        const response = await axios.post(
            `${SERVICE_COMPNY_URL}/api/roles`,
            {
                name: role.name,
                description: role.description,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data.message;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            window.location.href = '/user/logout';
        }

        console.log('error0', error);

        throw error;
    }
};

const useAddRoleMutation = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: (role: Role) => {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error(t('common.message.tokenIsMissing'));
            }

            return addRole(role, token);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roles'] });
        },
        onError: (error) => {
            throw error;
        },
    });
};

export default useAddRoleMutation;
