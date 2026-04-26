import { memo } from 'react'
import { Header } from '../organisms/Header'
import { Outlet } from 'react-router-dom'

export const HeaderLayout = memo(() => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
})
