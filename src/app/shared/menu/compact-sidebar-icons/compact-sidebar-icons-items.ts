// Menu
export interface Menu {
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  headTitle?: string,
  badgeType?: string;
  badgeValue?: string;
  children?: Menu[];
}

export const MENUITEMS: Menu[] = [ 
  { 
    headTitle: 'General'
  },
  {
    path: '/compact-sidebar-icons/dashboard/business', title: 'Dashboard', icon: 'icon-desktop', type: 'link'
  },
  {
    title: 'Reports', icon: 'icon-files', type: 'sub', children: [
      { path: '/compact-sidebar-icons/pages/page', title: 'Order Reports', type: 'link' },          
      { path: '/compact-sidebar-icons/pages/page', title: 'Hr Reports', type: 'link' },         
      { path: '/compact-sidebar-icons/pages/page', title: 'Annual Reports', type: 'link' },         
      { path: '/compact-sidebar-icons/pages/page', title: 'Quaterly Reports', type: 'link' },  
      { path: '/compact-sidebar-icons/pages/page', title: 'Sales Reports', type: 'link' },  
      { path: '/compact-sidebar-icons/pages/page', title: 'Monthly Reports', type: 'link' } 
    ]
  },
  {
    title: 'Management', icon: 'icon-package', type: 'sub', children: [
      { path: '/compact-sidebar-icons/pages/page', title: 'Staff Management', type: 'link' },          
      { path: '/compact-sidebar-icons/pages/page', title: 'Client Management', type: 'link' },         
      { path: '/compact-sidebar-icons/pages/page', title: 'Product Management', type: 'link' }
    ]
  },
  {
    title: 'Feedbacks', icon: 'icon-comment-alt', type: 'sub', children: [
      { path: '/compact-sidebar-icons/pages/page', title: 'Product Feedbacks', type: 'link' },          
      { path: '/compact-sidebar-icons/pages/page', title: 'Product Ratings', type: 'link' },         
      { path: '/compact-sidebar-icons/pages/page', title: 'Customer Review', type: 'link' },
      { path: '/compact-sidebar-icons/pages/page', title: 'Customer Support', type: 'link' }
    ]
  },
  {
    title: 'Setting', icon: 'icon-settings', type: 'sub', children: [
      { path: '/compact-sidebar-icons/pages/page', title: 'Profile', type: 'link' },          
      { path: '/compact-sidebar-icons/pages/page', title: 'Accounts', type: 'link' },         
      { path: '/compact-sidebar-icons/pages/page', title: 'Notification', type: 'link' },
      { path: '/compact-sidebar-icons/pages/page', title: 'Support', type: 'link' }
    ]
  },
  {
    title: 'Support', icon: 'icon-headphone-alt', type: 'sub', children: [
      { path: '/compact-sidebar-icons/pages/page', title: 'Ticket', type: 'link' },          
      { path: '/compact-sidebar-icons/pages/page', title: 'Blog', type: 'link' },         
      { path: '/compact-sidebar-icons/pages/page', title: 'Pricing', type: 'link' },
      { path: '/compact-sidebar-icons/pages/page', title: 'Privacy', type: 'link' },
      { path: '/compact-sidebar-icons/pages/page', title: 'Policy', type: 'link' },
      { path: '/compact-sidebar-icons/pages/page', title: 'Documentation', type: 'link' }
    ]
  }
]
