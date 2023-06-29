type ProfileData = {
  username: string;
  profile: null | object;
  name: string;
  createdAt: string;
  id: string;
  twitter: string;
  website: string;
  location: string;
  email: string;
  github: string;
  followers: Array<string>;
  following: Array<string>;
  followingTags: Array<string>;
};

export const getUserProfileData = (
  profileData: ProfileData[],
  userId: string
): ProfileData | undefined => {
  return profileData.find(data => data.id === userId);
};
