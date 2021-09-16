import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'mail.palembang.go.id',
  port:  '587',
  secureConnection: true,
  auth: {
    user: 'apps.kominfo@palembang.go.id',
    pass: 'Diskominfo1!',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendResetPasswordToken = (email, token) => {
  transport.sendMail({
    from: 'Kominfo Palembang <noreply@palembang.go.id>',
    replyTo: 'noreply@palembang.go.id',
    to: email,
    subject: 'Konfirmasi Reset Password Aplikasi Sidemang',
    html: `<h1>Email Konfirmasi Reset Password</h1>
        <p> Anda Menerima emai ini karena Anda (atau seseorang) meminta untuk mereset password untuk akun anda di Aplikasi Sidemang </p>
        <div>
        <p> Silahkan Klik link berikut untuk mereset password anda </p>
        <a href=http://${process.env.LOCAL_HOST}/resetPassword/${token}}>Klik disini</a>
        </div>  

          Jika terdapat masalah pada saat konfirmasi registrasi ini, silahkan kontak kami disini:
          <a href=https://sidemang.palembang.go.id/contact.html>Support@SidemangApps</a>
          </div>

          <div>
          <br>
          <p>
          Tim pengembangan aplikasi, e-Gov Kominfo Palembang
          </p>
          <a href="mailto:kominfo@palembang.go.id">kominfo@palembang.go.id
          </a>
          </div>

          `,
  }).catch((err) => console.log(err));
};

export default sendResetPasswordToken;
