import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
    {
        heading: { type: String },
        icon : { 
            name: { type: String }, 
            color: { type: String }, 
        },
        title: { type: String },
        subtitle: { type: String },
        path: { type: String },
        sender: {type:mongoose.Schema.Types.ObjectId, ref:'User'}, // Notification creator
        receiver: [{type:mongoose.Schema.Types.ObjectId, ref:'User'}], // Ids of the receivers of the notification
        read_by:[{
            readerId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
            read_at: {type: Date, default: Date.now}
        }],
       
    },
    {
        timestamps: { createdAt: true, updatedAt: false }
    },
);

const Notification = mongoose.model('Notification', notificationSchema );

export default Notification;
