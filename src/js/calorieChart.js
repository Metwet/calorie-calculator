function calorieChart(items) {
    const calorieChartBlock = document.querySelector('.calorie-chart__block');
    if(items.length){
        calorieChartBlock.style.display = 'block';
    } else {
        calorieChartBlock.style.display = 'none';
    }

    const canvas = document.getElementById('calorieChart');
    const parentBlock = canvas.parentElement;
    canvas.width = parentBlock.clientWidth;
    const ctx = canvas.getContext('2d');

    function drawChart(items) {
        const barWidth = 36;
        const spacing = 30;
        const startX = 20;
        let x = startX;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const maxCalories = Math.max(...items.map((item) => item.calories));

        items.forEach((item) => {
            const barHeight = (item.calories / maxCalories) * (canvas.height - 50);
            ctx.fillStyle = 'beige';
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

            ctx.fillStyle = 'black';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            const textLines = item.name.match(/.{1,10}/g);
            textLines.forEach((line, index) => {
                ctx.fillText(line, x + barWidth / 2, canvas.height - 20 + index * 14); // Переместите название под бар
            });

            x += barWidth + spacing;
        });
    }

    drawChart(items);
}

export {calorieChart};