import { CLICK_UPDATE_VALUE } from './actionTypes';

const users = [
  {
    name: "Tarek",
    id: 1,
    email: "tmansour@mit.edu",
    balance: 100
  },
  {
    name: "Luana",
    id: 2,
    email: "luana@mit.edu",
    balance: 50
  }
];

export const clickButton = value => ({
  type: CLICK_UPDATE_VALUE,
  currentUser: ( users.find((user) => user.email === value) || {} )
});
