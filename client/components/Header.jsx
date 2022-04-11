import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import {IoIosAddCircleOutline} from 'react-icons/io';
import {BsClockHistory} from 'react-icons/bs';
import {RiLogoutBoxRLine} from 'react-icons/ri';
import { useRouter } from 'next/router';
import { logoutUserAPI } from '../api';

const Header = () => {
    const router = useRouter();
    const [path,setPath] = useState(router.pathname);
    const logoutHandler = async ()=>{
        await logoutUserAPI();
        router.push('/');
    }
    useEffect(()=>{
        setPath(router.pathname);
    }, [router.pathname])
    // console.log(path)
    const handleAnalysis = ()=>router.push('/')
    const handleAnalysis2 = ()=>router.push('/pastanalysis')
  return (
      <>
    <div className='pt-7 px-16 pb-4 flex justify-between border-b-[1px] mb-2'>
        <div>
        <Image src='/logo.png' height={32.5/1.2} width={257/1.2}/>
        </div>
        <div className='flex space-x-10'>
            <div className={` ${path==='/newanalysis'?'opacity-100 font-medium':'opacity-80 font-thin'} flex text-sm items-center text-white space-x-2 cursor-pointer`}>
                <IoIosAddCircleOutline className='text-white' size={19}/>
                <div onClick={handleAnalysis}>NEW ANALYSIS</div>
            </div>
            <div className={` ${path==='/pastanalysis'?'opacity-100 font-medium':'opacity-80 font-thin'} flex text-sm items-center text-white space-x-2 cursor-pointer`}>
                <BsClockHistory className='text-white' size={19}/>
                <div onClick={handleAnalysis2}>PAST ANALYSIS</div>
            </div>
            <div onClick={logoutHandler} className='flex text-sm items-center text-primary font-semibold  space-x-1 cursor-pointer'>
                <RiLogoutBoxRLine className='' size={19}/>
                <div>LOGOUT</div>
            </div>
            <div></div>
            <div></div>
        </div>
    </div>
    </>
  )
}

export default Header