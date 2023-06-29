import React from 'react';
import { useSelector } from 'react-redux';
import { getPopularTags } from '../../../helper/getPopularTags';
import { useNavigate } from 'react-router-dom';
import {
  Stack,
  Flex,
  Link,
  Tag,
  Text,
  VStack,
  Icon,
  SkeletonText,
} from '@chakra-ui/react';
import { FiTrendingUp } from 'react-icons/fi';
import { nanoid } from '@reduxjs/toolkit';

const TrendingTags: React.FC = () => {
  const {
    modifiedData,
    modifiedDataLoading: loading,
    modifiedDataErr: err,
  } = useSelector((state: any) => state.modifiedData);

  const popularTags = getPopularTags(modifiedData);
  const navigate = useNavigate();

  return (
    <VStack align='flex-start' py='2'>
      <Flex align='center' p='3' mx='5'>
        <Icon mr='4' fontSize='16' as={FiTrendingUp} />
        <Text fontSize='lg'>Trending Tags</Text>
      </Flex>
      {loading ? (
        <>
          <SkeletonText noOfLines={4} spacing='4' w='80%' h='10' mx='5' />
        </>
      ) : (
        <Stack spacing='1' px='5'>
          {popularTags.slice(0, 4).map(({ tagName, publishedPosts }: any) => (
            <Link
              key={nanoid()}
              style={{ textDecoration: 'none' }}
              onClick={() => navigate(`/tag/${tagName}`)}
              _focus={{ boxShadow: 'none' }}
            >
              <Flex
                align='center'
                p='2'
                mx='5'
                borderRadius='lg'
                role='group'
                cursor='pointer'
                _hover={{
                  bg: 'blue.500',
                  color: 'white',
                }}
              >
                <Text fontSize='lg'>{tagName}</Text>
                <Tag ml='3' size='md'>
                  +{publishedPosts}
                </Tag>
              </Flex>
            </Link>
          ))}
          <Flex
            align='center'
            p='2'
            mx='5'
            borderRadius='lg'
            role='group'
            cursor='pointer'
            color='blue.500'
          >
            <Link href='/explore'>See all</Link>
          </Flex>
        </Stack>
      )}
    </VStack>
  );
};

export default TrendingTags;
