import { itemsList } from "./itemsList.js";

function addNewItem(items, todayDate) {
    const addItemForm = document.getElementById('addItemForm');
    const itemNameInput = document.getElementById('itemName');
    const caloriesInput = document.getElementById('itemCalories');
    const dateInput = document.getElementById('itemDate');

    dateInput.value = todayDate;

    addItemForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        
        const itemName = itemNameInput.value;
        const calories = parseFloat(caloriesInput.value);
        const date = dateInput.value;

        if (!itemName || isNaN(calories) || !date) {
            alert('Пожалуйста, заполните все поля корректно.');
            return;
        }

        const newItem = {
            id: new Date().getTime(),
            name: itemName,
            calories: calories,
            date: date
        }

        items.push(newItem);

        localStorage.setItem('items', JSON.stringify(items));

        itemNameInput.value = '';
        caloriesInput.value = '';

        itemsList(items, date);
    });
}

export {addNewItem};