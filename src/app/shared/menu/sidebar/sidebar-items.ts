// Menu
export interface Menu {
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  headTitle?: string,
  badgeType?: string;
  badgeValue?: string;
  authenticate?: boolean;
  children?: Menu[];
}

export const MENUITEMS: Menu[] = [
  // { 
  //   headTitle: 'General'
  // }, 
  {
    title: 'My Account', icon: 'menu-icon icn-user', type: 'sub', authenticate:true ,  children: [
        { path: '/main/profile', title: 'Profile', type: 'link' },
        { path: '/base/alert', title: 'Balance', type: 'link' },
        { path: '/main/inbox', title: 'Messages', type: 'link', badgeType:'danger', badgeValue: "11 new" },
        { path: '/main/achievements', title: 'Achievements', type: 'link' },
        { path: '/main/myteams', title: 'My Teams', type: 'link' },
        { path: '', title: '', type: 'authentication' }      
    ]
  },
  {
    path: '/pages/stater-kit', title: 'Top Picks', icon: 'menu-icon icon-agenda text-center', type: 'link'
  },
  {
    path: '/main/contests', title: 'Contests', icon: 'menu-icon icn-contests', type: 'link'
  },
  {
    path: '/main/winners', title: 'Winners', icon: 'menu-icon icn-winners', type: 'link'
  },
  {
    path: '/main/standings', title: 'Standings', icon: 'menu-icon icn-standings', type: 'link'
  },
  {
    path: '/main/settings', title: 'Settings', icon: 'menu-icon icn-gear', type: 'link'
  },
  {
    title: 'About Sportimo', icon: 'menu-icon icn-logo', type: 'sub', children: [
        { path: '/base/accordion', title: 'How to Play', type: 'link' },
        { path: '/base/alert', title: 'Support', type: 'link' },
        { path: '/base/dropdown', title: 'Terms & Conditions', type: 'link'},
        { path: '/base/grid', title: 'Privacy Policy', type: 'link' }
    ]
  },
  {
    title: 'Language', icon: 'menu-icon icn-user', type: 'sub'
  },
  // {
  //   path: '/pages/stater-kit', title: 'Dashboard', icon: 'icon-desktop', type: 'link'
  // },
  // {
  //   title: 'Starter Kit', icon: 'icon-anchor', type: 'sub', children: [{
  //     title: 'Bootstrap', type: 'sub', children: [
  //       { path: '/base/accordion', title: 'Accordion', type: 'link' },
  //       { path: '/base/alert', title: 'Alert', type: 'link' },
  //       { path: '/base/dropdown', title: 'Dropdown', type: 'link' },
  //       { path: '/base/grid', title: 'Grid', type: 'link' },
  //       { path: '/base/helper-class', title: 'Helper Classes', type: 'link' },
  //       { path: '/base/list', title: 'List', type: 'link' },
  //       { path: '/base/modal', title: 'Modal', type: 'link' },
  //       { path: '/base/navs', title: 'Navs', type: 'link' },
  //       { path: '/base/popover', title: 'Popover', type: 'link' },
  //       { path: '/base/progressbar', title: 'Progresssbar', type: 'link' },
  //       { path: '/base/shadow', title: 'Shadow', type: 'link' },
  //       { path: '/base/spinners', title: 'Spinners', type: 'link' },
  //       { path: '/base/state-color', title: 'State Color', type: 'link' },
  //       { path: '/base/tabs', title: 'Tabs', type: 'link' },
  //       { path: '/base/tag-n-pills', title: 'Tag & pills', type: 'link' },
  //       { path: '/base/typography', title: 'Typography', type: 'link' }
  //     ]
  //   },
  //   {
  //     title: 'Ng-Bootstrap', type: 'sub', children: [
  //       { path: '/base/ngb/accordion', title: 'Accordion', type: 'link' },
  //       { path: '/base/ngb/alert', title: 'Alert', type: 'link' },
  //       { path: '/base/ngb/buttons', title: 'Buttons', type: 'link' },
  //       { path: '/base/ngb/carousel', title: 'Carousel', type: 'link' },
  //       { path: '/base/ngb/collapse', title: 'Collapse', type: 'link' },
  //       { path: '/base/ngb/datepicker', title: 'Datepicker', type: 'link' },
  //       { path: '/base/ngb/dropdown', title: 'Dropdown', type: 'link' },
  //       { path: '/base/ngb/modal', title: 'Modal', type: 'link' },
  //       { path: '/base/ngb/pagination', title: 'Pagination', type: 'link' },
  //       { path: '/base/ngb/popover', title: 'Popover', type: 'link' },
  //       { path: '/base/ngb/progressbar', title: 'Progressbar', type: 'link' },
  //       { path: '/base/ngb/rating', title: 'Rating', type: 'link' },
  //       { path: '/base/ngb/tabset', title: 'Tabset', type: 'link' },
  //       { path: '/base/ngb/timepicker', title: 'Timepicker', type: 'link' },
  //       { path: '/base/ngb/tooltip', title: 'Tooltip', type: 'link' },
  //       { path: '/base/ngb/typeahead', title: 'Typeahead', type: 'link' }
  //     ]
  //   }
  //   ]
  // },
  // { 
  //     headTitle: 'SUPPORT'
  // },
  // {
  //     path: 'http://support.pixelstrap.com/help-center', title: 'Raise Support', icon: 'icon-headphone-alt', type: 'extTabLink'
  // },
]
