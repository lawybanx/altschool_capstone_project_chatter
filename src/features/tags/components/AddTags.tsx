import React, { useEffect, useRef, useState } from 'react';
import Tag from '../utils/Tag';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Input, Wrap, WrapItem } from '@chakra-ui/react';
// import tagSuggestions from './tagSuggestion.json';
import { getPopularTags } from '../../../helper/getPopularTags';
import { setTagsToStore } from '../../../store/post/postData';
import { nanoid } from '@reduxjs/toolkit';
import { VscChromeClose } from 'react-icons/vsc';
import useClickOutside from '../hooks/useClickOutside';

interface TagData {
  tagName: string | any;
  isCustomTag?: boolean;
}

const AddTags: React.FC<{ filteredTagsFromLocalStorage?: TagData[] }> = ({
  filteredTagsFromLocalStorage,
}) => {
  const { modifiedData } = useSelector((state: any) => state.modifiedData);
  const tags = getPopularTags(modifiedData);

  // states
  const [tagData, setTagData] = useState<TagData[]>(tags);
  const [filterTagName, setFilterTagName] = useState<string>('');
  const [focusTagInput, setFocusTagInput] = useState<boolean>(false);
  const [filteredTags, setFilteredTags] = useState<TagData[]>(
    filteredTagsFromLocalStorage || []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTagsToStore(filteredTags));
  }, [filteredTags, dispatch]);

  // refs
  const inputTagRef = useRef<HTMLInputElement>(null);

  // handle click outside to close suggestion box
  useClickOutside(setFocusTagInput, ['suggestion-box', 'tag-input']);

  // showing tag suggestion
  const tagsToShow = (): TagData[] => {
    if (filterTagName === '') {
      return [];
    }

    return tagData.filter(tag =>
      tag.tagName.toLowerCase().includes(filterTagName.toLowerCase())
    );
  };

  const filteredTagsToShow = (): JSX.Element[] => {
    return filteredTags.map(tag => (
      <WrapItem key={nanoid()} pos='relative'>
        <Tag
          tag={tag}
          onDeleteTag={() => handleDeleteTag(tag)}
          showCloseIcon={true}
        >
          <VscChromeClose size={20} />
        </Tag>
      </WrapItem>
    ));
  };

  const addToFilteredTags = (tag: TagData) => {
    setFilteredTags(prevArr => [...prevArr, tag]);
    setTagData(prevArr => prevArr.filter(item => item.tagName !== tag.tagName));
  };

  const handleAddTag = (tag: TagData) => {
    addToFilteredTags(tag);
    setFilterTagName('');
    inputTagRef.current?.focus();

    setTimeout(() => setFocusTagInput(true), 100); // two setState trigger once and doesn't get true
  };

  const handleDeleteTag = (tag: TagData) => {
    setFilteredTags(prevArr =>
      prevArr.filter(item => item.tagName !== tag.tagName)
    );

    if (tag.isCustomTag) {
      return;
    }

    setTagData(prevArr => [...prevArr, tag]);
  };

  const capitalizeFirstLetter = (input: string) => {
    return input.replace(/\b\w/g, match => match.toUpperCase());
  };

  // generating tag icon
  const suggestions = (): JSX.Element[] => {
    const availableTags = tagsToShow();

    if (availableTags.length === 0) {
      return [];
    }

    const alreadyInTag = filteredTags.find(
      tag => tag.tagName === filterTagName
    );

    const transformedTags = alreadyInTag
      ? [...availableTags]
      : [{ tagName: filterTagName, isCustomTag: true }, ...availableTags];

    return transformedTags.map(tag => (
      <WrapItem key={nanoid()}>
        <Tag onAddTag={() => handleAddTag(tag)} tag={tag} />
      </WrapItem>
    ));
  };

  // showSuggestionBox
  const showSuggestionBox =
    focusTagInput && tagsToShow().length > 0 ? 'flex' : 'none';

  const tagInputPlaceHolder = `Add tag ( ${4 - filteredTags.length} )`;

  return (
    <>
      <Box mb={3}>
        <Wrap overflow='visible'>
          {filteredTagsToShow()}

          {filteredTags.length !== 4 && (
            <WrapItem maxW='120px'>
              <Input
                h='34px'
                w='100%'
                px='.5rem'
                className='tag-input'
                ref={inputTagRef}
                placeholder={tagInputPlaceHolder}
                borderRadius='5px'
                value={filterTagName}
                onChange={({ target }) =>
                  setFilterTagName(capitalizeFirstLetter(target.value))
                }
              />
            </WrapItem>
          )}
        </Wrap>
      </Box>

      <Flex
        wrap='wrap'
        gap='.5rem'
        display={showSuggestionBox}
        w='100%'
        className='suggestion-box shadowSecondary'
        m='0 auto 1rem'
        p={3}
        overflow='auto'
        borderRadius='5px'
        maxH='6rem'
      >
        {suggestions()}
      </Flex>
    </>
  );
};

export default React.memo(AddTags);
