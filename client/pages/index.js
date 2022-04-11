import React, {useState} from 'react';
import Image from 'next/image';
import {VscUnlock} from 'react-icons/vsc';
import { useRouter } from 'next/dist/client/router';
import { verifyAuth } from '../utils/authVerification';
import { loginAPI } from '../api';


export const getServerSideProps = (ctx)=>{
  const isAuth = verifyAuth(ctx.req);
  if (isAuth) {
    return {
      redirect : {
        destination : '/newanalysis',
        permanent : false
      }
    }
  }
  return {
    props : {}
  }
}

const InputField = ({name,onChange,value,label,placeholder, type})=>{

  return (
  <div>
    <label htmlFor={name} className='text-sm block'>{label}</label>
    <input onChange={onChange} value={value} name={name} type={type} className='mt-3 h-[40px] bg-bgcolor outline-none border-[1px] border-gray-500 placeholder:text-gray-500 p-2 rounded-sm w-[420px] text-sm' placeholder={placeholder} />
  </div>
  )
}

const Home = () => {
  const router = useRouter();
  const [error,setError] = useState('')
  const [form,setForm] = useState({
    email : '',
    password : ''
  })
  const handleSubmit = async ()=>{
    console.log(form)
    try {
      const res = await loginAPI(form);
      console.log(res);
      router.push('/newanalysis')
    }
    catch(err) {
      console.log(err);
      setError(err.response.data.message);
    }
  }
  const handleChange = (e)=>{
    setForm((prevForm)=>({
      ...prevForm, [e.target.name] : e.target.value
    }))
    setError('')
  }
  return (
    <div className='flex justify-between overflow-hidden h-[100vh]'>
      <div className='p-20'>
        <div>
          <Image src='/logo.png' height="32.5px" width="257px"/>
        </div>
        <div className='mt-32 flex items-center space-x-3'>
          <VscUnlock size={33}/>
          <div className={`${error?'text-red-300':'text-white'} font-normal text-3xl`}>{error?'Error While Logging In':'LOGIN'}</div>
        </div>
        <div className={` ${error?'text-red-300':'text-white'} text-sm mt-3 font-light`}>{error?error:'Login to save your data evaluations, add notes, and analyse.'}</div>
        <div className='mt-10 space-y-7'>
          <InputField label="EMAIL *" placeholder='Enter your email' name="email" onChange={handleChange} value={form.email}/>
          <InputField label="PASSWORD *" placeholder='Enter your password' name="password" onChange={handleChange} value={form.password}/>
        </div>
        <div className='mt-9 flex justify-between w-[420px] items-center'>
          <div className='flex items-center space-x-2'>
            <input type="checkbox" className='appearance-none border-[1px] rounded-sm h-4 w-4 checked:bg-primary' />
            <div className='text-gray-200 text-sm'>Remember Me</div>
          </div>
          <div className='text-sm text-primary cursor-pointer'>Forget Password?</div>
        </div>
        <button onClick={handleSubmit} className='w-[420px] bg-primary mt-7 h-[37px] rounded-md'>PROCEED</button>
      </div>
      <div className=' flex relative'>
        
      <div className='absolute left-[40vw] -top-[220px] z-10'>
          <Image src="/rect2.svg" height="546" width="200"/>
          <div className='relative right-[600px] top-[400px]'>
        <Image src="/bottom.svg" height="245" width="217"/>
          </div>
        </div>
        <div className='relative top-[300px] left-[650px] '>
        <Image src="/rectsm.svg" height="129" width="98"/>

          </div>
         
        <div className='relative left-[400px] top-[300px] z-20'>
          <Image src="/rectlowbottom.svg" height="841px" width="1200px"/>
          <div className='relative '>
        <Image src="/bottom.svg" height="245" width="217"/>

          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Home