import { useSelector } from 'react-redux';

interface ProfileData {
  id: string;
  profile: string;
  username: string;
  name: string;
}

interface RootState {
  profileData: {
    profileDataLoading: boolean;
    profileDataErr: string | null;
    profileData: ProfileData[];
  };
}

const useGenerateUserName = () => {
  const { profileData } = useSelector((state: RootState) => state.profileData);

  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  return (username: string, userId: string) => {
    const authenticatedUsernames = [
      ...new Set(
        profileData
          ?.filter(
            userData =>
              userData.id !== userId &&
              userData.username?.toLowerCase().split(' ').join('')
          )
          .map(data => data.username)
      ),
    ];

    let uniqueUsername = '';

    // Recursive function
    const createUniqueUsername = (nameParam: string, number = '') => {
      const name = nameParam + number;

      if (!authenticatedUsernames.includes(name)) {
        uniqueUsername = name;
        return;
      }

      createUniqueUsername(nameParam, getRandomNumber(1, 999).toString());
    };

    createUniqueUsername(username.toLowerCase().split(' ').join(''));

    return uniqueUsername;
  };
};

export default useGenerateUserName;
