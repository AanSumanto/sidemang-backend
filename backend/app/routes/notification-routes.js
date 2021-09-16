import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import NotificationData from '../data.js';
import Notification from '../models/notification/notification-model.js';

const notifRouter = express.Router();

notifRouter.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

notifRouter.get('/seed',
  expressAsyncHandler(async (req, res) => {
    const notifications = data.listNotifications.map((notifications) => ({
      ...notifications
    }))
    const createNotifications = await Notification.insertMany(notifications)
    res.send({ createNotifications })
  })
);

notifRouter.get('/',
  expressAsyncHandler(async(req, res) => {
    const notifications = await Notification.find({});
    res.send(notifications);
  })
);

notifRouter.post('/add', 
  expressAsyncHandler(async(req, res) => {
    const response = await Notification.save();
    return [res.sendStatus(200), response];
  }),
);

// notifRouter.delete('/delete',
//   expressAsyncHandler(async(req, res) => {
//     const notifications = await Notification.find({});
//     console.log(notifications);
//     const { id } = JSON.toString(notifications);
//     const response = await Notification.filter(
//       (notification) => notification._id !== id
//     )

//     Notification = [...response]
//     return [res.send(200), response]
//   }),
// );

// notifRouter.post('/delete',
//   expressAsyncHandler(async(req, res) => {
//     const notif = await Notification.findById(req.params._id);
//     if (notif) {
//       const deleteNotif = notif.remove(
//         (notification) => notification._id !== id
//       );
//     Notification = [...deleteNotif]
//     res.send({ message: "Notifikasi Berhasil di Hapus", notif: deleteNotif });
//     }
//   }),
// );

// notifRouter.delete('/:id',
//   expressAsyncHandler(async (req, res) => {
//     const notification = await Notification.findById(req.params.id);
//     if (notification) {
//       const deleteNotification = await notification.remove();
//       res.send({ message: 'Notifikasi di hapus', notification: deleteNotification });
//     } else {
//       res.status(404).send({ message: 'Notifikati tidak di temukan '});
//     }
//   })
// );

notifRouter.post('/delete-all',
  expressAsyncHandler(async(req, res) => {
    Notification = [];
    const response = await Notification;
    return [res.sendStatus(200), response]
  }),
);

export default notifRouter;