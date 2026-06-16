export const authMiddleware = (req, res, next) => {
  //logic to check login
  try {
    const isLoggedin = false;
    if (isLoggedin) {
        next();
    } else {
        res.status(200).json({loginStatus:"unauthorized"});
    }
  } catch {
    res.status(500).json({error:"there was an error"});
  }
};
