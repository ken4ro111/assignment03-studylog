import { Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export const Page404 = () => {
  return (
    <div>
      <Heading>ページが見つかりません</Heading>
      <Link to="/">ログイン</Link>
    </div>
  )
}
