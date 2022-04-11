// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  let a = 5;
  if (req.method=='GET') {
    a =6
    res.send(a);
  }
  else {
    res.send(a);
  }
}
