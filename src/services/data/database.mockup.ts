import { message } from "./dataTypes";

export const userLastMsgs = [
    {
        msgId: 1,
        msgContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, molestiae?',
        fromUser: {
            userId: 1,
            username: 'John Doe',
            profilPic: '/images/1662650_1.jpg'
        },
    },
    {
        msgId: 2,
        msgContent: 'SHINE!!!!!!!!',
        fromUser: {
            userId: 5,
            username: 'Bakugo',
            profilPic: '/images/bakugo.jpg'
        },
    },
    {
        msgId: 3,
        msgContent: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab earum animi magni illum recusandae quaerat?',
        fromUser: {
            userId: 4,
            username: 'Anya',
            profilPic: '/images/anya.png'
        },
    },
    {
        msgId: 4,
        msgContent: 'Nani?',
        fromUser: {
            userId: 2,
            username: 'Yuta',
            profilPic: '/images/yuta.jpg'
        },
    },
    {
        msgId: 5,
        msgContent: 'OK...',
        fromUser: {
            userId: 10,
            username: 'Mob',
            profilPic: '/images/mob.png'
        },
    },

] as message[]