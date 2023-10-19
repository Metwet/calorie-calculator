import { calorieLimit } from "./calorieLimit.js";
import { calorieChart } from './calorieChart.js';

function itemsList(items, day) {
    const itemsListContent = document.querySelector('.items-list');
    const sortNameButton = document.getElementById('filter-name');
    const sortCaloriesButton = document.getElementById('filter-calorie');
    const deleteSelectedButton = document.getElementById('delete');
    const selectAllCheckbox = document.getElementById('allCheckboxes');

    const totalDateElement = document.querySelector('.total-date');
    const totalCalorieElement = document.querySelector('.total-calorie');
    const totalDateInput = document.getElementById('totalDate');
    const changeDateButton = document.getElementById('changeTotalDate');

    let currentDate = day;
    let currentCaloriesSum = 0;
    let currentItems = [];
    totalDateInput.value = currentDate;
    totalDateElement.innerHTML = currentDate;

    renderItems();

    function renderItems() {
        itemsListContent.innerHTML = '';
        currentCaloriesSum = 0;
        currentItems = [];
        items.forEach((item)=>{
            if(item.date === currentDate){
                currentItems.push(item);
                currentCaloriesSum += item.calories;
            }
        });

        renderInHTML(currentItems);

        totalCalorieElement.innerHTML = `${currentCaloriesSum} калории`;

        if(!currentItems.length){
            itemsListContent.innerHTML = '<div class="item-row">Список продуктов пуст.</div>'
        }

        calorieLimit();
        calorieChart(currentItems);
    }

    function renderInHTML(renderItems) {
        itemsListContent.innerHTML = '';
        renderItems.forEach((renderItem)=>{
            const itemRow = document.createElement('div');
            itemRow.classList.add('item-row');
            itemRow.innerHTML = `
                <div class="name-column">
                    ${renderItem.name}
                </div>
                <div class="calorie-column">
                    ${renderItem.calories}
                </div>
                <div class="checkbox-column">
                    <input type="checkbox" class="item-checkboxes">
                </div>
            `;
            itemsListContent.appendChild(itemRow);
        });
    }

    changeDateButton.addEventListener('click', (e)=>{
        e.preventDefault();
        currentDate = totalDateInput.value;
        totalDateElement.innerHTML = currentDate;
        renderItems();
    });

    selectAllCheckbox.addEventListener('change', ()=>{
        const checkboxes = document.querySelectorAll('.item-checkboxes');
        checkboxes.forEach((checkbox)=>{
            checkbox.checked = selectAllCheckbox.checked;
        })
    });

    const itemCheckboxes = document.querySelectorAll('.item-checkboxes');
    itemCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            const areAllSelected = Array.from(itemCheckboxes).every((cb) => cb.checked);
            selectAllCheckbox.checked = areAllSelected;
        });
    });

    deleteSelectedButton.addEventListener('click', (e) => {
        e.preventDefault();
        const checkboxes = document.querySelectorAll('.item-checkboxes');
        const itemsToRemove = [];
      
        checkboxes.forEach((checkbox, index) => { 
            if (checkbox.checked) {
                itemsToRemove.push(currentItems[index]);
            }
        });
      
        itemsToRemove.forEach((itemToRemove) => {
            const indexInItems = items.findIndex((item) => item.id === itemToRemove.id);
            if (indexInItems !== -1) {
                items.splice(indexInItems, 1);
            }
        
            const indexInCurrentItems = currentItems.findIndex((item) => item.id === itemToRemove.id);
            if (indexInCurrentItems !== -1) {
                currentItems.splice(indexInCurrentItems, 1);
            }
        });
        
        if(itemsToRemove.length > 0){
            selectAllCheckbox.checked = false;
        }
        localStorage.setItem('items', JSON.stringify(items));
        renderItems();
    });

    let nameSortOrder = 1;
    let calorieSortOrder = 1;
    
    sortNameButton.addEventListener('click', (e)=>{
        e.preventDefault();
        currentItems.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1 * nameSortOrder;
            }
            if (nameA > nameB) {
                return 1 * nameSortOrder;
            }
            return 0;
        });
        nameSortOrder *= -1;
        renderInHTML(currentItems);
    });

    sortCaloriesButton.addEventListener('click', (e)=>{
        e.preventDefault();
        currentItems.sort((a, b) => (a.calories - b.calories) * calorieSortOrder);
        calorieSortOrder *= -1;
        renderInHTML(currentItems);
    });

}

export {itemsList};