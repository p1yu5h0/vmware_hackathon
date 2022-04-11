import jwt from 'jsonwebtoken'
import cookie from 'cookie';
export default async function loginHandler (req,res) {
    if (req.method==='POST') {
        const {email : username ,password} = req.body;
        console.log(username,password); 
        if (!username || !password) return res.status(406).json({message : 'Missing credentials'})
        if (username!=='admin' || password!=='admin') return res.status(406).json({message : 'Invalid Username or Password'});
        const token = jwt.sign({userId : 1}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn : '1d'
        });
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              maxAge: 60 * 60 * 24 * 7, // 1 week
              sameSite: "strict",
              path: "/",
            })
        )
        return res.json({status : true})
    }

}