import cookie from 'cookie';


export default function logoutHandler(req,res) {
try{ res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", '', {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: -1,
          sameSite: "strict",
          path: "/",
        })
    )
    return res.json({state : true});} catch(err) {
        console.log(err);
        return res.status(406).json({message : 'ERROR LOGGING OUT'})
    }
}