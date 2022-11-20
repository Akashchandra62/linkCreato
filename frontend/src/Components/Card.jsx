import { HStack, Image, Stack, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { AiOutlineMobile, AiOutlineMail } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { ImWhatsapp } from 'react-icons/im';
import { useParams } from 'react-router-dom';
import MetaDecorator from './MetaDecorator';

const Card = () => {
  const [user, setUser] = useState({});
  const {id} = useParams();
  const getUser = async () => {
    try {
      const users = await axios.get(`/${id}`);
      setUser(users.data.user);
      window.location.replace(users.data.user.url)
      return;
    } catch (error) {
      return error;
    }
  };
  useEffect(() => {
    

    getUser();

    return () => {};
  }, []);

  return 
  (
      <Stack
        h={'100vh'}
        w={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <VStack
          w={['80%', '70%', '30%']}
          boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
          pb={'10px'}
          borderRadius={'1rem'}
        >
          <Image
            boxSize={'100%'}
            src={`./images/${user.imagePath}`}
            alt="profile"
            borderTopRadius={'1rem'}
          />
          <VStack
            w={'100%'}
            justifyContent={'flex-start'}
            alignItems={'flex-start'}
            pl={'15px'}
          >
            <HStack flexWrap={'wrap'}>
              <BiUserCircle fontSize={'1.7rem'} />
              <Text fontSize={'1.7rem'} fontWeight={'bold'}>
                {user.name}
              </Text>
            </HStack>
            <Text fontSize={'1.2rem'} fontWeight={'400'}>
              {user.designation}
            </Text>
          </VStack>
          <HStack w={'100%'} justifyContent={'space-around'}>
            <AiOutlineMail fontSize={'2.5rem'} color={'red'} />
            <AiOutlineMobile fontSize={'2.5rem'} color={'black'} />
            <ImWhatsapp fontSize={'2.5rem'} color={'green'} />
          </HStack>
        </VStack>
        
      </Stack>
  );
};

export default Card;
