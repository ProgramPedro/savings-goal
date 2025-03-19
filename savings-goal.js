//Action Names
let totalSavings = document.getElementById("total-savings");
let addMoney = document.getElementById("add-money");
let removeMoney = document.getElementById("remove-money");

//Stores the amount in local storage so users may come back to add onto their savings
if (!localStorage.getItem('userData')) {
    jsonData = {
        savings_goal_amount: 10000,
        amount_remaining: 10000,
        amount_saved: 0
    };

    localStorage.setItem('userData', JSON.stringify(jsonData));
}

let storedData = JSON.parse(localStorage.getItem('userData'));

//Stored the savings goal, amount of money remaining to reach the goal, and total amount already saved
let savingsGoalAmount = Number(storedData.savings_goal_amount);
let remaining = Number(storedData.amount_remaining);
let saved = Number(storedData.amount_saved);

//Listens for when the user clicks "Enter" key depending on the specific textbox
textEventListener(totalSavings);
textEventListener(removeMoney);
textEventListener(addMoney);

//Initialize the donut chart
let donutChartContext = document.getElementById("savings-chart").getContext('2d');
let donutChart = new Chart( donutChartContext, {
    type: 'doughnut',
    data: {
        labels: [
            'Remaining',
            'Saved'
        ],
        datasets: [{
            data: [remaining, saved],
            backgroundColor: [
                'rgb(144, 238, 144)',
                'rgb(35, 83, 71)'
            ],
            borderColor: "#91D59A" ,
            hoverOffset: 4,
        }],
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: "#91D59A"
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
                    savingsGoalAmount = parseFloat(actionName.value);
                    donutChart.data.datasets[0].data[0] = parseFloat(actionName.value) - donutChart.data.datasets[0].data[1];
                    donutChart.update();
                    actionName.value = "";

                } else if (actionName == removeMoney) {
                    if (donutChart.data.datasets[0].data[1] - parseFloat(actionName.value) <= 0) {
                        donutChart.data.datasets[0].data[1] = 0;
                        /* Add a way for remove money to have an original total savings count!*/
                        donutChart.data.datasets[0].data[0] = savingsGoalAmount;
                        donutChart.update();
                        actionName.value = "";
                    } else {
                        donutChart.data.datasets[0].data[1] -= parseFloat(actionName.value);
                        donutChart.data.datasets[0].data[0] += donutChart.data.datasets[0].data[1];
                        donutChart.update();
                        actionName.value = "";
                    }

                } else if (actionName == addMoney) {
                    if ((donutChart.data.datasets[0].data[1] + parseFloat(actionName.value)) > savingsGoalAmount) {
                        donutChart.data.datasets[0].data[1] = savingsGoalAmount;
                        donutChart.data.datasets[0].data[0] = 0;
                        donutChart.update();
                        actionName.value = "";
                    } else {
                        donutChart.data.datasets[0].data[1] += parseFloat(actionName.value);
                        donutChart.data.datasets[0].data[0] = savingsGoalAmount - donutChart.data.datasets[0].data[1];
                        donutChart.update();
                        actionName.value = "";
                    }
                    
                }
                
                //Updated local storage data
                storedData.amount_remaining = donutChart.data.datasets[0].data[0];
                storedData.amount_saved = donutChart.data.datasets[0].data[1];
                storedData.savings_goal_amount = savingsGoalAmount;
                localStorage.setItem('userData', JSON.stringify((storedData)));
            }
        }
    });
}