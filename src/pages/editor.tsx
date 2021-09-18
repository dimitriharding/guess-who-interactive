import React, { useCallback, useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Box,
  Button,
  chakra,
  FormControl,
  FormLabel,
  GridItem,
  SimpleGrid,
  Stack,
  useColorModeValue,
  Flex,
  Text,
  Textarea,
  FormHelperText,
  Icon,
  VisuallyHidden,
  Divider,
  Input,
  RadioGroup,
  Radio,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Center,
} from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
import ImageCard from '../components/ui/ImageCard'
import { createUserId, removeBackground, uploadImage } from '../util/util'
import { createAnonUser } from '../util/API/user'
import { createDeck } from '../util/API/deck'
import { createGuessOptions } from '../util/API/guess-options'
import Result from '../components/ui/Result'
import LeftPanel from '../components/Editor/LeftPanel'
import SharePanel from '../components/Editor/SharePanel'

export default function Editor() {
  const [removingBackground, setRemovingBackground] = useState(false)
  const [uploadedFiles, setUploadFiles] = useState([])
  const [currentUserId, setCurrentUserId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [guessOptions, setGuessOptions] = useState({})
  const [showAlert, setShowAlert] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [opacityState, setOpacityState] = useState('')
  const [deckData, setDeckData] = useState(null)
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      const arrSet = [...uploadedFiles, ...acceptedFiles]
      if (arrSet[10] !== undefined) {
        setShowAlert(true)
        const newFiles = arrSet.splice(0, 10)
        setUploadFiles([...newFiles])
      } else {
        setShowAlert(false)
        setUploadFiles([...arrSet])
      }
    },
    [uploadedFiles]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/png,image/jpeg',
  })

  const saveImages = async () => {
    setRemovingBackground(true)
    const [deck] = await createDeck({
      owner: currentUserId,
      name,
      description,
    })
    setDeckData(deck)
    const { id: deckId } = deck
    const originalImageUploadResponse = await Promise.all(
      uploadedFiles.map((file) => uploadImage({ file, deckId }))
    )
    const removeBackgroundResponse = await Promise.all(
      uploadedFiles.map(removeBackground)
    )
    const removeBackgroundImageUploadResponse = await Promise.all(
      removeBackgroundResponse.map((file) =>
        uploadImage({ file, deckId, noBg: true })
      )
    )

    const finalGuessOptions = uploadedFiles.map((file, index) => {
      const option = {
        deck_id: deckId,
        original_image: originalImageUploadResponse[index],
        masked_image: removeBackgroundImageUploadResponse[index],
        options: {
          data: guessOptions[file.name].options.split(',').map((option) => {
            return {
              name: option,
              answer: guessOptions[file.name].answer === option,
            }
          }),
        },
      }
      return option
    })
    const response = await createGuessOptions(finalGuessOptions)
    setRemovingBackground(false)
  }

  const toggleOpacity = (action) => {
    if (action === 'out') {
      setOpacityState('100%')
    }

    if (action === 'over') {
      setOpacityState('80%')
    }
  }

  useEffect(() => {
    // check if user exist, if not create in database
    const userId = window.localStorage.getItem('gw:UserId')
    if (userId) {
      //  user exist
      setCurrentUserId(userId)
      console.log('user existing')
    } else {
      // create a user in the database
      const userId = createUserId()
      createAnonUser(userId)
        .then(() => {
          window.localStorage.setItem('gw:UserId', userId)
          setCurrentUserId(userId)
        })
        .catch((error) => {
          console.log({ error })
        })
    }
  }, [])

  return (
    <Box h="100vh" bg={useColorModeValue('gray.50', 'inherit')} p={10}>
      <Box>
        <SimpleGrid
          display={{ base: 'initial', md: 'grid' }}
          columns={{ md: 3 }}
          spacing={{ md: 6 }}
        >
          <GridItem colSpan={{ md: 1 }}>
            <LeftPanel />
          </GridItem>
          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
            {!completed ? (
              <chakra.form
                method="POST"
                shadow="base"
                rounded={[null, 'md']}
                overflow={{ sm: 'hidden' }}
              >
                <Stack
                  px={4}
                  py={5}
                  bg={useColorModeValue('white', 'gray.700')}
                  spacing={6}
                  p={{ sm: 6 }}
                >
                  <FormControl id="name" mt={1}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      Name
                    </FormLabel>
                    <Input
                      placeholder="My Deck"
                      mt={1}
                      shadow="sm"
                      focusBorderColor="brand.400"
                      fontSize={{ sm: 'sm' }}
                      onInput={(event) => setName(event.currentTarget.value)}
                    />
                    <FormHelperText>
                      Easy identifiable name for your deck
                    </FormHelperText>
                  </FormControl>
                  <FormControl id="about" mt={1}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      About
                    </FormLabel>
                    <Textarea
                      placeholder="This is the best Guess Who deck ever!"
                      mt={1}
                      rows={3}
                      shadow="sm"
                      focusBorderColor="brand.400"
                      fontSize={{ sm: 'sm' }}
                      onInput={(event) =>
                        setDescription(event.currentTarget.value)
                      }
                    />
                    <FormHelperText>
                      Brief description about your deck.
                    </FormHelperText>
                  </FormControl>
                  {showAlert && (
                    <>
                      <Alert status="error">
                        <AlertIcon />
                        <AlertTitle mr={2}>
                          Your selection was more than 10!
                        </AlertTitle>
                        <AlertDescription>
                          If you would like to create a deck with more than 10
                          images, you can buy credit to increase the limit.
                        </AlertDescription>
                        <CloseButton
                          position="absolute"
                          right="8px"
                          top="8px"
                        />
                      </Alert>
                      <a
                        id="checkout-button"
                        href="https://flurly.com/p/whodat-credit-purchase-15"
                        onMouseOver={() => toggleOpacity('over')}
                        onMouseOut={() => toggleOpacity('out')}
                        style={{
                          opacity: opacityState,
                        }}
                      >
                        <img
                          src="https://flurly.com/buy-now.svg"
                          style={{
                            height: '3em',
                            backgroundColor: 'white',
                          }}
                        />
                      </a>
                    </>
                  )}
                  <FormControl>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue('gray.700', 'gray.50')}
                    >
                      {`Add your images (${uploadedFiles.length}/10)`}
                    </FormLabel>
                    <div {...getRootProps()}>
                      <VisuallyHidden>
                        <input {...getInputProps()} />
                      </VisuallyHidden>
                      <Flex
                        mt={1}
                        justify="center"
                        px={6}
                        pt={5}
                        pb={6}
                        borderWidth={2}
                        borderColor={useColorModeValue('gray.300', 'gray.500')}
                        borderStyle="dashed"
                        rounded="md"
                      >
                        <Stack spacing={1} textAlign="center">
                          <Icon
                            mx="auto"
                            boxSize={12}
                            color={useColorModeValue('gray.400', 'gray.500')}
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth="2"
                              //@ts-ignore
                              strokLinecap="round"
                              strokeLinejoin="round"
                            />
                          </Icon>
                          <Flex
                            fontSize="sm"
                            color={useColorModeValue('gray.600', 'gray.400')}
                            alignItems="baseline"
                          >
                            <chakra.label
                              for="file-upload"
                              cursor="pointer"
                              rounded="md"
                              fontSize="md"
                              color={useColorModeValue(
                                'brand.600',
                                'brand.200'
                              )}
                              pos="relative"
                              _hover={{
                                color: useColorModeValue(
                                  'brand.400',
                                  'brand.300'
                                ),
                              }}
                            >
                              {isDragActive ? (
                                <p>Drop the files here ...</p>
                              ) : (
                                <span>
                                  {
                                    "Drag 'n' drop some files here, or click to select files"
                                  }
                                </span>
                              )}
                            </chakra.label>
                          </Flex>
                          <Text
                            fontSize="xs"
                            color={useColorModeValue('gray.500', 'gray.50')}
                          >
                            PNG, JPG
                          </Text>
                        </Stack>
                      </Flex>
                    </div>
                  </FormControl>
                  {uploadedFiles.map((file, index) => {
                    const options = guessOptions[file.name]
                      ? guessOptions[file.name].options.split(',')
                      : []
                    return (
                      <div key={file.name}>
                        <ImageCard
                          file={file}
                          id={index}
                          name={file.name}
                          type={file.type}
                          url={URL.createObjectURL(file)}
                          size={file.size}
                          onRemove={(fileName) => {
                            const newList = uploadedFiles.filter(
                              (file) => fileName !== file.name
                            )
                            setUploadFiles([...newList])
                          }}
                        />
                        <br />
                        <Input
                          onInput={(event) => {
                            const data = event.currentTarget.value
                            const object = {
                              [file.name]: {
                                options: data,
                              },
                            }
                            setGuessOptions({ ...guessOptions, ...object })
                          }}
                          placeholder="Enter 4 options separated by a comma (,)"
                        />
                        <br />
                        <br />
                        <RadioGroup
                          onChange={(value) => {
                            const object = guessOptions[file.name]
                            const currentOption = {
                              [file.name]: {
                                ...object,
                                answer: value,
                              },
                            }
                            setGuessOptions({
                              ...guessOptions,
                              ...currentOption,
                            })
                          }}
                        >
                          <Stack direction={['column', 'row']}>
                            {options.map((option) => (
                              <Radio key={option} value={option}>
                                {option}
                              </Radio>
                            ))}
                          </Stack>
                        </RadioGroup>
                        <br />
                        <Divider />
                      </div>
                    )
                  })}
                </Stack>
                <Box
                  px={{ base: 4, sm: 6 }}
                  py={3}
                  bg={useColorModeValue('gray.50', 'gray.800')}
                  textAlign="right"
                >
                  {uploadedFiles.length !== 0 && (
                    <Button
                      colorScheme="red"
                      _focus={{ shadow: '' }}
                      fontWeight="md"
                      onClick={saveImages}
                      isLoading={removingBackground}
                    >
                      Create my deck
                    </Button>
                  )}
                </Box>
              </chakra.form>
            ) : (
              <Center
                style={{
                  marginTop: '10%',
                  flexDirection: 'column',
                }}
              >
                <Result
                  title="You have successfully created your whoDat deck!"
                  subTitle="You can now share with friends & family or play!"
                  extra={[
                    <Link
                      key="button-extra-1"
                      href={`/deck/${deckData ? deckData.id : ''}`}
                    >
                      <Button>Go to Deck</Button>
                    </Link>,
                    <Button variant="ghost" key="account-button-2">
                      {' '}
                      Create an Account{' '}
                    </Button>,
                  ]}
                  status="success"
                />
                <Box mt="5">Share Options</Box>
                <SharePanel shareUrl={`https://whodat.name/deck`} />
              </Center>
            )}
          </GridItem>
        </SimpleGrid>
      </Box>
    </Box>
  )
}
