import React, { useEffect, useState } from 'react'
import { Box, Flex, useColorModeValue, Text, Center } from '@chakra-ui/react'
import GuessWho from './GuessWho'
import ReactCanvasConfetti from 'react-canvas-confetti'

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
} as any

const Carousel = ({ slides }) => {
  const [confetti, setConfetti] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [position, setPosition] = useState(0)
  const [animationInstance, setAnimationInstance] = useState(null)

  const slidesCount = slides.length

  const prevSlide = () => {
    setPosition(0)
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1))
  }
  const nextSlide = () => {
    setPosition(0)
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1))
  }

  const makeShot = (particleRatio, opts) => {
    if (animationInstance) {
      setAnimationInstance({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      })
    }
  }

  const fire = () => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    })

    makeShot(0.2, {
      spread: 60,
    })

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    })

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    })

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    })
  }

  const getInstance = (instance) => {
    setAnimationInstance(instance)
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
      fire()
    }
  }

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

  const Confetti = () => {
    return (
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
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
        <Confetti />
      </Wrapper>
    </Box>
  )
}
export default Carousel
