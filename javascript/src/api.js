'use strict';

const UserList = require('./user-list');

UserList.fetch({ results : 5, nat: 'us'})
.then((users) => {
  for (const user of users) {
    console.log(`${user.name.full} (${user.age})`);
  }

  console.log();

  console.log('Agerage age', users.getAverageAge());
  console.log('Max age:', users.getMaxAge());
  console.log('Min age:', users.getMinAge());
}).catch((err) =>  {
  console.log(err.message);
});