import React, { useRef } from 'react';
import {
  Flex,
  Text,
  Button,
  Box,
  Stack,
  useColorMode,
  SkeletonCircle,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import CustomAvatar from '../utils/CustomAvatar';
import { FiSearch } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { PrimaryBtn, SecondaryBtn } from '../utils/Buttons';
import { useAuth } from '../../context/auth';
import { useSelector } from 'react-redux';
import SearchInput from '../../features/search/components/SearchInput';
import useGetQuerySearchTerm from '../../features/search/hooks/useGetQuerySearchTerm';
import { removeFromLocalStorage } from '../../helper/localStorage';
import SignOut from '../../features/users/utils/SignOut';

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

const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuth();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const querySearchTerm = useGetQuerySearchTerm('spq');

  const {
    profileData,
    profileDataLoading: loading,
    profileDataErr: err,
  } = useSelector((state: RootState) => state.profileData);

  let currentUserProfile: ProfileData | undefined;

  if (user && profileData) {
    currentUserProfile = profileData.find(
      (data: ProfileData) => data.id === user.userId
    );

    if (!currentUserProfile) {
      removeFromLocalStorage('user');
    }
  }

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex>
      <SearchInput
        ref={searchInputRef}
        querySearchTerm={querySearchTerm}
        // w='400px'
        display={{ base: 'none', md: 'block' }}
        route='search'
        mb='.2rem'
      />
      <Flex alignItems={'center'}>
        <Stack direction={'row'} spacing={1}>
          <Link to='/search'>
            <SecondaryBtn
              name='search_icon'
              display={{ base: 'block', md: 'none' }}
              m='0 .5rem 0 0'
            >
              <FiSearch size={23} />
            </SecondaryBtn>
          </Link>

          <PrimaryBtn
            display={{ base: 'none', md: 'block' }}
            onClick={() => navigate('/create-post')}
            m='0 .5rem 0 0'
          >
            Create Post
          </PrimaryBtn>

          <Button onClick={toggleColorMode} bg='none'>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>

          {loading ? (
            <SkeletonCircle size='40px' />
          ) : (
            <Menu>
              <MenuButton as={Button} variant={'link'}>
                <CustomAvatar
                  profile={(profileData && currentUserProfile?.profile) || null}
                  size='40px'
                />
              </MenuButton>
              <MenuList>
                {currentUserProfile ? (
                  <MenuItem
                    onClick={() => navigate(`/${currentUserProfile?.username}`)}
                  >
                    <Box>
                      <Text>{currentUserProfile?.name}</Text>
                      <Text lineHeight={1} fontSize='15px'>
                        @{currentUserProfile?.username}
                      </Text>
                    </Box>
                  </MenuItem>
                ) : null}
                <MenuDivider />
                {currentUserProfile ? (
                  <>
                    <MenuItem
                      onClick={() =>
                        navigate(`/${currentUserProfile?.username}`)
                      }
                    >
                      Profile
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/create-post')}>
                      Create Post
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/dashboard')}>
                      Dashboard
                    </MenuItem>
                    <MenuDivider />
                  </>
                ) : null}
                <MenuItem>
                  <SignOut />
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Header;
