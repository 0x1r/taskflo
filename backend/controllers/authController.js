import User from "../models/userModel.js";
import z from "zod";
import bcrypt from "bcrypt";
import Session from "../models/sessionModel.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.json({
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (isMatch) {
      const existingSession = await Session.findOne({ userid: userFound.id });
      console.log("existingSession", existingSession);
      if (existingSession) {
        return res.json({ message: "you are already logged in" });
      } else {
        const sessionCreated = await Session.create({ userid: userFound.id });
        console.log("sessionCreated", sessionCreated);
        res.cookie("token", sessionCreated.id, {
          signed: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        res.json({ message: "Logging in" });
      }
    } else {
      res.json({ message: "Something went wrong Please try again" });
    }
  } catch (err) {
    res.json({ error: "something went wrong" });
  }
};

export const logout = async(req, res) => {
  const sessionid = req.signedCookies.token;
  const sessionFound = await Session.findById(sessionid);
  // console.log(userFound);
  if (!sessionFound) {
    return res.json({
      message: "user not logged in",
    });
  } 
  res.clearCookie("token");

   await Session.deleteMany({
    userid: sessionFound.userid,
  });
  res.json({ message: "logged out" });
};

export const me = async (req, res) => {
  const sessionid = req.signedCookies.token;
  const userFound = await Session.findById(sessionid).populate("userid");
  if (!userFound) {
    return res.json({
      authenticated: false,
    });
  }
  return res.json({
    authenticated: true,
    token: sessionid,
    name: userFound.userid.name,
    email: userFound.userid.email,
    avatar: userFound.userid.avatar,
  });
};

export const register = async (req, res) => {
  try {
    console.log(req.body);

    const userValidation = z.object({
      name: z.string().min(2),
      email: z.email(),
      password: z.string().min(8),
    });

    const { name, email, password } = req.body;
    const userCreate = userValidation.parse({
      name,
      email,
      password,
    });
    const hashedPassword = await bcrypt.hash(password, 14);
    const newUser = new User({ ...userCreate, password: hashedPassword });
    await newUser.save();
    res.json({ userStatus: "User is created" });
  } catch (err) {
    console.log(err);
    res.json({ error: "something went wrong" });
  }
};

export const test = async (req, res) => {
  try {
    const newUser = new User({
      name: "kick singh",
      email: "kick@gmail.com",
      password: "123",
    });
    await newUser.save();
    res.json({ userStatus: "test User" });
  } catch {
    res.json({ error: "something went wrong" });
  }
};

export const createSession = async (res, userid) => {
  await Session.deleteMany({ userid }); 
  const sessionCreated = await Session.create({ userid });

  res.cookie("token", sessionCreated.id, {
    signed: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  return sessionCreated;
};

export const fetchtoken = async (req, res) => {
  const { code } = req.body;
  const secret = process.env.GOOGLE_OAUTH_SECRET;
  const client =process.env.GOOGLE_OAUTH_CLIENT;
  const redirectURI = process.env.GOOGLE_OAUTH_REDIRECTURI;
  const payload = `code=${code}&client_id=${client}&client_secret=${secret}&redirect_uri=${redirectURI}&grant_type=authorization_code`;
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload,
  });
  const data = await response.json();
  if (data.error) {
    return;
  }
  const token = data.id_token;
  const userdata = JSON.parse(atob(token.split(".")[1]));
  const { name, email, picture } = userdata;
  const userFound = await User.findOne({ email });
  if (userFound) {
  await createSession(res, userFound.id);
  return res.json({
    message: "Google login successful",
  });
} else {
  const password = crypto.randomUUID();
  const newUser = new User({
    name,
    email,
    avatar: picture,
    password,
    provider:"google"
  });

  await newUser.save();
  await createSession(res, newUser.id);
  return res.json({
    message: "Google login successful",
  });
}
};
