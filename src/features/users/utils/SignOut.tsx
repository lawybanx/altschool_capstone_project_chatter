import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../config/firebase';
import { removeFromLocalStorage } from '../../../helper/localStorage';
import { Icon, Text, Link } from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth).then(_ => {
      removeFromLocalStorage('user');
      navigate('/create-account', { replace: true });
    });
  };
  return (
    <Link
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      display='flex'
      color='red.500'
      _hover={{ cursor: 'pointer' }}
      w='100%'
      onClick={handleSignOut}
      alignItems='center'
    >
      <Icon as={FiLogOut} />
      <Text ml='2'>Sign Out</Text>
    </Link>
  );
};

export default SignOut;
