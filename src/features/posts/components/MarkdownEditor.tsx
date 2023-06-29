import React, { useRef, useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Box } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { uploadImage } from '../../../lib/api';
import { setMDEValueToStore } from '../../../store/post/postData';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';

interface MarkdownEditorProps {
  MDEValue: string | undefined;
  setMDEValue?: (value: string) => void;
  isSubmitting: boolean;
  setUploadingImg: (uploading: boolean) => void;
  h?: string;
  showHtml: boolean;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  MDEValue,
  setMDEValue,
  isSubmitting,
  setUploadingImg,
  h,
  showHtml,
}) => {
  const editorRef = useRef<any>(null);
  const [value, setValue] = useState<string>(MDEValue || ' ');

  const dispatch = useDispatch();

  useEffect(() => {
    if (setMDEValue) {
      setMDEValue(value); // for comment
    } else {
      dispatch(setMDEValueToStore(value)); // for postData to publish or edit
    }
  }, [value, dispatch, setMDEValue]);

  useEffect(() => {
    if (MDEValue !== undefined) {
      setValue(MDEValue);
    } // set MDEValue to value only if it's not undefined
  }, [MDEValue]);

  const mdParser = new MarkdownIt({
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

  const handleEditorChange = ({
    html,
    text,
  }: {
    html: string;
    text: string;
  }) => {
    setValue(text);
  };

  const handleImageUpload = (file: File, callback: (url: string) => void) => {
    const reader = new FileReader();

    reader.onload = () => {
      setUploadingImg(true);
      const selectedImgPath = `images/${file.name}${nanoid()}`;
      uploadImage(file, selectedImgPath)
        .then(res => {
          callback(res);
          setUploadingImg(false);
        })
        .catch(err => {
          setUploadingImg(false);
          console.log(err);
        });
    };

    reader.readAsDataURL(file);
  };

  return (
    <Box w='100%'>
      <MdEditor
        style={{
          height: h || '500px',
        }}
        renderHTML={text => mdParser.render(text)}
        onChange={handleEditorChange}
        value={value}
        ref={editorRef}
        config={{
          view: {
            menu: true,
            md: true,
            // conditionally show html, default view is true
            html: showHtml || false,
          },
        }}
        onImageUpload={handleImageUpload}
      />
    </Box>
  );
};

export default MarkdownEditor;
