'use client'

import { Center, FormControl, FormLabel, Input, Button, useClipboard, useToast } from '@chakra-ui/react';
import { FormEventHandler, useEffect, useState } from 'react';
import { FaRss } from 'react-icons/fa';

export default function Index() {
  const toast = useToast();
  const [isSubmit, setIsSubmit] = useState(false);
  const { onCopy, value, setValue, hasCopied } = useClipboard('');

  useEffect(() => {
    if (value && !hasCopied) {
      onCopy();
    }

    setValue('');
  }, [onCopy, value, hasCopied, setValue]);

  const handleFormSubmit: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    const formData = new FormData(e.currentTarget as unknown as HTMLFormElement);

    const url = formData.get('url') as string;

    if (!url) {
      return;
    }

    const urlObj = new URL(url);

    if (urlObj.hostname !== 'www.youtube.com') {
      return;
    }

    const query = await fetch(`/api?url=${url}`);

    if (!query.ok) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    const { rss } = await query.json();

    if (!rss) {
      return;
    }

    setValue(rss);

    toast({
      title: 'RSS link copied',
      description: 'You can now paste it in your favorite RSS reader.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    setIsSubmit(false);
  }

  return (
    <Center height='100vh'>
      <FormControl as='form' maxWidth={['80%', '50%', '30%']} onSubmit={handleFormSubmit}>
        <FormLabel htmlFor='url'>
          Insert a YouTube channel link:
          <Input name='url' type='url' />
        </FormLabel>
        <Button
          type='submit'
          colorScheme='orange'
          w='full' 
          disabled={isSubmit}
          isLoading={isSubmit}
          leftIcon={<FaRss />}
        >
          Get RSS link
        </Button>
      </FormControl>
    </Center>
  )
}
