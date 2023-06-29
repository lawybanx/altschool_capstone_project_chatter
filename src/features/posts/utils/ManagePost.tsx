import React from 'react';
import {
  Box,
  HStack,
  Text,
  Link,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPostData } from '../../../store/post/currentPost';
import {
  saveToLocalStorage,
  removeFromLocalStorage,
} from '../../../helper/localStorage';
import { deletePost } from '../../../lib/api';

interface ManagePostProps {
  postId: string;
}

const ManagePost: React.FC<ManagePostProps> = ({ postId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { modifiedData } = useSelector((state: any) => state.modifiedData);

  const currentPostItem = modifiedData.find(
    (postData: { id: string }) => postData.id === postId
  );

  const setCurrentPostDataHandler = () => {
    if (currentPostItem) {
      const postData = {
        cvImg: currentPostItem.cvImg,
        title: currentPostItem.title,
        tags: currentPostItem.tags,
        MDEValue: currentPostItem.MDEValue,
        id: postId,
        draft: !!currentPostItem.draft,
      };

      dispatch(setCurrentPostData(postData));

      saveToLocalStorage('postDataToManage', JSON.stringify(postData));
    }
  };

  const goToEdit = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.stopPropagation();

    setCurrentPostDataHandler();
    navigate('/edit-post');
  };

  const pathname = currentPostItem?.draft ? '/dashboard/drafts' : '/dashboard';

  const handleDelete = () => {
    deletePost(postId)
      .then(() => {
        navigate(pathname);
        removeFromLocalStorage('postDataToManage');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <Box mr={5} justifySelf='flex-end'>
        <HStack spacing={2}>
          <Link
            onClick={goToEdit}
            _hover={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
            cursor='pointer'
          >
            <Text fontSize='md' color='light.primary' fontWeight='medium'>
              Edit
            </Text>
          </Link>
          <Link
            onClick={onOpen}
            _hover={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
            cursor='pointer'
          >
            <Text fontSize='md' color='red.500' fontWeight='medium'>
              Delete
            </Text>
          </Link>
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size='md'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Post: {currentPostItem?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize='md'>
              Are you sure you want to delete this post?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='red'
              onClick={handleDelete}
              _focus={{ boxShadow: 'none' }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ManagePost;
