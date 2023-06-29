import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';
import '@wcj/markdown-style';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const markdown = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }

      return ''; // use external default escaping
    },
  });

  return (
    <Box>
      {React.createElement('markdown-style', {
        theme: useColorModeValue('light', 'dark'),
        children: (
          <Box
            as='div'
            p={{ base: '1rem', md: '1.5rem' }}
            dangerouslySetInnerHTML={{ __html: markdown.render(content) }}
          />
        ),
      })}
    </Box>
  );
};

export default MarkdownRenderer;
