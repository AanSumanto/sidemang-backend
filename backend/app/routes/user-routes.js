import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user/user-model.js';
import sendConfirmationEmail from '../config/nodemailer-config.js';
import { generateToken, isAuth, isRecaptcha } from '../utils/utils.js';
import data from '../data.js';
import sendResetPasswordToken from '../config/nodemailer-reset-config.js';
import crypto from 'crypto';
import TokenReset from '../models/user/token-model.js';

const userRouter = express.Router();

userRouter.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

userRouter.get('/seed',
  expressAsyncHandler(async (req, res) => {
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.get('/confirm/:confirmationCode',
  expressAsyncHandler(async(req,res) => {
    await User.findOne({
      confirmationCode: req.params.confirmationCode,
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User Tidak Ditemukan." });
        }
        user.status = "Active";
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
        });
      })
      .catch((e) => console.log("error", e));
  })
);

userRouter.post('/register',
  expressAsyncHandler((req, res) => {
    isRecaptcha();
    User.findOne({ username: req.body.username })
    .exec(async (err, username) => { 
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (username) {
        return res.status(400).send({ message: 'Gagal! Username sudah di gunakan!' });
      }
      const email = await User.findOne ({ email: req.body.email });
      if (email) {
        return res.status(400).send({ message: 'Gagal! Email sudah di gunakan!' });
      }      
        const token = jwt.sign({email: req.body.email,},process.env.JWT_SECRET);
        const user = new User({
          name: req.body.name,
          nip: req.body.nip,
          nik: req.body.nik,
          isEmployee: req.body.isEmployee,
          username: req.body.username.toLowerCase(),
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
          confirmationCode: token,
          role: 'GUEST',
        });
        const createdUser = await user.save();
        res.status(200).send({
          _id: createdUser._id,
          name: createdUser.name,
          username: createdUser.username,
          email: createdUser.email,
          role: createdUser.role,
          token: generateToken(createdUser),
        });
        
        sendConfirmationEmail(
          createdUser.username,
          createdUser.email,
          createdUser.confirmationCode,
        );
    });
  })
);

userRouter.post('/login',  
  expressAsyncHandler(async (req, res) => {
    isRecaptcha();
      const user = await User.findOne({ 
        username: req.body.username
      })
        if(!user){
          return res.status(400).send({ message: 'Gagal! Username Belum Terdaftar' });
        }   
        if (user){
          const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password);
          if (passwordIsValid){
            if (user.status != 'Active'){
              return res.status(401).send({
                message: 'Akun anda belum aktif. Silahkan verifikasi email anda!',
              });
            }
            return res.status(200).send({
              user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role,  
                accessToken: generateToken(user),
              }
            });     
             
          }           
        }
        res.status(401).send({
          message: 'Username atau Password Anda Salah' 
        });
  }),
);

userRouter.post('/reset/:resetPasswordToken',
  expressAsyncHandler(async (req, res) => {
    isAuth();
      if(req.body.email === ''){
        return res.status(400).send({ message: 'Masukkan Email Anda'});
      };
      const user = await User.findOne({
        email: req.body.email
      });
      if(!user){
        return res.status(400).send({ message: 'Gagal! Email Tidak Terdaftar' });
      };
      const token = crypto.randomBytes(20).toString('hex');
      const resetPassword = await User.updateOne({
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000,
      });
      sendResetPasswordToken(
        resetPassword.email,
        resetPassword.resetPasswordToken,        
      )

  })
);

userRouter.get('/profile', 
  expressAsyncHandler(async (req, res) => { 
  //isAuth();
    // const user = await User.find({});
    const { Authorization } = req.headers
    if(!Authorization) {
      return [401, { message : 'Invalid Authorization Token' }];
    }
    const accessToken = Authorization.split(' ')[1];
    const [ userId ] = jwt.verify(accessToken, proccess.env.JWT_SECRET);
    const user = await User.find((u) => u.id === userId);
    return [
      res.sendStatus(200),
        {
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
          }
        }    
    ]        
  })
);

userRouter.post('/requestResetPassword', 
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user.status != 'Active'){
      return res.status(401).send({
      message: 'Akun anda belum aktif. Silahkan verifikasi email anda!',
      });
    };
    if(user){
      const resetToken = crypto.randomBytes(20).toString('hex');
      user.resetPasswordCode = resetToken;
      user.resetPasswordExpired = Date.now() + 360000;

      const updateUser = await user.save();
      res.send({ message: 'Reset Token Link Send', user: updateUser });
    } else {
      return res.status(401).send({ message: 'Email Tidak Terdaftar' });
    }  
    sendResetPasswordToken(
      user.email,
      user.resetPasswordCode,
    );
  })
);

userRouter.get('/resetPassword/:token',
  expressAsyncHandler(async (req, res, next) => {
  await User.findOne(req.body.user.resetPasswordCode)
  console.log(req.user.resetPasswordCode)

      if(!user){
        return res.sendStatus(400), { message: 'Token Kadaluarsa'};
      } else {
        res.send({ 
          email: user.email,
          resetPasswordCode: user.resetPasswordCode,
          user: user._id,
          message: 'Link Reset OK' })
      }
    
})
);

// userRouter.post('/resetPassword/:token',
//     expressAsyncHandler (async (req, res) => {
//       const username = await User.findOne({ username: req.body.username })
//       // await User.findOne({ resetPasswordCode :  req.params.resetPasswordCode, })
//       console.log(req.body.username)
//         if(!username) {
//           return res.send({message: 'User tidak terdaftar'});
//         }
//         const user = await User.findOne({ resetPasswordCode :  req.params.resetPasswordCode, })
//         if(user) {
//           user.password = req.body.password;
//           user.resetPasswordCode = undefined;
//           user.resetPasswordExpired = undefined;

//           user.save();
//           res.send({ message: 'Password Berhasil di Update' })
//         }
//     }),
// );

// userRouter.put('/resetPassword/:token&id=:id', 
//   //isAuth,
//   expressAsyncHandler (async (req, res) => {
//     const user = await User.find( { _id: req.body._id });
//     console.log(user)
//     if (req.body.password){
//       const bcryptSalt = process.env.BCRYPT_SALT;
//       const hash = bcrypt.hash(req.body.password, Number(bcryptSalt));
//       user.password = hash;
//     }
//     // const updatePassword = await user.save();
//     // res.send({ message: 'Password Berhasil di Update',
//     //   updatePassword
//     // })
//     //console.log(user)


//       // if(!user){
//       //   return res.status(404).send({ message: 'Email tidak terdaftar'});        
//       // }  

//       // const bcryptSalt = process.env.BCRYPT_SALT;
//       // const hash = bcrypt.hash(req.body.password, Number(bcryptSalt));
//       // user.password = hash;
//       // const updatePassword = await user.save();
     
//       // res.send({ message: 'Password Berhasil di Update', user: updatePassword })
  
//     }
//   )
// ) 

userRouter.get('/',
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

export default userRouter;
