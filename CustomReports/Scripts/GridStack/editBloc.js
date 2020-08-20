var rgbColors = ["rgb(255,0,0)", "rgb(0,255,0)", "rgb(0,0,255)", "rgb(255,255,0)", "rgb(0,255,255)", "rgb(255,0,255)", "rgb(0,0,128)"];
var someData = {
    labels: {
        days: ["Mond", "Tues", "Thurs", "Frid", "Satur", "Sun"],
        names: ["John", "Jane", "Jessy", "Thomas", "Adam", "Salah", "Anis"],
        companies: ["IBM", "GOOGLE", "MICROSOFT", "FACEBOOK", "TWITTER", "INSTEGRAM", "OTHERS"]
    },
    table1: {
        item1: [15, 30, 14, 36, 87, 78, 34],
        item2: [25, 10, 14, 36, 87, 78, 94],
        item3: [35, 60, 14, 36, 87, 78, 94]
    },
    table2: {
        item4: [45, 30, 14, 36, 87, 78, 74],
        item5: [55, 0, 14, 36, 87, 78, 54],
        item6: [65, 10, 14, 36, 87, 78, 44]
    }
};
var barChart = $('#bar');
var lineChart = $('#line');
var areaChart = $('#area');
var pieChart = $("#pie");
var doughnutChart = $("#doughnut");
var datasets = [
    {
        label: "Data Set Two",
        fill: false,
        lineTension: 0,
        backgroundColor: "#1C5ED1",
        borderColor: "rgba(98, 98, 98, 0.5)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        borderWidth: 1,
        pointBorderColor: "rgba(98, 98, 98, 0.5)",
        pointBackgroundColor: "#f95",
        pointHoverBackgroundColor: "#B51F1F",
        pointHoverBorderColor: "rgba(98, 98, 98, 0.5)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [0, 30, 22, 20, 35, 125, 50],
        spanGaps: false
    }
];
var labels = ["January", "February", "March", "April", "May", "June", "July"];
var myBarChart = new Chart(barChart, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: datasets
    }
});
var myLineChart = new Chart(lineChart, {
    type: 'line',
    data: {
        labels: labels,
        datasets: datasets
    }
});
var myPieChart = new Chart(pieChart, {
    type: 'pie',
    data: {
        datasets: [{
            backgroundColor: rgbColors,
            data: [10, 20, 30]
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ]
    }
});
var myDoughnutChart = new Chart(doughnutChart, {
    type: 'doughnut',
    data: {
        datasets: [{
            backgroundColor: rgbColors,
            data: [10, 20, 30]
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ]
    }
});
var myAreaChart = new Chart(areaChart, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [
            {
                label: "Data Set Two",
                fill: true,
                lineTension: 0,
                backgroundColor: "#D423E1",
                borderColor: "rgba(98, 98, 98, 0.5)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                borderWidth: 1,
                pointBorderColor: "rgba(98, 98, 98, 0.5)",
                pointBackgroundColor: "#f95",
                pointHoverBackgroundColor: "#B51F1F",
                pointHoverBorderColor: "rgba(98, 98, 98, 0.5)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [0, 30, 22, 20, 35, 125, 50],
                spanGaps: false
            }
        ]
    }
});


var newChartContext = $('#new-chart');
var newChart = new Chart(newChartContext, {
    type: "bar",
    data: {
        labels: labels,
        datasets: [
            {
                label: "Data Set Two",
                fill: false,
                lineTension: 0,
                backgroundColor: "#B51F1F",
                borderColor: "rgba(98, 98, 98, 0.5)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                borderWidth: 1,
                pointBorderColor: "rgba(98, 98, 98, 0.5)",
                pointBackgroundColor: "#f95",
                pointHoverBackgroundColor: "#B51F1F",
                pointHoverBorderColor: "rgba(98, 98, 98, 0.5)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [0, 30, 22, 20, 35, 125, 50],
                spanGaps: false
            }
        ]
    }
});
console.log(newChart);
//choose chart type
var XData, YData = [], FData = [];
var draggedElt = [];
var parentId;
var droppableElt;
var cmp = 0;
var chartData = [];
chartData["data"] = [];

chartData["data"]["datasets"] = [];
$('.chart-type').click(function () {
    var type = $(this).attr("id");
    newChart = changeType(newChartContext, type, labels, datasets);
    console.log(type);
})
//

//drag and drop
$(".draggable").draggable({
    revert: true,
    start: function (event, ui) {
        draggedElt[0] = $(this).attr("id");
        draggedElt[1] = $(this).text();
        parentId = $(this).parent().attr("id");

    }
})
$(".droppable").droppable({
    drop: function (event, ui) {
        droppableElt = $(this).attr("id");
        switch (droppableElt) {
            case "X":
                XData = draggedElt[1];
                var labels = someData["labels"][draggedElt[0]];
                console.log(labels);
                changeLabels(newChart, labels);
                $(this).empty();
                $(this).append("<li class='list-group-item bg-dark text-white x-draggable'>" + draggedElt[1] + "</li>");
                break;
            case "Y":
                if (!(YData.includes(draggedElt[0]))) {
                    YData.push(draggedElt[0]);
                    var newDataset = {
                        label: "Data Set Two",
                        fill: true,
                        lineTension: 0,
                        backgroundColor: "#B51F1F",
                        borderColor: "rgba(98, 98, 98, 0.5)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        borderWidth: 1,
                        pointBorderColor: "rgba(98, 98, 98, 0.5)",
                        pointBackgroundColor: "#f95",
                        pointHoverBackgroundColor: "#B51F1F",
                        pointHoverBorderColor: "rgba(98, 98, 98, 0.5)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [0, 30, 22, 20, 35, 125, 50],
                        spanGaps: false
                    }
                    console.log(draggedElt[0], draggedElt[1]);
                    newDataset["label"] = draggedElt[1];
                    newDataset["backgroundColor"] = rgbColors[cmp];
                    newDataset["data"] = someData[parentId][draggedElt[0]];
                    addData(newChart, datasets, newDataset);
                    cmp += 1;
                    console.log(newDataset);
                    console.log(newChart);
                    $(this).append("<li class='list-group-item bg-dark text-white x-draggable'>" + draggedElt[1] + "</li>");
                }
                break;
            case "F":
                if (!(FData.includes(draggedElt[0]))) {
                    FData.push(draggedElt[0]);
                    $(this).append("<li class='list-group-item bg-dark text-white x-draggable'>" + draggedElt[1] + "</li>");
                }
                break;
        }

    }
})


//---------------chart functions
function addData(chart, datasets, newDataset) {
    datasets.push(newDataset)
    chart.data.datasets = datasets;
    chart.update();
}
function changeLabels(chart, labels) {
    chart.data.labels = labels;
    chart.update();
}
function changeType(newChartContext, type, labels, datasets) {

    type = changeDatasets(type, datasets);
    var newChart = new Chart(newChartContext, {
        type: type,
        data: {
            labels: labels,
            datasets: datasets
        }
    });
    return newChart;

}
function changeDatasets(type, datasets) {
    switch (type) {
        case "area":
            datasets.forEach(function (item) { item["fill"] = true; });
            type = "line";
            return type;
            break;
        case "line":
            datasets.forEach(function (item) { 
                item["fill"] = false; 
                item["background"] = false; 
            });
            return type;
            break;
        default:
            return type;

    }
}
