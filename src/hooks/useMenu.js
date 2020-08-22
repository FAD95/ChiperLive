import {useState}from 'react'

const useMenu = ()=>{
    const [isOpen, setIsOpen] = useState(false)
return [isOpen, setIsOpen]
}

export default useMenu