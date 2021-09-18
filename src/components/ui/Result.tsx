import {
  Heading,
  Text,
  Flex,
  Icon,
  Center,
  Box,
  Grid,
  Button,
  ButtonGroup,
} from '@chakra-ui/react'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'

const statusData = {
  success: {
    icon: AiFillCheckCircle,
    color: 'teal.500',
  },
  error: {
    icon: AiFillCloseCircle,
    color: 'red.500',
  },
}

const Result = ({ status, title, subTitle, extra }) => {
  return (
    <Flex direction="column" align="center">
      <Icon
        as={statusData[status].icon}
        w={150}
        h={150}
        color={statusData[status].color}
        mb={8}
      />
      <Heading>{title}</Heading>
      <Text color="gray.400">{subTitle}</Text>
      <ButtonGroup mt={8} spacing={3}>
        {extra && extra.map((component) => component)}
      </ButtonGroup>
    </Flex>
  )
}

export default Result
