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
var isFiltersHidden = false;
function hideFilters() {
    if (!isFiltersHidden) {
        $('.filters').hide("slow");
        isFiltersHidden = true;
    } else {
        $('.filters').show("slide");
        isFiltersHidden = false;
    }
}
var editMode = false;
function allowEdit() {
    if (!editMode) {
        editMode = true;
        $('.lecture').show();
        $('.edit').hide();
        $('.edit').addClass("d-none");
        $('.edit-panel').slideUp(function () {
            $('.edit-panel').removeClass("d-flex").addClass("d-none");
        });
        $('.grid-stack').removeClass('edit-mode');
        $('.grid-stack').removeClass('bg-white');
        $('.grid-stack').addClass('bg-light');
        grid.forEach((gridItem) => {
            gridItem.movable('.grid-stack-item', false);
            gridItem.resizable('.grid-stack-item', false);

        });
    } else {
        editMode = false;
        $('.lecture').hide();
        $('.edit').removeClass("d-none");
        $('.edit').show();
        $('.edit-panel').addClass("d-flex").removeClass("d-none");
        $('.edit-panel').slideDown();
        $('.grid-stack').addClass('edit-mode');
        $('.grid-stack').removeClass('bg-light');
        $('.grid-stack').addClass('bg-white');
        grid.forEach((gridItem) => {
            gridItem.movable('.grid-stack-item', true);
            gridItem.resizable('.grid-stack-item', true);

        });
    }
}
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
                            Notiflix.Notify.Success('All the modifications are saved !');
                        }
                    });
                } else {
                    swal("your Changes are not saved on the server!");
                }
            });
    } else {
        Notiflix.Notify.Success("There is no changes to be saved");

    }
         
}
function addPage(id) {
    swal({
        title: "New Page !",
        text: "Do you want to add a new page to this report ??",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willAdd) => {
        if (willAdd) {
            $.ajax({
                url: "/Report/AddPage",
                type: "GET",
                data: {
                    'id': id
                },
                success: function (data) {
                    var usefulData = jQuery.parseJSON(data);
                    console.log(usefulData);
                    var tabs = $(".tab").get();
                    var newTab = '<button onclick="showPage(' + tabs.length + ')" class="col btn p-2 d-tab tab text-white"> Page <span class="badge badge-light rounded">' + (tabs.length + 1) + '</span></button>';
                    $(".tabs").append(newTab);
                    var newPage = '<div class="row border border-info mx-2 px-0 page d-none" id="' + usefulData + '"><div  class="d-flex flex-row-reverse bg-dark w-100 edit-panel"><button class="btn btn-info rounded-circle m-1" onclick="addBloc(' + usefulData + ',' + tabs.length + ')"><i class="fa fa-plus" aria-hidden="true"></i></button><button class="btn btn-info rounded-circle m-1"  onclick="updateBlocs()"><i class="fa fa-check-circle-o" aria-hidden="true"></i></button><button class="btn btn-info rounded-circle m-1" onclick="removePage(' + usefulData + ',' + tabs.length + ')"><i class="fa fa-trash-o" aria-hidden="true"></i></button><button class="btn btn-info rounded-circle m-1"><i class="fa fa-filter" aria-hidden="true"></i></button></div><div class="col-sm-12 col-md-12 bg-white px-0 py-2 report-content"><div class="grid-stack grid-stack-instance-1 edit-mode bg-white min-vh-100" data-gs-animate="yes"></div></div></div>';
                    $('.page-content').append(newPage);
                    grid = GridStack.initAll({
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
                    grid.forEach((gridItem) => {
                        gridItem.on('change', function (e, items) { log('change ', items) });
                    });
                    swal("A new Empty Page is Added to your report !", {
                        icon: "success",
                    });
                }
            });
        } else {
            swal("No page is added !");
        }
    });
}
function addBloc(id,index) {
    console.log("adding a new Bloc");
    swal("Write the title of the bloc:", {
        title: "Bloc Title",
        content: "input",
        buttons: ["Cancel", "Confirm"]

    })
        .then((value) => {
            if (value != null) {
                var blocTitle = value;
                swal("choose color ", {
                    buttons: {
                        red: { text: "red", value: "bg-danger" },
                        green: { text: "green", value: "bg-success" },
                        blue: { text: "blue", value: "bg-primary" }
                    },
                })
                    .then((value) => {
                        var blocHeaderColor = value != null ? value:"bg-info";
                        swal(`A new bloc with ${blocTitle} as a title is added to your report ! `);
                        $.ajax({
                            url: "/Bloc/Create",
                            type: "GET",
                            data: {
                                'id': id,
                                'title': blocTitle,
                                'headerColor': blocHeaderColor
                            },
                            success: function (data) {
                                var usefulData = jQuery.parseJSON(data);
                                console.log(usefulData);
                                var content = '<div class="d-flex ' + blocHeaderColor + ' p-1"><h1 class="font-weight-bold text-light p-1" style="font-size:15px">' + usefulData["Title"] + '</h1><div class="row ml-auto pr-1"><a class="btn ' + blocHeaderColor + ' text-white rounded" href="/Bloc/Edit/' + usefulData["Id"] + '" title="Edit"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a><a class="btn ' + blocHeaderColor + ' text-white rounded" onclick="removeBloc(' + usefulData["Id"] + ',' + index+')" title="Delete"><i class="fa fa-trash-o" aria-hidden="true"></i></a></div></div>';
                                grid[index].addWidget(jQuery('<div class="grid-stack-item"  data-gs-id="' + usefulData["Id"] + '" id="' + usefulData["Id"] + '"><div class="grid-stack-item-content bg-white">' + content + '</div></div>'), 0, usefulData["Y"], 12, 4);

                            }
                        });
                    });
              
            }
            else {
                swal(`No bloc is added`);
            }
        });

}
function removeBloc(id,index) {
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
                        grid[index].removeWidget($("#" + id));
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
function removePage(id,index) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this page!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                $.ajax({
                    url: "/Report/DeletePage",
                    type: "POST",
                    data: {
                        'id': id
                    },
                    success: function () {
                        $(".tab").get(index).remove();
                        $(".page").get(index).remove();
                        var tabs = $(".tab").get();
                        for (var i = 0; i < tabs.length; i++) {
                            $(tabs[i]).attr("onClick", "showPage(" + i + ")");
                            $(tabs[i]).find("span").text(i + 1);
                        }
                        var pages = $(".page").get();
                        for (var j = 0; j < pages.length; j++) {
                            var id = $(pages[j]).attr("id");
                            var editPanel = $(pages[j]).find(".edit-panel");
                            editPanel.empty();
                            var newEditPanelContent = '<button class="btn btn-info rounded-circle m-1" onclick="addBloc(' + id + ',' + j + ')"><i class="fa fa-plus" aria-hidden="true"></i></button><button class="btn btn-info rounded-circle m-1" onclick="updateBlocs()"><i class="fa fa-check-circle-o" aria-hidden="true"></i></button><button class="btn btn-info rounded-circle m-1" onclick="removePage(' + id + ',' + j + ')"><i class="fa fa-trash-o" aria-hidden="true"></i></button><button class="btn btn-info rounded-circle m-1"><i class="fa fa-filter" aria-hidden="true"></i></button>';
                            editPanel.append(newEditPanelContent);
                            console.log(id + "  " + j);
                        }
                       
                        showPage(index - 1);
                        swal("Your page has been deleted!", {
                            icon: "success",
                        });
                    }
                });
            } else {
                swal("Your page is safe!");
            }
        });
}
var grid = GridStack.initAll({
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
grid.forEach((gridItem) => {
    gridItem.on('change', function (e, items) { log('change ', items) });
});
//grid.on('added', function (e, items) { log('added ', items) });
//grid.on('removed', function (e, items) { log('removed ', items) });
var i = 0;
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
    if (i % 3 == 0) {
        Notiflix.Notify.Warning('Click on Save Changes button before leaving this page, otherwise the changes will be lost.');
    }
    i++;

  console.log(type + items.length + ' items.' + str);
}
function showPage(index) {
    var tabs = $('.tab').get();
    var pages = $('.page').get();
    tabs.forEach(function (item) {
        $(item).removeClass("current-tab bg-info");
        $(item).addClass("d-tab");
    });
    $(tabs[index]).addClass("bg-info current-tab");
    $(tabs[index]).removeClass("d-tab");
    pages.forEach(function (page) {
        $(page).addClass("d-none");
        $(page).removeClass("d-block");
    });
    $(pages[index]).removeClass("d-none");
    $(pages[index]).addClass("d-block");



}
allowEdit();



