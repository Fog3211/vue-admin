import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Users } from './data/user';
let _Users = Users;

export default {

  mockRequest() {
    // 定义一个mock adapter实例 
    let mock = new MockAdapter(axios);

    //模拟登录POST请求
    mock.onPost('/login').reply(config => {
      let {username, password} = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        let _user=null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
             if (u.username === username) {
              user = JSON.parse(JSON.stringify(u));
              _user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
          });
          if (hasUser) {
            if(_user.password === password){
              resolve([200, { code: 200, msg: '请求成功', user }]);
            }else{
              resolve([200, { code: 500, msg: '密码错误' }]);
            }
          } else {
            resolve([200, { code: 500, msg: '账号不存在' }]);
          }
        }, 1000);
      });
    });


    //获取用户列表
    mock.onGet('/user/list').reply(config => {
      let {name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {users: mockUsers}]);
        }, 1000);
      });
    });

    //获取用户列表（分页）
    mock.onGet('/user/listpage').reply(config => {
      let {page, name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    //删除用户
    mock.onGet('/user/remove').reply(config => {
      let { id } = config.params;
      _Users = _Users.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //批量删除用户
    mock.onGet('/user/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Users = _Users.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //编辑用户
    mock.onGet('/user/edit').reply(config => {
      let { id, name, sex, age, birth, addr} = config.params;
      _Users.some(u => {
        if (u.id === id) {
          u.name = name;
          u.sex = sex;
          u.age = age;
          u.birth = birth;
          u.addr = addr;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });

    //新增用户
    mock.onGet('/user/add').reply(config => {
      let { name, sex , age, birth, addr} = config.params;
      _Users.push({
        name: name,
        sex: sex,
        age: age,
        birth: birth,
        addr: addr
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });
  }
};