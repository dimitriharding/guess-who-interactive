import { Flex, Box, Heading, useColorModeValue, Button } from '@chakra-ui/react'
import { parseForESLint } from '@typescript-eslint/parser'
import { useState } from 'react'
import Carousel from '../../components/ui/Carousel'
import { getDeckInfo } from '../api/_db'

const Deck = ({ data, error }) => {
  return (
    <Box px={20} h="100hv">
      <Box h="20hv">
        <Heading marginTop={10}>{`whoDat - ${data?.pageData?.title}`}</Heading>
      </Box>
      <Carousel slides={data?.pageData?.slides ? data?.pageData?.slides : []} />
    </Box>
  )
}

export async function getServerSideProps({ params }) {
  const { data, error } = await getDeckInfo(params.id)
  let deckData = null,
    errorData = null
  if (data?.length > 0) {
    deckData = {
      pageData: {
        about: data[0]?.description,
        title: data[0]?.name,
        slides: data[0]?.guess_options.map((guessData) => {
          const { options, original_image, masked_image } = guessData
          return {
            guessImage: masked_image,
            actualImage: original_image,
            options: options.data,
          }
        }),
      },
    }
  } else {
    errorData = {
      error: error,
      message: 'Deck not found!',
      code: 404,
    }
  }

  if (error) {
    errorData = {
      error: error,
      message: 'Error getting deck data',
      code: 500,
    }
  }

  console.log({ errorData })
  return {
    props: { data: deckData, error: errorData },
  }
}

export default Deck
