import { AppRoutes } from './src/utils/routes';
import {
  Group,
  Home,
  InsertChart,
  Payments,
  SideBarIcon1,
  SideBarIcon2,
  SideBarIcon3,
  SideBarIcon4,
} from './src/assets/icons/svgs';
import { TbApps, TbFileDescription, TbGift, TbSettings } from 'react-icons/tb';
import { MdLogout, MdOutlineBugReport } from 'react-icons/md';
import { IoMdImages } from 'react-icons/io';

export const navItems = [
  { name: 'Home', icon: Home, route: AppRoutes.home },
  { name: 'Analytics', icon: InsertChart, route: AppRoutes.analytics },
  { name: 'Revenue', icon: Payments, route: AppRoutes.revenue },
  { name: 'CRM', icon: Group, route: AppRoutes.crm },
];

export const sideNavItems = [
  {
    name: 'Link in Bio',
    icon: SideBarIcon1,
    subText: 'Manage your Link in Bio',
    route: AppRoutes.bio,
  },
  {
    name: 'Store',
    icon: SideBarIcon2,
    subText: 'Manage your Store',
    route: AppRoutes.store,
  },
  {
    name: 'Media Kit',
    icon: SideBarIcon3,
    subText: 'Manage your Media Kit',
    route: AppRoutes.media,
  },
  {
    name: 'Invoicing',
    icon: SideBarIcon4,
    subText: 'Manage your Invoicing',
    route: AppRoutes.invoicing,
  },
];

export const userNavItems = [
  {
    name: 'Settings',
    icon: TbSettings,
  },
  {
    name: 'Purchase History',
    icon: TbFileDescription,
  },
  {
    name: 'Refer and Earn',
    icon: TbGift,
  },
  {
    name: 'Integration',
    icon: TbApps,
  },
  {
    name: 'Report Bug',
    icon: MdOutlineBugReport,
  },
  {
    name: 'Switch Account',
    icon: IoMdImages,
  },
  {
    name: 'Signout',
    icon: MdLogout,
  },
];
