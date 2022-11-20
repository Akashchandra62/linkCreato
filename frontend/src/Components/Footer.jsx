import { HStack, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
    <HStack w={'100%'} justifyContent={'space-around'} borderTop={'2px solid #2a8cb5'} fontWeight={'bold'} alignItems={'center'} flexWrap={'wrap'} py={5}>
        <Stack  color={'#2a8cb5'} my={5}>
           <Text>DIGICARD.IO</Text> 
        </Stack>
        <VStack  color={'#2a8cb5'}>
           <Text>Create Card</Text> 
           <Text>Copyright@ DigiCard.io 2022</Text> 

        </VStack>
    </HStack>
  )
}

export default Footer