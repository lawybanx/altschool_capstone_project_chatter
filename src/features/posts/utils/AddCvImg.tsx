import {
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { nanoid } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeImage, uploadImage } from '../../../lib/api';
import { setCvImgToStore } from '../../../store/post/postData';
import { SecondaryBtn } from '../../../shared/utils/Buttons';

interface AddCvImgProps {
  cvImgFromLocalStorage: string | undefined;
  setUploadingImg: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddCvImg: React.FC<AddCvImgProps> = ({
  cvImgFromLocalStorage,
  setUploadingImg,
}) => {
  const [cvImg, setCvImg] = useState<string | undefined>(cvImgFromLocalStorage);

  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCvImgToStore(cvImg));
  }, [cvImg, dispatch]);

  const handleCVImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const image = e.target.files?.[0];

    if (image) {
      cvImg && removeImage(cvImg);

      const selectedImgPath = `images/${image.name}${nanoid()}`;
      setUploading(true);
      setUploadingImg(true);

      try {
        const url = await uploadImage(image, selectedImgPath);
        setUploading(false);
        setUploadingImg(false);
        setCvImg(url);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleCVImgRemove = (url: string) => {
    setCvImg('');
    removeImage(url).catch(err => console.log(err));
  };

  const borderColor = useColorModeValue('#d6d6d7', '#3d3d3d');
  const spinnerColor = useColorModeValue(
    'light.headingHover',
    'dark.headingHover'
  );

  return (
    <Flex mb='1rem' justify='flex-start' align='center' flexWrap='wrap'>
      {uploading && (
        <HStack>
          <Spinner color={spinnerColor} size='md' />
          <Text letterSpacing='1px'>Uploading...</Text>
        </HStack>
      )}

      {!uploading && cvImg && (
        <Image
          src={cvImg}
          alt='cover_image'
          w='250px'
          h='105px'
          objectFit='scale-down'
          mr='1rem'
          borderRadius='5px'
        />
      )}

      {!uploading && (
        <Flex mt='1'>
          <Button
            as='label'
            border='2px solid'
            borderColor={borderColor}
            m='0'
            p={2}
            fontWeight={400}
            cursor='pointer'
          >
            <Input
              display='none'
              type='file'
              accept='image/*'
              onChange={handleCVImageUpload}
            />
            {cvImg ? 'change' : 'Add a cover image'}
          </Button>

          {cvImg && (
            <SecondaryBtn
              color='red'
              onClick={() => handleCVImgRemove(cvImg)}
              m='0 0 0 .5rem'
            >
              Remove
            </SecondaryBtn>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default React.memo(AddCvImg);
