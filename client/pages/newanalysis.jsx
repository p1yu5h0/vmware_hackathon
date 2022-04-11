import React, { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import Papa from "papaparse";
import axios from "axios";
import { verifyAuth } from "../utils/authVerification";
import { getDecodedDataAPI } from "../api";
import { useRouter } from "next/dist/client/router";

const allowedExtensions = ["csv", "json"];


const PreProcess = async(uploaded)=>{

    const reader = new FileReader();
    reader.onloadend = async({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const data = csv?.data;
      const dict = {};
      for(let i=0; i<data.length; ++i) {
        if (data[i]['OEM']) {
          data[i]['OEM'] = data[i]['OEM'].split('-')[0];
        }
        if (data[i]['Country']) {
          if (!data[i]['Region']) {
            if (dict[data[i]['Country']]) {
              data[i]['Region'] = dict[data[i]['Country']];
            }
          }
          else {
            dict[data[i]['Country']] = data[i]['Region']
          }
        }
      }
      console.log(data.length)
      const newFormData = new FormData();
      var csvData = new Blob([Papa.unparse(data)], {type: 'text/csv;charset=utf-8;'});
      var csvURL = window.URL.createObjectURL(csvData);
      var tempLink = document.createElement('a');
      tempLink.href = csvURL;
      console.log(tempLink);
      newFormData.append('link', tempLink)
      newFormData.append('data', JSON.stringify(data))
      await fetch('http://127.0.0.1:5000/file', {
        method : 'POST',
        body : newFormData,
        mode : "no-cors",
      })
    };
    reader.readAsText(uploaded);
  
}


export const getServerSideProps = (ctx) => {
  const isAuth = verifyAuth(ctx.req);
  if (!isAuth) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { token: isAuth },
  };
};

const InputField = ({label,name, type,onChange,value})=>{
  return (
    <div className="">
      <label htmlFor={name} className="hidden text-sm ">{label}</label>
      <input type={type||'text'} onChange={onChange} value={value} className=" w-[360px] h-[45px] p-2 text-sm bg-bgcolor border-[1px] border-gray-600 rounded-sm"  placeholder={label} />
    </div>
  )
}

const InputDropdown = ({onChange,options,value,label ,name})=>{
  return (
  
      <div className="opacity-70">
        <select name={name} onChange={onChange} value={value} id={name} className=" w-[360px] h-[45px] p-2 text-sm bg-bgcolor border-[1px] border-gray-600 rounded-sm" >
          <option value="" disabled  hidden >{label}</option>
          {options.map((option, idx)=>(
            <option key={idx} value={option.value}>{option.title}</option>
          ))}
        </select>
      </div>
    
  )
}

const NewAnalysis = () => {
  const [file, setFile] = useState(null);
  const [form,setForm] = useState({
    region : '',
    country : '',
    cost : '',
    oem : '',
    pname : '',
    category : ''
  })
  const router = useRouter();
  const handleChange = (e)=>{


  }
  const [keys, setKeys] = useState([]);
  const [decodeData,setDecodeData] = useState(null);
  const [nextStep, setNextStep] = useState(false);
  const [error, setError] = useState("");
  const [uploaded, setUploaded] = useState();
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {};
  const handleFileChange = async (e) => {
    setError("");
    setLoading(true);
    if (e.target.files.length) {
      const file = e.target.files[0];
      const extension = file?.type.split("/")[1];
      if (!allowedExtensions.includes(extension)) {
        setTimeout(() => {
          setLoading(false);
          setError(
            `${extension} files are not allowed. Please upload CSV or JSON file.`
          );
          return;
        }, 2000);
      } else {
        setTimeout(() => {
          setLoading(false);
          setUploaded(file);
        }, 2000);
      }
    }
  };
  
  const handleContinue = async () => {
    console.log('INSIDE CONTINUE')
    setLoading(true)
    const formData = new FormData();
    formData.append('file', uploaded)
    formData.append("upload_preset", "nwd6b30a")
    const res = await fetch('https://api.cloudinary.com/v1_1/unesco-admin/raw/upload', {
      method : 'POST',
      body : formData
    })
    const result = await res.json();
    const {url} = result;
    localStorage.setItem('fileLink', url);
    router.push('/analysis')
    setLoading(false);
  };
  return (

      <div className="flex items-center flex-col justify-center  h-[80vh] w-[auto] ">
        <div className="text-4xl">
          {!uploaded ? (
            <span className="font-semibold">ADD FILE</span>
          ) : (
            uploaded.name
          )}
        </div>
        <div
          className={`mt-3 font-thin tracking-wide ${
            error ? "text-red-200" : "text-white"
          }`}
        >
          {error ? error : "You can add JSON, CSV or Excel Files"}
        </div>
        <div className="mt-16">
          {!uploaded ? (
            <div className="w-[450px] h-[270px] border-[1px] border-dashed flex items-center justify-center">
              {!loading ? (
                <IoIosAddCircleOutline className="opacity-20" size={50} />
              ) : (
                <div className="animate-pulse">Loading...</div>
              )}
              <div className="w-[0px] h-[0px] opacity-0 relative -left-20 -top-5">
                <input type="file" onChange={handleFileChange} />
              </div>
            </div>
          ) : (
            <div className="flex space-x-7">
              <div>
                <button
                  className="px-2 py-1 bg-white text-bgcolor rounded-md"
                  onClick={() => handleContinue()}
                >
                  {loading ? "loading" : "Continue"}
                </button>
              </div>
              <div>
                <button
                  className="px-3 py-1 border-[1px] rounded-md"
                  onClick={() => setUploaded("")}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

  );
};

export default NewAnalysis;
