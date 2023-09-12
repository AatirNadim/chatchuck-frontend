import React, { useContext } from 'react'
import LoaderSvg from '../assets/SVGs/LoaderSvg'
import { UserContext, UserContextType } from "../Contexts/UserContext";

const Loader = () => {
  const { dispLoader , setDispLoader } = useContext(UserContext) as UserContextType;
  return (
    <div className={`fixed inset-0 flex h-screen w-screen justify-center items-center bg-[#fffff0] z-10 ${dispLoader ? '' : 'hidden'} `} >
      <LoaderSvg  />
    </div>
  )
}

export default Loader