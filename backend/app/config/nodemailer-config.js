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

const sendConfirmationEmail = (name, email, confirmationCode) => {
  transport.sendMail({
    from: 'Kominfo Palembang <noreply@palembang.go.id>',
    replyTo: 'noreply@palembang.go.id',
    to: email,
    subject: 'Konfirmasi akun Aplikasi Sidemang',
    html: `<h1>Email Konfirmasi</h1>
          <h2>Selamat datang ${name}</h2>
          <p>Terimakasih karena anda telah mendaftar akun gratis di aplikasi Sidemang! Sebelum anda login, kami perlu untuk mengkonfirmasi akun anda terlebih dulu. Untuk itu, silahkan buka URL berikut ini: </p>
          <div>
          <a href=https://${process.env.HOST_FRONTEND}/confirm/${confirmationCode}>Klik disini</a>
          </div>         
          <div>
          <p>
          Setelah akun anda terkonfirmasi, anda bisa login menggunakan email dan password yang anda sediakan pada proses registrasi, disini:
          </p>
          </div>

          <div>
          Jika terdapat masalah pada saat konfirmasi registrasi ini, silahkan kontak kami disini:
          <a href=https://sidemang.palembang.go.id/contact.html>Support@SidemangApps</a>
          </div>

          <div>
          <p>
          Terimakasih sekali lagi, dan selamat datang di Sidemang!
          </p>
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

export default sendConfirmationEmail;
