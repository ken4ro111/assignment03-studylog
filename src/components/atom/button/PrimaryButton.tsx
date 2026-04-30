import { Button } from '@chakra-ui/react'
import type { ButtonProps } from '@chakra-ui/react'
import { memo } from 'react'

type Props = ButtonProps & {
  loading?: boolean
}

export const PrimaryButton = memo((props: Props) => {
  const { loading = false, children, ...rest } = props

  return (
    <Button
      bg="teal.400"
      color="white"
      _hover={{ opacity: 0.8 }}
      isLoading={loading}
      {...rest}
    >
      {children}
    </Button>
  )
})
