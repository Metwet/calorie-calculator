import { addNewItem } from './addNewItem.js';
import { itemsList } from './itemsList.js';
import { calorieLimit } from './calorieLimit.js';

let items = JSON.parse(localStorage.getItem('items')) || [];

const today = new Date();
const todayDate = today.toISOString().split('T')[0];

console.log(items);
addNewItem(items, todayDate);
itemsList(items, todayDate);
calorieLimit();