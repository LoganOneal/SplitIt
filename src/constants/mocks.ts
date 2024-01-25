import dayjs from 'dayjs';
import {
  ILocation,
  IReceipt,
  IReceiptItem,
  IGroupMember
} from './types';


// users
export const USERS: IUser[] = [
  {
    id: 1,
    name: 'Devin Coldewey',
    department: 'Marketing Manager',
    stats: {posts: 323, followers: 53200, following: 749000},
    social: {twitter: 'CreativeTim', dribbble: 'creativetim'},
    about:
      'Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).',
    avatar:
      'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?fit=crop&w=80&q=80',
  },
  {
    id: 2,
    name: 'Bella Audrey',
    department: 'Marketing Manager',
    stats: {posts: 323, followers: 53200, following: 749000},
    social: {twitter: 'CreativeTim', dribbble: 'creativetim'},
    about:
      'Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=80&q=80',
  },
  {
    id: 3,
    name: 'Miriam Lendra',
    department: 'Desktop Publisher',
    stats: {posts: 323, followers: 53200, following: 749000},
    social: {twitter: 'CreativeTim', dribbble: 'creativetim'},
    about:
      'Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=80&q=80',
  },
  {
    id: 4,
    name: 'David Bishop',
    department: 'Marketing Manager',
    stats: {posts: 323, followers: 53200, following: 749000},
    social: {twitter: 'CreativeTim', dribbble: 'creativetim'},
    about:
      'Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).',
    avatar:
      'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?fit=crop&w=80&q=80',
  },
  {
    id: 5,
    name: 'Mathew Glock',
    department: 'HR Manager',
    stats: {posts: 323, followers: 53200, following: 749000},
    social: {twitter: 'CreativeTim', dribbble: 'creativetim'},
    about:
      'Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).',
    avatar:
      'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?fit=crop&w=80&q=80',
  },
  {
    id: 6,
    name: 'Emma Roberts',
    department: 'HR Manager',
    stats: {posts: 323, followers: 53200, following: 749000},
    social: {twitter: 'CreativeTim', dribbble: 'creativetim'},
    about:
      'Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).',
    avatar:
      'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?fit=crop&w=80&q=80',
  },
];

// rental locations
export const LOCATIONS: ILocation[] = [
  {id: 1, city: 'Knoxville', state: 'TN'},
  {id: 2, city: 'Atanta', state: 'GA'},
  {id: 3, city: 'Seattle', state: 'WA'},
];

export const ITEMS: IReceiptItem[] = [
  {
    id: 1,
    name: 'Grande Borrito',
    price: 11.45,
    paid: true,
  },
  {
    id: 2,
    name: 'Macho Fish Taco',
    price: 11.97,
    paid: false,
  },  
  {
    id: 3,
    name: 'BTL Water',
    price: 7.97,
    paid: true,
  },  
  {
    id: 4,
    name: 'Beer',
    price: 4.99,
    paid: false,
  },
  {
    id: 5,
    name: 'Grande Borrito',
    price: 11.45,
    paid: true,
  },
  {
    id: 6,
    name: 'Macho Fish Taco',
    price: 11.97,
    paid: false,
  },  
  {
    id: 7,
    name: 'BTL Water',
    price: 7.97,
    paid: true,
  },  
  {
    id: 8,
    name: 'Beer',
    price: 4.99,
    paid: false,
  },
  {
    id: 9,
    name: 'Grande Borrito',
    price: 11.45,
    paid: true,
  },
  {
    id: 10,
    name: 'Macho Fish Taco',
    price: 11.97,
    paid: false,
  },  
  {
    id: 11,
    name: 'BTL Water',
    price: 7.97,
    paid: true,
  },  
  {
    id: 12,
    name: 'Beer',
    price: 4.99,
    paid: false,
  },
];

