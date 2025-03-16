let totalSavings = document.getElementById("total-savings");
let addMoney = document.getElementById("add-money");
let removeMoney = document.getElementById("remove-money");

let donutChart = document.getElementById("savings-chart").getContext('2d');

textEventListener(totalSavings);
textEventListener(removeMoney);
textEventListener(addMoney);


new Chart( donutChart, {
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
            actionName.value = "";

            if (actionName == totalSavings) {
                actionName.value = "TESTESTEST"
            } else if (actionName == removeMoney) {
                actionName.value = "TESTESTEST"
            } else if (actionName == addMoney) {
                actionName.value = "TESTESTEST"
            }
        }
    });
}