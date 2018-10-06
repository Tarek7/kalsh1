import { CLICK_UPDATE_VALUE } from './actionTypes';

const users = [
  {
    name: "User 1",
    id: 1,
    email: "user1@gmail.com"
  },
  {
    name: "User 2",
    id: 2,
    email: "user2@gmail.com"
  }
];

export const clickButton = value => ({
  type: CLICK_UPDATE_VALUE,
  currentUser: ( users.find((user) => user.email === value) || {} )
});
