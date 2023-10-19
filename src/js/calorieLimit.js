function calorieLimit(){
    const changeLimitButton = document.getElementById('change-limit');
    const changeLimitButtonElement = document.querySelector('.calorie-limit__change-button');
    const setLimitElement = document.querySelector('.calorie-limit__set-new-limit');
    const totalCalorieElement = document.querySelector('.total-calorie');
    const warningCalorieElement = document.querySelector('.calorie-limit__warning');
    const setLimitInput = document.getElementById('newLimitInput');
    const setLimitButton = document.getElementById('newLimitButton');
    const calorieLimitElement = document.querySelector('.limit');

    let limit = parseInt(calorieLimitElement.textContent);
    setLimitInput.value = limit;

    changeLimitButton.addEventListener('click', ()=>{
        changeLimitButtonElement.style.display = 'none';
        setLimitElement.style.display = 'block';
    });

    setLimitButton.addEventListener('click', ()=>{
        changeLimitButtonElement.style.display = 'block';
        setLimitElement.style.display = 'none';
        limit = setLimitInput.value;
        calorieLimitElement.textContent = setLimitInput.value;
        complianceLimit();
    });

    function complianceLimit(){
        const currentCalorie = parseInt(totalCalorieElement.textContent);
        if(currentCalorie > limit){
            totalCalorieElement.style.color = 'red';
            warningCalorieElement.style.display = 'block';
        } else {
            totalCalorieElement.style.color = 'green';
            warningCalorieElement.style.display = 'none';
        }
    }

    complianceLimit();
}

export {calorieLimit};