var Colors = [['#000066', 'rgba(0, 0, 102,0.5)'], ['#FF007F', 'rgba(255, 0, 127,0.5)'], ['#00CC00', 'rgba(0, 204, 0,0.5)'], ['#FF0000', 'rgba(255, 0, 0,0.5)'], ['#FFFF00', 'rgba(255, 255, 0,0.5)'], ['#990099', 'rgba(153, 0, 153,0.5)'], ['#1EBA86', 'rgba(30, 186, 134,0.5)']];
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
var datasets = [
    {
        label: "Data Set Two",
        fill: true,
        data: [0, 30, 22, 20, 35, 125, 50],
        borderColor: Colors[0][0],
        backgroundColor: Colors[0][1],
        pointBackgroundColor: "#f95",
        borderWidth:3

    }, {
        label: "Data Set Three",
        fill: true,
        data: [0, 10, 42, 16, 75, 15, 59],
        borderColor: Colors[1][0],
        backgroundColor: Colors[1][1],
        pointBackgroundColor: "#f95",
        borderWidth: 3
    }
]
var labels = ["January", "February", "March", "April", "May", "June", "July"];
var newChartContext = $('#new-chart');
var newChart = new Chart(newChartContext, {
    type: "line",
    data: {
        labels: labels,
        datasets: datasets
    }
});
//choose chart type
$('.chart-type').click(function () {
    var type = $(this).attr("id");
    newChart = changeType(newChartContext, type, labels, datasets);
    console.log(type);
})
//------------
var YData = [], FData = [], draggedElt = [];
var droppableElt, parentId;
var cmp = 2;
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
                var labels = someData["labels"][draggedElt[0]];
                changeLabels(newChart, labels);
                $(this).empty();
                $(this).append("<li class='border bg-white border-info text-center text-info p-0 x-draggable'>" + draggedElt[1] + "</li>");
                break;
            case "Y":
                if (!(YData.includes(draggedElt[0]))) {
                    YData.push(draggedElt[0]);
                    var newDataset = {
                        label: draggedElt[1],
                        fill: newChart.data.datasets[0].fill,
                        data: someData[parentId][draggedElt[0]],
                        borderColor: Colors[cmp][0],
                        backgroundColor: Colors[cmp][1],
                        pointBackgroundColor: "#f95",
                        borderWidth: 3
                    }
                    addData(newChart, datasets, newDataset);
                    cmp += 1;
                    $(this).append("<li class='border border-white text-center text-light bg-dark p-0 x-draggable' style='border-raduis:0px;'>" + draggedElt[1] + "</li>");
                }
                break;
            case "F":
                if (!(FData.includes(draggedElt[0]))) {
                    FData.push(draggedElt[0]);
                    $(this).append("<li class='border border-white bg-dark text-center text-white text-light x-draggable'><i class='fa fa - times' aria-hidden='true'></i>" + draggedElt[1] + "</li>");
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
        case 'radar':
            datasets.forEach(function (item) { item["fill"] = true; });
            return type;
        default:
            return type;

    }
}
