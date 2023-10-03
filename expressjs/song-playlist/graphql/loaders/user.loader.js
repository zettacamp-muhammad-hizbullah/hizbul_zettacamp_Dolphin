const DataLoader = require('dataloader');
const userService = require('../../services/user.service');

exports.userLoader = new DataLoader(async (keys) => {
  // console.log('keys', keys);
  const result = await userService.getUserByUsername(keys);
  const dataMap = new Map();
  result.forEach((item) => dataMap.set(String(item.username), item));
  return keys.map((key) => dataMap.get(String(key)));
});
