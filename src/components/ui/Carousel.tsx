import React, { useEffect, useState } from 'react'
import { Box, Flex, useColorModeValue, Text, Center } from '@chakra-ui/react'
import GuessWho from './GuessWho'
import Confetti from 'react-dom-confetti'

const Carousel = ({ slides }) => {
  const [confetti, setConfetti] = useState(false)
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
  }

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
  }

  const handleSelection = (option) => {
    setConfetti(option.answer)
  }

  const ConfettiWrapper = (props) => (
    <div style={{ position: 'absolute', left: '50%', top: '50%' }} {...props} />
  )

  const Wrapper = (props) => <div style={{ position: 'relative' }} {...props} />

  const Choices = () => {
    return (
      <Flex w="full" p={10} alignItems="center" justifyContent="center">
        {slides?.map((slide, sid) => {
          if (currentSlide === sid) {
            return (
              <>
                <button
                  onClick={() => handleSelection(slide.options[0])}
                  className="game-button"
                >
                  {slide.options[0].name}
                </button>
                <button
                  onClick={() => handleSelection(slide.options[1])}
                  className="game-button orange"
                >
                  {slide.options[1].name}
                </button>
                <button
                  onClick={() => handleSelection(slide.options[2])}
                  className="game-button red"
                >
                  {slide.options[2].name}
                </button>
                <button
                  onClick={() => handleSelection(slide.options[3])}
                  className="game-button green"
                >
                  {slide.options[3].name}
                </button>
              </>
            )
          }
        })}
      </Flex>
    )
  }

  const [currentSlide, setCurrentSlide] = useState(0)

  const slidesCount = slides.length

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1))
  }
  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1))
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
        <Flex w="full" p={10} alignItems="center" justifyContent="center">
          <Flex w="full" overflow="hidden" pos="relative">
            <Flex h="60vh" w="full" {...carouselStyle}>
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
                    <Box w={[150, 500]}>
                      <GuessWho
                        guessImage={slide.guessImage}
                        actualImage={slide.actualImage}
                        position={0}
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
          <Confetti active={true} config={config} />
        </ConfettiWrapper>
      </Wrapper>
    </Box>
  )
}
export default Carousel
