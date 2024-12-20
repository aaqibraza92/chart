import React from 'react'
import { Container } from 'react-bootstrap'

export const Header: React.FC = () => {
  return (
   <header className='mainHeader text-center bgLight pt-5 pb-5'>
    <Container>
      <h1 className='mb-0'>
        Header
      </h1>
    </Container>
   </header>
  )
}

export default Header
