import React from 'react'
import {
  Box,
  chakra,
  Flex,
  useColorModeValue,
  CloseButton,
  Icon,
  Image,
  Center,
} from '@chakra-ui/react'
import { MdLocationOn, MdEmail } from 'react-icons/md'
import { BiRectangle } from 'react-icons/bi'
import { FiImage } from 'react-icons/fi'
import { fileSize } from '../../util/util'

export default function ImageCard({
  url,
  name,
  type,
  size,
  onRemove,
  id,
  file,
}) {
  return (
    <Flex
      bg={useColorModeValue('#F9FAFB', 'gray.600')}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Flex p={5} alignItems="center" justifyContent="space-between">
        <Box w="full">
          <Image h={200} fit="cover" src={url} alt={name} />
        </Box>

        <Box paddingLeft={5} w="full">
          <Flex direction="column">
            <Flex
              alignItems="center"
              mt={4}
              color={useColorModeValue('gray.700', 'gray.200')}
            >
              <Icon as={FiImage} h={6} w={6} mr={2} />

              <chakra.h1 px={2} fontSize="sm">
                {name}
              </chakra.h1>
            </Flex>

            <Flex
              alignItems="center"
              mt={4}
              color={useColorModeValue('gray.700', 'gray.200')}
            >
              <Icon as={BiRectangle} h={6} w={6} mr={2} />

              <chakra.h1 px={2} fontSize="sm">
                {fileSize(size)}
              </chakra.h1>
            </Flex>
          </Flex>
        </Box>
        <CloseButton
          onClick={() => {
            onRemove(name)
          }}
        />
      </Flex>
      {/* <Flex
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
      /> */}
    </Flex>
  )
}
