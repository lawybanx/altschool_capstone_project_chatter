import React, { Dispatch, SetStateAction } from 'react';
import {
  Box,
  HStack,
  Image,
  Input,
  Text,
  useColorModeValue,
  BoxProps,
} from '@chakra-ui/react';
import { PrimaryBtn, SecondaryBtn } from '../../../shared/utils/Buttons';
import AddCvImg from '../utils/AddCvImg';
import AddTags from '../../tags/components/AddTags';
import logo from '../../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import MarkdownEditor from './MarkdownEditor';

interface CreatePostFormProps {
  publishPostHandler: () => void;
  draftPostHandler: () => void;
  editPostHandler: () => void;
  setPostTitle: Dispatch<SetStateAction<string>>;
  postTitle: string;
  postData: any;
  pageTitle: string;
  publishing: boolean;
  savingDraft: boolean;
  uploadingImg: boolean;
  setUploadingImg: Dispatch<SetStateAction<boolean>>;
  toEdit: boolean;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({
  publishPostHandler,
  draftPostHandler,
  editPostHandler,
  setPostTitle,
  postTitle,
  postData,
  pageTitle,
  publishing,
  savingDraft,
  uploadingImg,
  setUploadingImg,
  toEdit,
}) => {
  const navigate = useNavigate();

  const isToEdit = toEdit && !postData.draft;

  const onSubmit = (handler: () => void) => {
    if (postTitle) {
      handler();
    }
  };

  return (
    <Box mt='.5rem'>
      <Box m='auto'>
        {/* navbar */}
        <Box display='flex' mx={{ base: '.5rem', lg: '0rem' }}>
          <Box display='flex' alignItems='center' mr='auto'>
            <Image
              src={logo}
              cursor='pointer'
              alt='logo'
              h='40px'
              onClick={() => navigate('/')}
            />
            <Text fontSize='xl' ms='2'>
              {pageTitle} Post
            </Text>
          </Box>
        </Box>

        <Box height='calc(100vh - 110px)' overflow='auto'>
          <Box p={{ base: '.5rem', md: '1rem' }}>
            <Box w='100%'>
              <AddCvImg
                cvImgFromLocalStorage={postData?.cvImg}
                setUploadingImg={setUploadingImg}
              />

              <Input
                variant='unstyled'
                ps='.5rem'
                placeholder='New post title here...'
                bg='transparent !important'
                fontSize={{ base: '2rem', md: '2.5rem' }}
                fontWeight='700'
                value={postTitle}
                height='60px'
                _focus={{
                  border: 'none !important',
                  boxShadow: 'none !important',
                }}
                m='0'
                required
                onChange={({ target }) => setPostTitle(target.value)}
                _placeholder={{ color: '#525252' }}
              />

              <AddTags filteredTagsFromLocalStorage={postData?.tags} />

              <Box w='100%' mt='1rem !important'>
                <MarkdownEditor
                  MDEValue={postData?.MDEValue}
                  isSubmitting={publishing || savingDraft}
                  setUploadingImg={setUploadingImg}
                  showHtml={true}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <HStack
          justify='flex-end'
          w='100%'
          py='.5rem'
          px='.5rem'
          pos='sticky'
          bottom='0'
          zIndex='1'
          bg={useColorModeValue('light.bg', 'dark.bg')}
        >
          {!isToEdit && (
            <SecondaryBtn
              onClick={() => onSubmit(draftPostHandler)}
              isLoading={savingDraft || uploadingImg}
              isLoadingText={savingDraft ? 'Saving draft' : undefined}
            >
              Save draft
            </SecondaryBtn>
          )}

          <PrimaryBtn
            bg='light.primary'
            onClick={() =>
              onSubmit(isToEdit ? editPostHandler : publishPostHandler)
            }
            isLoading={publishing || savingDraft || uploadingImg}
            isLoadingText={
              isToEdit
                ? 'Saving changes'
                : publishing
                ? 'Publishing'
                : undefined
            }
          >
            {isToEdit ? 'Save changes' : 'Publish'}
          </PrimaryBtn>
        </HStack>
      </Box>
    </Box>
  );
};

export default CreatePostForm;
