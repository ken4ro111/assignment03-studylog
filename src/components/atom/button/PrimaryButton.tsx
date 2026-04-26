import { Button } from '@chakra-ui/react'
import { memo, type ReactNode } from 'react'

type Props = {
  onClick: () => void
  disabled?: boolean
  loading?: boolean
  children: ReactNode
}

export const PrimaryButton = memo((props: Props) => {
  const { onClick, disabled = false, loading = false, children } = props

  return (
    <Button
      bg="teal.400"
      color="white"
      _hover={{ opacity: 0.8 }}
      disabled={disabled}
      isLoading={loading}
      onClick={onClick}
    >
      {children}
    </Button>
  )
})
