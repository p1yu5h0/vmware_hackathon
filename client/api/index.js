import Axios from "axios";

export const flask = Axios.create({
    baseURL : 'http://localhost:5000'
})

export const axios = Axios.create({
    baseURL : 'http://localhost:3000/api',
    withCredentials : true,
    timeout : 3000
})

export const loginAPI =async (formData)=>{
    const res = await axios.post('/login', formData);
    return res;
}

export const logoutUserAPI = async()=>{
    const res = await axios.get('/logout');
    return res;
}



export const getDecodedDataAPI = async()=>{
    const newForm = new FormData();
    newForm.append('link', localStorage.getItem('fileLink'))
    const res = await flask.post('/decodedata', newForm);
    return res;    
}
export const getDateVSaleAPI = async()=>{
    const newForm = new FormData();
    newForm.append('link', localStorage.getItem('fileLink'))
    const res = await flask.post('/datevsale', newForm)
    return res;
}

export const getTopTenProductAPI = async()=>{
    const newForm = new FormData();
    newForm.append('link', localStorage.getItem('fileLink'))
    const res = await flask.post('/toptenprod', newForm);
    return res;
}

export const getAssetQuantityAPI = async()=>{
    const newForm = new FormData();
    newForm.append('link', localStorage.getItem('fileLink'))
    const res = await flask.post('/assetQuantity', newForm);
    return res;
}

export const getRegionWiseAssetQuantityAPI = async()=>{
    const newForm = new FormData();
    newForm.append('link', localStorage.getItem('fileLink'))
    const res=  await flask.post('/regionWiseAssetQuantity', newForm);
    return res;
}

export const getCountryWiseAssetQuantityAPI = async()=>{
    const newForm = new FormData();
    newForm.append('link', localStorage.getItem('fileLink'))
    const res = await flask.post('/CountryWiseAssetQuantity', newForm)
    return res;
}

export const getAssetWiseSalesAPI = async()=>{
    const newForm = new FormData();
    newForm.append('link', localStorage.getItem('fileLink'))
    const res = await flask.post('/assetWiseSales', newForm);
    return res;
}

export const getCountryWiseSalesAPI = async()=>{
    const newForm = new FormData();
    newForm.append('link', localStorage.getItem('fileLink'))
    const res = await flask.post('/countryWiseSales', newForm);
    return res;
}


export const getToptenprodQuanAPI = async()=>{
    const newForm = new FormData();
    newForm.append('link', localStorage.getItem('fileLink'))
    const res = await flask.post('/toptenprodQuan', newForm);
    return res;
}

export const getOemWiseQuantityAPI = async ()=>{
    const newForm = new FormData();
    newForm.append('link', localStorage.getItem('fileLink'))
    const res = await flask.post('/oemWiseQuantity', newForm);
    return res;
}

export const getOemWiseSaleAPI = async()=>{
    const newForm = new FormData();
    newForm.append('link', localStorage.getItem('fileLink'))
    const res = await flask.post('/oemWiseSale', newForm);
    return res;
}