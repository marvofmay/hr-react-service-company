import { useQuery } from '@tanstack/react-query';
import Employee from '@/app/types/Employee';

const fetchUserProfileData = async (uuid: string): Promise<Employee> => {
    // ToDo: dodać wywołanie endpointa
    // const response = await axios.get('/api/me/{uuid}');
    // return response.data;

    // Na razie zwrócimy dane z fakeUserProfile
    const userProfile = null;

    if (!userProfile) {
        throw new Error(`User profile with UUID ${uuid} not found.`);
    }

    return userProfile;
};

const useUserProfileQuery = (uuid: string) => {
    return useQuery<Employee>({
        queryKey: [`user_profile_${uuid}`, uuid],
        queryFn: () => fetchUserProfileData(uuid),
    });
};

export default useUserProfileQuery;
