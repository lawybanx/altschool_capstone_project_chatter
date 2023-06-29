import React, { useEffect, useRef, ForwardedRef } from 'react';
import { Box, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface SearchInputProps {
  w?: string;
  display: {
    base: string;
    md: string;
  };
  mb: string;
  px?: string;
  flex?: string;
  placeholder?: string;
  route: string;
  querySearchTerm: string | null;
}

const SearchInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  SearchInputProps
> = (
  { w, display, mb, px, flex, placeholder, route, querySearchTerm },
  ref: ForwardedRef<HTMLInputElement>
) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.blur();

      const searchTerm = inputRef.current.value;

      if (!searchTerm && route === 'search') {
        return;
      }

      const queryName = route === 'search' ? 'spq' : 'stq'; // => searchPostQuery / searchTagQuery
      navigate(`/${route}?${queryName}=${searchTerm}`);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      if (!querySearchTerm) {
        inputRef.current.value = '';
      } else {
        inputRef.current.value = querySearchTerm;
      }
    }
  }, [querySearchTerm]);

  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(inputRef.current);
      } else {
        ref.current = inputRef.current;
      }
    }
  }, [ref]);

  return (
    <Box
      as='form'
      onSubmit={handleSearch}
      display={display}
      px={px || '.5rem'}
      mb={mb}
      flex={flex}
      mr='1'
    >
      <InputGroup h='30px' w={w || '100%'}>
        <Input placeholder={placeholder || 'Search...'} ref={inputRef} />
        <InputRightElement children={<FiSearch size={23} color='gray' />} />
      </InputGroup>
    </Box>
  );
};

export default React.forwardRef<HTMLInputElement, SearchInputProps>(
  SearchInput
);
