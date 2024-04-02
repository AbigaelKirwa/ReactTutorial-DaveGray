import React from 'react'
import {FaLaptop, FaTablet, FaMobileAlt} from 'react-icons/fa'

const Header = ({title, width}) => {
  return (
    <header className='Header'>
        <h1>{title}</h1>
        {
          width < 768 ? <FaMobileAlt/> 
          : width < 992 ? <FaTablet/> 
          : <FaLaptop/>
        }
    </header>
  )
}

export default Header