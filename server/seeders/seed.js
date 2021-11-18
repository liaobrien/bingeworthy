const db = require('../config/connection');
const { User, List } = require('../models');

const userData = require('./userSeeds.json');
const listData = require('./listSeeds.json');

db.once('open', async () => {
      // clean database
      await User.deleteMany({});
      await List.deleteMany({});

      // bulk create each model
      const users = await User.insertMany(userData);
      const lists = await List.insertMany(listData);

      for (newList of lists) {
            // randomly add each list to a user
            const tempUser = users[Math.floor(Math.random() * users.length)];
            console.log(tempUser);
            tempUser.lists.push(newList);
            await tempUser.save();
      }

      console.log('all done!');
      process.exit(0);
});