export const RECEIPTS: IReceipt[] = [
  {
    id: 1,
    title: 'Spicy Mexican Grill 1',
    image: 'https://imgs.search.brave.com/B__JGE0bgAk3Xrr19uxigELtzCIEaAKjRBVnWywELng/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9vY3Iu/c3BhY2UvQ29udGVu/dC9JbWFnZXMvcmVj/ZWlwdC1vY3Itb3Jp/Z2luYWwud2VicA',
    location: LOCATIONS[0],
    host: USERS[0],
    members: USERS,
    items: ITEMS,
    total: 15.57,
    received: 11.34,
    tax: 1.23,
    tip: 2.00,
    timestamp: dayjs().unix(),
    subtotal: 15.57 + 1.23 + 2.00,
  },
  {
    id: 2,
    title: 'Spicy Mexican Grill 2',
    image: 'https://imgs.search.brave.com/B__JGE0bgAk3Xrr19uxigELtzCIEaAKjRBVnWywELng/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9vY3Iu/c3BhY2UvQ29udGVu/dC9JbWFnZXMvcmVj/ZWlwdC1vY3Itb3Jp/Z2luYWwud2VicA',
    location: LOCATIONS[0],
    host: USERS[0],
    members: USERS,
    items: ITEMS,
    total: 15.57,
    received: 15.34,
    tax: 1.23,
    tip: 0.0,
    timestamp: dayjs().unix(),
    subtotal: 15.57 + 1.23 + 0.0,
  },
  // Add the subtotal property to each object in the array
  {
    id: 3,
    title: 'Spicy Mexican Grill 3',
    image: 'https://imgs.search.brave.com/B__JGE0bgAk3Xrr19uxigELtzCIEaAKjRBVnWywELng/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9vY3Iu/c3BhY2UvQ29udGVu/dC9JbWFnZXMvcmVj/ZWlwdC1vY3Itb3Jp/Z2luYWwud2VicA',
    location: LOCATIONS[0],
    host: USERS[0],
    members: USERS,
    items: ITEMS,
    total: 15.57,
    received: 15.34,
    tax: 1.23,
    tip: 0.0,
    timestamp: dayjs().unix(),
    subtotal: 15.57 + 1.23 + 0.0,
  },
  {
    id: 4,
    title: 'Spicy Mexican Grill 4',
    image: 'https://imgs.search.brave.com/B__JGE0bgAk3Xrr19uxigELtzCIEaAKjRBVnWywELng/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9vY3Iu/c3BhY2UvQ29udGVu/dC9JbWFnZXMvcmVj/ZWlwdC1vY3Itb3Jp/Z2luYWwud2VicA',
    location: LOCATIONS[0],
    host: USERS[0],
    members: USERS,
    items: ITEMS,
    total: 15.57,
    received: 15.34,
    tax: 1.23,
    tip: 0.0,
    timestamp: dayjs().unix(),
    subtotal: 15.57 + 1.23 + 0.0,
  },
  {
    id: 5,
    title: 'Spicy Mexican Grill 5',
    image: 'https://imgs.search.brave.com/B__JGE0bgAk3Xrr19uxigELtzCIEaAKjRBVnWywELng/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9vY3Iu/c3BhY2UvQ29udGVu/dC9JbWFnZXMvcmVj/ZWlwdC1vY3Itb3Jp/Z2luYWwud2VicA',
    location: LOCATIONS[0],
    host: USERS[0],
    members: USERS,
    items: ITEMS,
    total: 15.57,
    received: 15.34,
    tax: 1.23,
    tip: 0.0,
    timestamp: dayjs().unix(),
    subtotal: 15.57 + 1.23 + 0.0,
  },
];

export default {
  RECEIPTS,
};

export const MEMBERS: IGroupMember[] = [
  {
    id: 1,
    name: 'Josh',
    phoneNumber: '111-111-1111'
  },
  {
    id: 2,
    name: 'Hendon',
    phoneNumber: '222-222-2222'
  },
  {
    id: 3,
    name: 'Joe',
    phoneNumber: '333-333-3333'
  },
  {
    id: 4,
    name: 'Nico',
    phoneNumber: '444-444-4444'
  },
  {
    id: 5,
    name: 'Bru',
    phoneNumber: '555-555-5555'
  },
  {
    id: 6,
    name: 'Peyton',
    phoneNumber: '616-161-1616'
  }
];
