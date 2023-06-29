import React from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Image,
  useDisclosure,
  BoxProps,
  FlexProps,
} from '@chakra-ui/react';
import {
  FiHome,
  FiCompass,
  FiMenu,
  FiBookmark,
  FiActivity,
  FiEdit,
} from 'react-icons/fi';

import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import icon from '../../assets/images/icon.png';
import Header from './Header';
import TrendingTags from '../../features/tags/components/TrendingTags';
import { IconType } from 'react-icons';
import { ReactText } from 'react';

interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, route: '/' },
  { name: 'Explore', icon: FiCompass, route: '/explore' },
  { name: 'Bookmarks', icon: FiBookmark, route: '/bookmarks' },
  { name: 'Drafts', icon: FiEdit, route: '/dashboard/drafts' },
  { name: 'Analytics', icon: FiActivity, route: '/dashboard' },
];

export default function SidebarMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='xs'
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p='4'>
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  let navigate = useNavigate();

  return (
    <Box
      transition='3s ease'
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex h='20' alignItems='center' mx='1' justifyContent='space-between'>
        <Image
          src={logo}
          cursor='pointer'
          alt='logo'
          h='50px'
          onClick={() => navigate('/')}
        />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <NavItem
          key={link.name}
          icon={link.icon}
          onClick={() => navigate(link.route)}
        >
          {link.name}
        </NavItem>
      ))}

      <TrendingTags />
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align='center'
        p='3'
        mx='5'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        _hover={{
          bg: 'blue.500',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            fontSize='16'
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  let navigate = useNavigate();

  return (
    <Flex
      ml={{ base: 0, md: 30 }}
      px={{ base: 4, md: 4 }}
      height='20'
      h='60px'
      alignItems='center'
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <Flex display={{ base: 'flex', md: 'none' }}>
        <IconButton
          onClick={onOpen}
          variant='outline'
          aria-label='open menu'
          icon={<FiMenu />}
        />

        <Image
          src={icon}
          cursor='pointer'
          alt='logo'
          h='40px'
          ml='3'
          onClick={() => navigate('/')}
        />
      </Flex>

      <Header />
    </Flex>
  );
};
