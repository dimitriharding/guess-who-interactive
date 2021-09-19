import { useRef, useState } from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input,
  Stack,
  useColorModeValue,
  Flex,
  Text,
  Link,
  Box,
  Center,
  InputGroup,
  InputRightElement,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'
import { DividerWithText } from '../DividerWithText'

import { InputControl, SubmitButton } from 'formik-chakra-ui'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { signInWithGoogle, signUpWithEmail } from '../../util/util'

const GoogleButton = ({ onClick }) => {
  return (
    <Center>
      <Button
        w={'full'}
        maxW={'md'}
        variant={'outline'}
        leftIcon={<FcGoogle />}
        onClick={onClick}
      >
        <Center>
          <Text>Continue with Google</Text>
        </Center>
      </Button>
    </Center>
  )
}

const Account = ({ onOpen, isOpen, onClose }) => {
  const initialRef = useRef()
  const { isOpen: isToggled, onToggle } = useDisclosure()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  const initialValues = {
    email: '',
    password: '',
    passwordConfirmation: '',
  }
  const validationSchema = Yup.object({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required'),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
    ),
  })

  const onSubmit = async (values) => {
    setIsLoading(true)
    const data = await signUpWithEmail(values)
    setIsLoading(false)
    console.log({ data })
  }

  const onClickReveal = () => {
    onToggle()
    const input = inputRef.current
    if (input) {
      input.focus({ preventScroll: true })
      const length = input.value.length * 2
      requestAnimationFrame(() => {
        input.setSelectionRange(length, length)
      })
    }
  }

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={5}>
            <Flex
              align={'center'}
              justify={'center'}
              bg={useColorModeValue('gray.50', 'gray.800')}
            >
              <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                  <Text fontSize={'lg'} color={'gray.600'}>
                    Get an account to enjoy additional cool{' '}
                    <Text color={'blue.400'}>features ✌️</Text>
                  </Text>
                </Stack>
                <Box
                  rounded={'lg'}
                  bg={useColorModeValue('white', 'gray.700')}
                  boxShadow={'lg'}
                  p={8}
                >
                  <GoogleButton
                    onClick={async () => {
                      const data = await signInWithGoogle()
                      console.log({ data })
                    }}
                  />
                  <br />
                  <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                  >
                    {({ handleSubmit, values, errors }) => (
                      <Stack
                        spacing={4}
                        as="form"
                        onSubmit={handleSubmit as any}
                      >
                        <DividerWithText>
                          or continue with email
                        </DividerWithText>
                        <InputControl name="email" label="Email address" />
                        <InputGroup>
                          <InputControl name="password" label="Password" />
                          <InputRightElement>
                            <IconButton
                              bg="transparent !important"
                              variant="ghost"
                              aria-label={
                                isToggled ? 'Mask password' : 'Reveal password'
                              }
                              icon={isToggled ? <HiEyeOff /> : <HiEye />}
                              onClick={onClickReveal}
                            />
                          </InputRightElement>
                        </InputGroup>
                        <InputControl
                          name="passwordConfirmation"
                          label="Password Confirmation"
                        />
                        <Stack spacing={10}>
                          <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            align={'start'}
                            justify={'space-between'}
                          >
                            <Link color={'blue.400'}>Have an account?</Link>
                          </Stack>
                          <SubmitButton
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                              bg: 'blue.500',
                            }}
                            isLoading={isLoading}
                          >
                            Sign Up
                          </SubmitButton>
                        </Stack>
                      </Stack>
                    )}
                  </Formik>
                </Box>
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
export default Account
