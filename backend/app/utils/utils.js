import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.split(' ')[1]; // Bearer XXXXXX
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret',
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};

export const isRecaptcha =  (req, res, next) => async() => {
  try {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const googleVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${req.body.token}`;
    const response = await axios.post(googleVerifyUrl);
    const { success } = response.data;    
    if (success) {
      return res.send({ success: true });
    } else {
      return res.status(400).send({ message: 'Invalid Captcha. Silahkan Ulangi lagi.' });
    }
  } catch (e) {
    return res.status(400).send({ message: 'reCaptcha error'})
    next();
  }
}