import User from "../models/userModel.js";
import z from "zod";
import bcrypt from "bcrypt";
import Session from "../models/sessionModel.js";
import {
  fetchGoogleCode,
  fetchGoogleuser,
} from "../services/fetchGoogleuser.js";

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

export const logout = async (req, res) => {
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

export const google = async (req, res) => {
  return fetchGoogleuser(req, res);
};

export const callbackGoogle = async (req, res) => {
  const { code } = req.query;
  const tokenInfo = await fetchGoogleCode(code);
  const profile = tokenInfo.payload;
  var sid = false;
  const findUser = await User.findOne({ email: profile.email });
  if (findUser != null) {
    const session = await Session.find({ userid: findUser.id });
    const deleteSession = await Session.deleteMany({ userid: findUser.id });
    const sessionCreated = await Session.create({ userid: findUser.id });

    res.cookie("token", sessionCreated.id, {
      signed: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    sid = true;
  } else {
    const { name, email, picture } = profile;
    const password = crypto.randomUUID();
    const newUser = new User({
      name,
      email,
      avatar: picture,
      password,
      provider: "google",
    });

    await newUser.save();
    const sessionCreated = await createSession(res, newUser.id);
    res.cookie("token", sessionCreated.id, {
      signed: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    sid = true;
  }
  res.redirect(`http://localhost:5173/googlecallback?sid=${sid}`);
  res.end();
};
