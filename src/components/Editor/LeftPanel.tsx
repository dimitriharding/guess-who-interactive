import React from 'react'
import {
  Box,
  Heading,
  useColorModeValue,
  Text,
  Divider,
} from '@chakra-ui/react'
import GuessWho from '../ui/GuessWho'

const LeftPanel = () => {
  return (
    <Box px={[4, 0]}>
      <Heading fontSize="lg" fontWeight="md" lineHeight="6">
        {'Custom "Guess Who" Editor'}
      </Heading>
      <Text
        mt={1}
        fontSize="sm"
        color={useColorModeValue('gray.600', 'gray.400')}
      >
        Your deck is only minutes away. Upload your images and we'll take care
        of the us
        <br />
        <br />
        - Remove backgrounds
        <br />
        - Mask images with black
        <br />- Create guess options from list of names
      </Text>
      <Box p={5}>
        <Divider />
      </Box>
      <Box>
        <GuessWho
          guessImage="https://seetyah.s3.amazonaws.com/dvh.png"
          actualImage="https://ca.slack-edge.com/T0CA1SGCU-U0CA8MY8N-53b022d8447e-512"
        />
      </Box>
    </Box>
  )
}

export default LeftPanel
