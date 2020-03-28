const axios = require('axios');

class User {
  constructor(user) {
    Object.assign(this, user);
    this.name = Object.assign({
      get full(){
        return `${this.first} ${this.last}`;
      }
    }, user.name);
  }

  get age() {
    return Math.floor((Date.now() - Date.parse(this.dob.date)) / (1000 * 60 * 60 * 24 * 365));
  }
}

class UserList extends Array {
  static fetch(params){
    return axios.get('http://api.randomuser.me', { params })
    .then(({data}) => {
      const results = data.results.map((user) => new User(user));
      const users = new this(...results);
      return users;
    });
  }

  getAverageAge() {
    return this.reduce(((sum, user) => sum + user.age), 0) / this.length;
  }

  getMaxAge() {
    return Math.max(...(this.map((user) => user.age)));
  }

  getMinAge() {
    return Math.min(...(this.map((user) => user.age)));
  }
}

module.exports = UserList;