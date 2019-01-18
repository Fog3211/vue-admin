import Mock from 'mockjs';
const LoginUsers = [{
  id: 1,
  username: 'admin',
  password: '123456',
  avatar: 'http://plavm6yij.bkt.clouddn.com/head.gif',
  name: 'admin'
}];

const Users = [];
for (let i = 0; i < 100; i++) {
  Users.push({
    id: Mock.mock('@guid'),
    name: Mock.mock('@cname'),
    id: Mock.mock('@guid'),
    addr: Mock.mock('@county(true)'),
    age: Mock.mock('@integer(1,60)'),
    birth: Mock.mock('@date'),
    sex: Mock.mock('@integer(0,1)'),
  });
}

export {
  LoginUsers,
  Users
};
