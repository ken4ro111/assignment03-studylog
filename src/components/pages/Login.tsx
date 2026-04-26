import { Box, Divider, Flex, Heading, Input, Stack } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from '../atom/button/PrimaryButton'

export const Login = () => {
  const [userId, setUserId] = useState('')
  const navigate = useNavigate()

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          学習管理アプリ
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input
            placeholder="ユーザーID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <PrimaryButton onClick={() => navigate('/study-records')}>
            ログイン
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  )
}
