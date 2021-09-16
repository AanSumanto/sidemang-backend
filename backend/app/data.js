import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Aan Sumanto',
            username: 'Aan',
            email: 'aansumanto0210@gmail.com',
            password: bcrypt.hashSync('12345678', 8),
            avatar: '',
            status: 'Active',
            confirmationCode: '1234567890abcdefghijklmnopqrstuvwxyz',
            role: 'SA',
        }, 
        {
            name: 'Fogi Chandra Permana Putra',
            username: 'fogi',
            email: 'fogi.chandra@gmail.com',
            password: bcrypt.hashSync('12345678', 8),
            avatar: '',
            status: 'Active',
            confirmationCode: 'abcdefghijklmnopqrstuvwxyz123456789',
            role: 'SA',
        }, 
        {
            name: 'msarjono',
            username: 'iez',
            email: 'msarjono@gmail.com',
            password: bcrypt.hashSync('12345678', 8),
            avatar: '',
            status: 'Active',
             confirmationCode: 'abcd123efghijklm23123nopqrstuvwxyz123456789',
            role: 'SA',
        }, 
    ],

    employees: [
        {
            nip: '198605122019021002',
            nik: '1671091205860008',
            name: 'Fogi Chandra Permana Putra',
            email: 'fogi.chandra@gmail.com',
            department: 'Dinas Komunikasi dan Tehnologi Kota Palembang',
        }, 
        {
            nip: '198605122019021003',
            nik: '1671091205880005',
            name: 'Rinaldi',
            email: 'rinaldi.@gmail.com',
            department: 'Lurah 11 Ulu',
        }
    ],

    publics: [
        {
            nik: '1671060210850005',
            name: 'Aan Sumanto',
            email: 'aansumanto0210@gmail.com',
            address: 'Jl. Husin Basri Perumahan Grand Berdikari Blok G16',
        },
        {
            nik: '1671060411760005',
            name: 'msarjono',
            email: 'msarjono@gmail.com',
            address: 'Jl. Putri Kembang dadar no 123 Palembang',
        },
    ],

    listNotifications: [
        {
                heading: 'Alert',
                icon: {
                    name: 'notifications',
                    color: 'error',
                },
                title: 'Surat Domisili',
                subtitle: 'a/n Aan Sumanto',
                path: 'page-layouts/user-profile',
                sender: 'Rinaldi',
                reciever: 'Fogi Chandra Permana Putra',
        },
        {
                heading: 'Alert',
                icon: {
                    name: 'notifications',
                    color: 'error',
                },
                timestamp: 1570702802573,
                title: 'Surat Waris',
                subtitle: 'a/n Mukhlis Sarjono',
                path: 'page-layouts/user-profile',
                sender: 'Fogi Chandra Permana Putra',
                receiver: 'Rinaldi',
        },
        {
                heading: 'Alert',
                icon: {
                    name: 'notifications',
                    color: 'error',
                },
                timestamp: 1570702802573,
                title: 'Surat Keterangan Usaha',
                subtitle: 'a/n Yosep',
                path: 'page-layouts/user-profile',
        },
        {
                heading: 'Alert',
                icon: {
                    name: 'notifications',
                    color: 'error',
                },
                timestamp: 1570702802573,
                title: 'Surat Buka Salon',
                subtitle: 'a/n Ridho Saputra',
                path: 'page-layouts/user-profile',
        },
    ],  
        
    
}

export default data;