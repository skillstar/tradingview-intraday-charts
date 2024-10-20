import { ReactElement } from 'react'
import type { FC } from "react"
import Footer from "../footer"
import Navbar from "../navbar"

export interface IProps {
  children?: ReactElement
}


const Layout: FC<IProps> = (props) => {
  const { children } = props
  return (
    <div className='layout'>
      <Navbar></Navbar>

      {children}

      <Footer></Footer>
    </div>
  )
}

export default Layout