import React from 'react'
import { Box, chakra, Flex, useColorModeValue, Image } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { fileSize } from '../../util/util'

export default function ImageCard({ url, name, size, onRemove, id }) {
  return (
    <Flex
      direction={['column', 'row']}
      p={5}
      justifyContent="space-between"
      bg={useColorModeValue('#F9FAFB', 'gray.600')}
      w="full"
      alignItems="center"
    >
      <Flex>
        <Box mr={1}>
          <Image h={50} fit="cover" src={url} alt={name} />
        </Box>
        <Flex
          alignItems="center"
          color={useColorModeValue('gray.700', 'gray.200')}
        >
          <chakra.h1 px={2} fontSize="sm">
            {`${name} (${fileSize(size)})`}
          </chakra.h1>
        </Flex>
      </Flex>
      <DeleteIcon
        style={{ cursor: 'pointer' }}
        onClick={() => onRemove(id)}
        mt={[2, 0]}
        color="red.500"
      />
    </Flex>
  )
}
