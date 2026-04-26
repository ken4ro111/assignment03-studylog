import { Flex, Heading } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
  const navigate = useNavigate()
  const onClickHome = useCallback(() => navigate('/'), [navigate])

  return (
    <Flex
      as="nav"
      bg="teal.500"
      color="gray.50"
      align="center"
      justify="space-between"
      padding={{ base: 3, md: 5 }}
    >
      <Flex
        align="center"
        as="a"
        mr={8}
        _hover={{ cursor: 'pointer' }}
        onClick={onClickHome}
      >
        <Heading as="h1" fontSize={{ base: 'md', md: 'lg' }}>
          学習記録一覧
        </Heading>
      </Flex>
    </Flex>
  )
}
