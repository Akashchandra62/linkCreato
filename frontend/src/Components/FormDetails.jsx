import { Box, Button, HStack, Input, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { FaRegAddressCard } from 'react-icons/fa';
import { AiFillCopy } from 'react-icons/ai';
import Dnd from './Dnd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const FormDetails = ({ yourImage, setImage }) => {
  const [copied, setCopied] = useState('Copy');

  const [visible, setVisible] = useState(false);
  const [link, setLink] = useState('');
  const [details, setDetails] = useState({
    name: '',
    description:'',
    url: '',
  });

  const handleSubmit = async event => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('images', yourImage);
    formData.append('name', details.name);
    formData.append('description', details.description);
    formData.append('url', details.url);

    const createCard = await axios.post('/createcard', formData, {
      headers: {
        ContentType: 'multipart/form-data',
      },
    });
    const userId = createCard.data.user._id;
    setVisible(true);

    setLink(process.env.REACT_APP_URL + `/${userId}`);
  };

  const handleChange = e => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  return (
    <Stack
      bg={'#e6f7f8'}
      w={'80%'}
      p={6}
      gap={5}
      my={4}
      border={'5px dashed white'}
      justifyContent={'center'}
    >
      {visible && (
        <HStack
          w={'80%'}
          p={'3'}
          margin={'auto'}
          bg={'white'}
          borderRadius={'10'}
          justifyContent={'center'}
          flexWrap={'wrap'}
          boxShadow={
            ' rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;'
          }
        >
          <Box w={'80%'}>
            <Text>{link}</Text>
          </Box>
          <CopyToClipboard text={link} onCopy={() => setCopied('Copied')}>
            <Button bg={'green.200'}>
              <HStack>
                <Text fontWeight={'bold'}>{copied}</Text> <AiFillCopy />
              </HStack>
            </Button>
          </CopyToClipboard>
        </HStack>
      )}
      <form onSubmit={handleSubmit}>
        <Stack w={'100%'} justifyContent={'center'} alignItems={'center'}>
          <Dnd yourImage={yourImage} setImage={setImage} />
        </Stack>
        <Input
          focusBorderColor="none"
          my={1}
          p={5}
          py={7}
          fontSize={'1.2rem'}
          bg={'white'}
          type="text"
          name="name"
          value={details.name}
          onChange={handleChange}
          placeholder={'Name'}
          required
        />
        <Input
          focusBorderColor="none"
          my={1}
          p={5}
          py={7}
          fontSize={'1.2rem'}
          bg={'white'}
          type="text"
          name="description"
          value={details.description}
          onChange={handleChange}
          placeholder={'description'}
          required
        />
        
        <Input
          focusBorderColor="none"
          my={1}
          p={5}
          py={7}
          fontSize={'1.2rem'}
          bg={'white'}
          type="text"
          name="url"
          value={details.url}
          onChange={handleChange}
          placeholder={'Destination url'}
        />
        <HStack marginTop={7} justifyContent={'flex-end'}>
          <Button bg={'green.300'} type="submit" value="Submit" p={5} py={7}>
            <Text mr={2}>Generate Card </Text>
            <FaRegAddressCard />
          </Button>
        </HStack>
      </form>
    </Stack>
  );
};

export default FormDetails;
