// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '反馈',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    name: '帮助',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
];

const asideMenuConfig = [
  {
    name: '拍品页面',
    path: '/AuctionList',
    icon: 'home2',
  },
  {
    name: 'Nav7',
    path: '/page7',
    icon: 'home',
  },
];

export { headerMenuConfig, asideMenuConfig };