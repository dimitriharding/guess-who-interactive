import React, { useEffect, useState } from 'react'
import { Box, Flex, useColorModeValue, Text, Center } from '@chakra-ui/react'
import GuessWho from './GuessWho'
import Confetti from 'react-dom-confetti'

const config = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: '10px',
  height: '10px',
  perspective: '500px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
} as any

const ConfettiWrapper = (props) => (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      right: '50%',
    }}
    {...props}
  />
)

const Carousel = ({ slides }) => {
  const [fireConfetti, setFireConfetti] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [position, setPosition] = useState(0)

  const slidesCount = slides.length

  const prevSlide = () => {
    setPosition(0)
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1))
  }
  const nextSlide = () => {
    setPosition(0)
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1))
  }

  const arrowStyles = {
    cursor: 'pointer',
    pos: 'absolute',
    top: '50%',
    w: 'auto',
    mt: '-22px',
    p: '16px',
    color: useColorModeValue('black', 'white'),
    fontWeight: 'bold',
    fontSize: '18px',
    transition: '0.6s ease',
    borderRadius: '0 3px 3px 0',
    userSelect: 'none',
    _hover: {
      opacity: 0.8,
      bg: useColorModeValue('gray.200', 'black'),
    },
  } as any

  const handleSelection = (option) => {
    if (option.answer) {
      setPosition(100)
      setFireConfetti(true)
      setTimeout(() => setFireConfetti(false), 3000)
    }
  }

  const Wrapper = (props) => <div style={{ position: 'relative' }} {...props} />

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      // And swap it with the current element.
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }

    return array
  }

  const Choices = () => {
    return (
      <Flex w="full" p={10} alignItems="center" justifyContent="center">
        {slides?.map((slide, sid) => {
          if (currentSlide === sid) {
            const options = [
              <button
                key="choice-1"
                onClick={() => handleSelection(slide.options[0])}
                className="game-button"
              >
                {slide.options[0].name}
              </button>,
              <button
                key="choice-2"
                onClick={() => handleSelection(slide.options[1])}
                className="game-button orange"
              >
                {slide.options[1].name}
              </button>,
              <button
                key="choice-3"
                onClick={() => handleSelection(slide.options[2])}
                className="game-button red"
              >
                {slide.options[2].name}
              </button>,
              <button
                key="choice-4"
                onClick={() => handleSelection(slide.options[3])}
                className="game-button green"
              >
                {slide.options[3].name}
              </button>,
            ]
            return (
              <Flex direction={['column', 'row']}>
                {options.map((option) => option)}
              </Flex>
            )
          }
        })}
      </Flex>
    )
  }

  const carouselStyle = {
    transition: 'all .5s',
    ml: `-${currentSlide * 100}%`,
  }

  useEffect(() => {
    console.log('working')
  }, [])

  return (
    <Box>
      <Wrapper>
        <Flex w="full" p={[3, 10]} alignItems="center" justifyContent="center">
          <Flex w="full" overflow="hidden" pos="relative">
            <Flex h={['15vh', '60vh']} w="full" {...carouselStyle}>
              {slides.map((slide, sid) => (
                <Box key={`slide-${sid}`} boxSize="full" flex="none">
                  <Text
                    color="white"
                    fontSize="xs"
                    p="8px 12px"
                    pos="absolute"
                    top="0"
                  >
                    {sid + 1} / {slidesCount}
                  </Text>
                  <Center h="100%">
                    <Box w={[180, 500]}>
                      <GuessWho
                        guessImage={slide.guessImage}
                        actualImage={slide.actualImage}
                        position={position}
                      />
                    </Box>
                  </Center>
                </Box>
              ))}
            </Flex>
            <Text {...arrowStyles} left="0" onClick={prevSlide}>
              &#10094;
            </Text>
            <Text {...arrowStyles} right="0" onClick={nextSlide}>
              &#10095;
            </Text>
          </Flex>
        </Flex>
        <Choices />
        <ConfettiWrapper>
          <Confetti active={fireConfetti} config={config} />
        </ConfettiWrapper>
      </Wrapper>
    </Box>
  )
}
export default Carousel
