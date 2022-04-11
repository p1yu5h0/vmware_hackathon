import cookie from 'cookie';
import { verify } from 'jsonwebtoken';

export const verifyAuth = (req)=>{
    if (req.headers.cookie) {
        const {token} = cookie.parse(req.headers.cookie);
        console.log(token)
        try {
            verify(token,process.env.ACCESS_TOKEN_SECRET);
            return token;
        }catch(err) {
            console.log(err)
            return false;
        }
    }
 

    return false;

}

export const verifyAuthBackend = (req)=>{
    if (req.cookies?.token) {
        try {
            const token = req.cookies.token
            verify(token,process.env.ACCESS_TOKEN_SECRET)
            return true;
        }catch(err) {
            console.log(err)
            return false;
        }
    }
}