import React from 'react'
import {
  Box,
  chakra,
  Flex,
  useColorModeValue,
  CloseButton,
} from '@chakra-ui/react'
import { fileSize } from '../../util/util'

export default function ImageCard({ url, name, type, size, onRemove, id }) {
  return (
    <Flex
      bg={useColorModeValue('#F9FAFB', 'gray.600')}
      p={5}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        maxW="md"
        mx="auto"
        bg={useColorModeValue('white', 'gray.800')}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
      >
        <Box
          w={1 / 3}
          bgSize="cover"
          style={{
            backgroundImage: `url('${url}')`,
          }}
        ></Box>

        <Box w={2 / 3} p={{ base: 4, md: 4 }}>
          <chakra.h1
            fontSize="2xl"
            fontWeight="bold"
            color={useColorModeValue('gray.800', 'white')}
          >
            {`.${String(type).toUpperCase().split('/')[1]}`}
          </chakra.h1>

          <chakra.p
            mt={2}
            fontSize="sm"
            color={useColorModeValue('gray.600', 'gray.400')}
          >
            {`${name} - ${fileSize(size)}`}
          </chakra.p>
        </Box>
      </Flex>
      <CloseButton
        onClick={() => {
          onRemove(id)
        }}
      />
    </Flex>
  )
}
