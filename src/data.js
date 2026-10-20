import { publicAsset } from './assets';

// 所有成员入口共用此数组；替换资料只需要修改这里。
export const band = {
  name: 'NIGHT RIOT',
  tagline: 'FOUR SOULS. ONE SOUND.',
  email: 'hello@nightriot.example', // 示例联系邮箱，请替换为真实邮箱。
  socials: [
    { name: 'Instagram', url: '' },
    { name: 'YouTube', url: '' },
    { name: 'Spotify', url: '' },
  ],
};

export const members = [
  {
    id: 'wei', name: 'Wei', role: 'LEAD VOCALS', roleZh: '主唱',
    description: '充满爆发力的嗓音，是乐队的灵魂与情绪出口。',
    quote: '让每一种情绪，都有声音。',
    image: publicAsset('images/wei-vocal.png'), videoUrl: publicAsset('videos/1.mp4'),
    color: '#e45d76', number: '01',
  },
  {
    id: 'yu', name: 'Yu', role: 'LEAD GUITAR', roleZh: '电吉他手',
    description: '用锋利的 Riff 和炽热的 Solo，制造无法忽视的声音。',
    quote: '失真，是另一种诚实。',
    image: publicAsset('images/yu-guitar.png'), videoUrl: publicAsset('videos/2.mp4'),
    color: '#bd6445', number: '02',
  },
  {
    id: 'zhi', name: 'Zhi', role: 'BASS', roleZh: '贝斯手',
    description: '掌控低频律动，让每一次心跳都与音乐同步。',
    quote: '你听见旋律，我让你感受心跳。',
    image: publicAsset('images/zhi-bass.png'), videoUrl: publicAsset('videos/3.mp4'),
    color: '#668cbb', number: '03',
  },
  {
    id: 'de', name: 'De', role: 'DRUMS', roleZh: '鼓手',
    description: '以强劲的节奏击碎沉寂，推动整个乐队向前。',
    quote: '下一拍，打破沉默。',
    image: publicAsset('images/de-drums.png'), videoUrl: publicAsset('videos/4.mp4'),
    color: '#d64e3f', number: '04',
  },
];
