import React, { useCallback, useState } from 'react'
import {
  Box,
  Button,
  chakra,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
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
} from '@chakra-ui/react'
import GuessWho from '../components/ui/GuessWho'
import { useDropzone } from 'react-dropzone'
import ImageCard from '../components/ui/ImageCard'

export default function Editor() {
  const [uploadedFiles, setUploadFiles] = useState([])
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setUploadFiles(uploadedFiles.concat(acceptedFiles))
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const ImageList = () => {
    return (
      <>
        {uploadedFiles.map((file, index) => (
          <div key={file.name}>
            <ImageCard
              id={index}
              name={file.name}
              type={file.type}
              url={URL.createObjectURL(file)}
              size={file.size}
              onRemove={(id) => {
                const newlist = uploadedFiles.filter(
                  (file, index) => id !== index
                )
                setUploadFiles(newlist)
              }}
            />
          </div>
        ))}
      </>
    )
  }
  return (
    <Box bg={useColorModeValue('gray.50', 'inherit')} p={10}>
      <Box>
        <SimpleGrid
          display={{ base: 'initial', md: 'grid' }}
          columns={{ md: 3 }}
          spacing={{ md: 6 }}
        >
          <GridItem colSpan={{ md: 1 }}>
            <Box px={[4, 0]}>
              <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                {'Custom "Guess Who" Editor'}
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue('gray.600', 'gray.400')}
              >
                Your deck is only minutes away. Upload your images and we'll
                take care of the us
                <br />
                <br />
                - Remove backgrounds
                <br />- Mask images with black
              </Text>
              <Box p={5}>
                <Divider />
              </Box>

              <GuessWho
                guessImage="https://seetyah.s3.amazonaws.com/dvh.png"
                actualImage="https://ca.slack-edge.com/T0CA1SGCU-U0CA8MY8N-53b022d8447e-512"
              />
            </Box>
          </GridItem>
          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
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
                <div>
                  <FormControl id="email" mt={1}>
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
                    />
                    <FormHelperText>
                      Brief description about your deck.
                    </FormHelperText>
                  </FormControl>
                </div>

                <FormControl>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue('gray.700', 'gray.50')}
                  >
                    Add your images
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
                            color={useColorModeValue('brand.600', 'brand.200')}
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
                <ImageList />
              </Stack>
              <Box
                px={{ base: 4, sm: 6 }}
                py={3}
                bg={useColorModeValue('gray.50', 'gray.900')}
                textAlign="right"
              >
                <Button
                  type="submit"
                  colorScheme="brand"
                  _focus={{ shadow: '' }}
                  fontWeight="md"
                >
                  Save
                </Button>
              </Box>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Box>
  )
}
