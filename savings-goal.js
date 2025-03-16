let totalSavings = document.getElementById("total-savings");
let addMoney = document.getElementById("add-money");
let removeMoney = document.getElementById("remove-money");

let donutChartContext = document.getElementById("savings-chart").getContext('2d');

textEventListener(totalSavings);
textEventListener(removeMoney);
textEventListener(addMoney);


let donutChart = new Chart( donutChartContext, {
    type: 'doughnut',
    data: {
        labels: [
            'Remaining',
            'Saved'
        ],
        datasets: [{
            data: [10000, 500],
            backgroundColor: [
                'rgb(144, 238, 144)',
                'rgb(6, 64, 43)'
            ],
            hoverOffset: 4,
        }],
    },
    options: {
        responsive: false,
        maintainAspectRatio: false
    }
});


function textEventListener(actionName) {
    actionName.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            //Prevent the form submission (if the input is inside a form)
            event.preventDefault();
            //Clears the textbox when the user clicks the enter key

            if (actionName == totalSavings) {
                donutChart.data.datasets[0].data[0] = parseFloat(actionName.value);
                donutChart.update();
                actionName.value = "";
            } else if (actionName == removeMoney) {
                donutChart.data.datasets[0].data[1] = donutChart.data.datasets[0].data[1] - parseFloat(actionName.value);
                donutChart.update();
                actionName.value = "";
            } else if (actionName == addMoney) {
                donutChart.data.datasets[0].data[1] = donutChart.data.datasets[0].data[1] + parseFloat(actionName.value);
                donutChart.update();
                actionName.value = "";
            }
        }
    });
}