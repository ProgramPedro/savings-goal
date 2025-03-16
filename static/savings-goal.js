let totalSavings = document.getElementById("total-savings");
let ogRemaining = 10000;

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
            data: [10000, 0],
            backgroundColor: [
                'rgb(144, 238, 144)',
                'rgb(35, 83, 71)'
            ],
            hoverOffset: 4,
        }],
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#DAF1DE'
                }
            }
        }
    }
});


function textEventListener(actionName) {
    actionName.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            //Prevent the form submission (if the input is inside a form)
            event.preventDefault();

            if (isNaN(actionName.value)) {
                actionName.value = "";
                window.alert("ERROR: number typed is NOT a number! Please try again");
            } else {
                
                if (actionName == totalSavings) {
                    donutChart.data.datasets[0].data[0] = parseFloat(actionName.value);
                    ogRemaining = parseFloat(actionName.value);
                    donutChart.update();
                    actionName.value = "";

                } else if (actionName == removeMoney) {
                    if (donutChart.data.datasets[0].data[1] - parseFloat(actionName.value) < 0) {
                        donutChart.data.datasets[0].data[1] = 0;
                        /* Add a way for remove money to have an original total savings count!*/
                        donutChart.data.datasets[0].data[0] = ogRemaining;
                        donutChart.update();
                        actionName.value = "";
                    } else {
                        donutChart.data.datasets[0].data[1] -= parseFloat(actionName.value);
                        donutChart.data.datasets[0].data[0] += donutChart.data.datasets[0].data[1];
                        donutChart.update();
                        actionName.value = "";
                    }

                } else if (actionName == addMoney) {
                    if ((donutChart.data.datasets[0].data[1] + parseFloat(actionName.value)) > ogRemaining) {
                        donutChart.data.datasets[0].data[1] = ogRemaining;
                        donutChart.data.datasets[0].data[0] = 0;
                        donutChart.update();
                        actionName.value = "";
                    } else {
                        donutChart.data.datasets[0].data[1] += parseFloat(actionName.value);
                        donutChart.data.datasets[0].data[0] = ogRemaining - donutChart.data.datasets[0].data[1];
                        donutChart.update();
                        actionName.value = "";
                    }
                    
                }
            }
        }
    });
}
