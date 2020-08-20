var rgbColors = ["rgb(255,0,0)", "rgb(0,255,0)", "rgb(0,0,255)", "rgb(255,255,0)", "rgb(0,255,255)", "rgb(255,0,255)", "rgb(0,0,128)"];
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
var barChart = $("#chart_9003");
var myBarChart = new Chart(barChart, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: datasets
    }
});
var pieChart = $('#chart_8002');
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

var newData = {};
function updateBlocs() {
    if (!jQuery.isEmptyObject(newData)) {
        swal({
            title: "Are you sure?",
            text: "All the changes will be saved !!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    var jsonData = [];
                    for (var key in newData) {
                        jsonData.push(newData[key]);
                    }
                    $.ajax({
                        url: "/Bloc/Update",
                        type: "POST",
                        data: {
                            'jsonData': JSON.stringify(jsonData)
                        },
                        success: function () {
                            swal("Poof! Your changes are saved", {
                                icon: "success",
                            });
                        }
                    });
                } else {
                    swal("your Changes are not saved on the server!");
                }
            });
    }
         
}
function addBloc(id) {
    console.log("adding a new Bloc");
    swal("Write the title of the bloc:", {
        title: "Bloc Title",
        content: "input",
        buttons: ["Cancel", "Confirm"]

    })
        .then((value) => {
            if (value != null) {
                swal(`A new bloc with ${value} as a title is added to your report ! `);
                $.ajax({
                    url: "/Bloc/Create",
                    type: "GET",
                    data: {
                        'id': id,
                        'title': value
                    },
                    success: function (data) {
                        var usefulData = jQuery.parseJSON(data);
                        console.log(usefulData);
                        var content = '<div class="d-flex bg-primary rounded p-1"><h1 class="font-weight-bold text-light p-1" style="font-size:15px">' + usefulData["Title"] + '</h1><a class="ml-auto btn btn-success rounded dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"aria-haspopup="true" aria-expanded="false"><span class="mr-2 d-none d-lg-inline text-gray-600 small"></span></a><div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown"><a class="dropdown-item" href="/Bloc/Edit/' + usefulData["Id"] + '">Edit</a><a class="dropdown-item" onclick="removeBloc(' + usefulData["Id"]+')"> Delete </a></div>';
                        grid.addWidget(jQuery('<div class="grid-stack-item"  data-gs-id="' + usefulData["Id"] + '" id="' + usefulData["Id"]+'"><div class="grid-stack-item-content bg-white">' + content + '</div></div>'), 0, usefulData["Y"], 12, 4);

                    }
                });
            }
            else {
                swal(`No bloc is added`);
            }
        });

}
function removeBloc(id) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this bloc!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
               
                $.ajax({
                    url: "/Bloc/Delete",
                    type: "POST",
                    data: {
                        'id': id
                    },
                    success: function () {
                        grid.removeWidget($("#" + id));
                        swal("Your bloc has been deleted!", {
                            icon: "success",
                        });
                    }
                });
            } else {
                swal("Your bloc is safe!");
            }
        });
}
var grid = GridStack.init({
  alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ),
  resizable: {
    handles: 'e, se, s, sw, w'
  },
  removable: '#trash',
  removeTimeout: 100,
  acceptWidgets: '.newWidget'
});

//grid.on('added', function (e, items) { log('added ', items) });
//grid.on('removed', function (e, items) { log('removed ', items) });
grid.on('change', function (e, items) { log('change ', items) });
function log(type, items) {
    var str = '';
    items.forEach(function (item) {
        newData[item.id] = {
            Id: item.id,
            X: item.x,
            Y: item.y,
            W: item.width,
            H: item.height
        };
        str += ' (x,y)=' + item.x + ',' + item.y + ',' + item.width + ',' + item.height;
    });

  console.log(type + items.length + ' items.' + str);
}

// TODO: switch jquery-ui out
$('.newWidget').draggable({
  revert: 'invalid',
  scroll: false,
  appendTo: 'body',
  helper: 'clone'
});

