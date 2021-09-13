import { Box, Heading, Button, Center, Text } from '@chakra-ui/react'
import Carousel from '../../components/ui/Carousel'
import { getDeckInfo } from '../api/_db'
import Link from 'next/link'

const Deck = ({ data, error }) => {
  const renderPage = () => {
    if (data) {
      return (
        <>
          <Box h="20hv">
            <Heading
              marginTop={10}
            >{`whoDat - ${data?.pageData?.title}`}</Heading>
          </Box>
          <Carousel
            slides={data?.pageData?.slides ? data?.pageData?.slides : []}
          />
        </>
      )
    }
    return (
      <Center h="600px" flexDirection="column">
        <Heading>Deck Not Found</Heading>
        <Text>You can always make your own "whoDat" deck</Text>
        <Box mt="10">
          <Link href="/">
            <Button variant="outline" mr="5">
              Back to Home
            </Button>
          </Link>
          <Link href="/editor">
            <Button>Create Deck</Button>
          </Link>
        </Box>
      </Center>
    )
  }
  return (
    <Box px={20} h="100hv">
      {renderPage()}
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
