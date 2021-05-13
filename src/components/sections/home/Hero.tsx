import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Flex,
  Image,
  Heading,
  Stack,
  Text,
  Spacer,
  Center,
} from '@chakra-ui/react'
import GuessWho from '../../ui/GuessWho'

export default function Hero({
  title,
  subtitle,
  image,
  ctaLink,
  ctaText,
  ...rest
}) {
  return (
    <Flex
      align="center"
      justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
      direction={{ base: 'column-reverse', md: 'row' }}
      wrap="no-wrap"
      minH="70vh"
      px={8}
      mb={16}
      {...rest}
    >
      <Stack
        spacing={4}
        w={{ base: '80%', md: '40%' }}
        align={['center', 'center', 'flex-start', 'flex-start']}
      >
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="primary.800"
          textAlign={['center', 'center', 'left', 'left']}
        >
          {title}
        </Heading>
        <Heading
          as="h2"
          size="md"
          color="primary.800"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={['center', 'center', 'left', 'left']}
        >
          {subtitle}
        </Heading>
        <Link href={ctaLink}>
          <Button
            colorScheme="primary"
            borderRadius="8px"
            py="4"
            px="4"
            lineHeight="1"
            size="md"
          >
            {ctaText}
          </Button>
        </Link>
        <Text
          fontSize="xs"
          mt={2}
          textAlign="center"
          color="primary.800"
          opacity="0.6"
        >
          No credit card required.
        </Text>
      </Stack>
      <Spacer />
      <Box w={{ base: '80%', sm: '60%', md: '50%' }} mb={{ base: 12, md: 0 }}>
        {/* TODO: Make this change every X secs */}
        {/* <Image src={image} /> */}
        <Box width={500} rounded="1rem" shadow="2xl" p="10">
          <Center>
            <GuessWho
              guessImage="https://seetyah.s3.amazonaws.com/dvh.png"
              actualImage="https://ca.slack-edge.com/T0CA1SGCU-U0CA8MY8N-53b022d8447e-512"
            />
          </Center>
        </Box>
      </Box>
    </Flex>
  )
}

Hero.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  image: PropTypes.string,
  ctaText: PropTypes.string,
  ctaLink: PropTypes.string,
}

Hero.defaultProps = {
  title: 'Guess Who - Make your custom deck today!',
  subtitle:
    'Create a personalized Guess Who deck within minutes that you can play with friends and family.',
  image: 'https://source.unsplash.com/collection/404339/800x600',
  ctaText: 'Create your deck now',
  ctaLink: '/editor',
}
