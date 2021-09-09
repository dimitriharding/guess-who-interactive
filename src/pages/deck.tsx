import { Flex, Box, Heading, useColorModeValue, Button } from '@chakra-ui/react'
import { parseForESLint } from '@typescript-eslint/parser'
import { useState } from 'react'
import Carousel from '../components/ui/Carousel'
import GuessWho from '../components/ui/GuessWho'

const Deck = ({ pageData }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [numberOfSlides] = useState(pageData?.slides?.length)
  const handleNavigation = (direction) => {
    if (direction == 'back' && currentSlide !== 0)
      setCurrentSlide(currentSlide - 1)
    if (direction == 'next' && currentSlide !== numberOfSlides - 1)
      setCurrentSlide(currentSlide + 1)
  }
  return (
    <Box px={20} h="100hv">
      <Box h="20hv">
        <Heading marginTop={10}>{`whoDat - ${pageData.title}`}</Heading>
      </Box>
      <Carousel slides={pageData.slides} />
    </Box>
  )
}

export async function getStaticProps() {
  const data = {
    pageData: {
      about: 'This is my Game of Thorn whoDat deck',
      title: 'GOT',
      slides: [
        {
          guessImage:
            'https://seetyah.s3.amazonaws.com/bran-stark-removebg.png',
          actualImage: 'https://seetyah.s3.amazonaws.com/bran-stark-actual.png',
          options: [
            {
              name: 'Ned Stark',
              answer: false,
            },
            {
              name: 'Robert Baratheon',
              answer: false,
            },
            {
              name: 'Tyrion Lannister',
              answer: false,
            },
            {
              name: 'Brand Stark',
              answer: true,
            },
          ],
        },
        {
          guessImage:
            'https://seetyah.s3.amazonaws.com/arya-stark-actual-removebg.png',
          actualImage: 'https://seetyah.s3.amazonaws.com/arya-stark-actual.png',
          options: [
            {
              name: 'Arya Stark',
              answer: true,
            },
            {
              name: 'Daenerys Targaryen',
              answer: false,
            },
            {
              name: 'Sansa Stark',
              answer: false,
            },
            {
              name: 'Margaery Tyrell',
              answer: false,
            },
          ],
        },
        {
          guessImage: 'https://seetyah.s3.amazonaws.com/ned-stark-removebg.png',
          actualImage: 'https://seetyah.s3.amazonaws.com/ned-stark-actual.jpeg',
          options: [
            {
              name: 'Samwell Tarly',
              answer: false,
            },
            {
              name: 'Ned Stark',
              answer: true,
            },
            {
              name: 'Jon Snow',
              answer: false,
            },
            {
              name: 'Robb Stark',
              answer: false,
            },
          ],
        },
      ],
    },
  }

  return {
    props: { ...data },
  }
}

export default Deck
