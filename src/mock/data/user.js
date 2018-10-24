import Mock from 'mockjs';
const LoginUsers = [{
  id: 1,
  username: 'admin',
  password: '123456',
  avatar: '../../../static/head.gif',
  name: '管理员大大'
}];

const Users = [];
for (let i = 0; i < 100; i++) {
  Users.push({
    id: Mock.mock('@guid'),
    name: Mock.mock('@cname'),
    id: Mock.mock('@guid'),
    addr: Mock.mock('@county(true)'),
    age: Mock.mock('@integer(18,60)'),
    birth: Mock.mock('@date'),
    sex: Mock.mock('@integer(0,1)'),
  });
}

export {
  LoginUsers,
  Users
};
