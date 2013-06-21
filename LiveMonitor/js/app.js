var Statistics;
Statistics = (function(){
    var cpuData = [];
    var memoryData = [];
    var dataLength = 500;

    function Statistics(){}

    var cpuUsageChart = new CanvasJS.Chart("cpuUsage",{
        title :{
            text: "CPU Usage"
        },
        data: [{
            type: "line",
            dataPoints: cpuData
        }]
    });

    var memoryUsageChart = new CanvasJS.Chart("memoryUsage",{
        title :{
            text: "Memory Usage"
        },
        data: [{
            type: "line",
            dataPoints: memoryData
        }]
    });

    var updateCPUChart = function (data) {
        cpuData.push({
            x: data.time,
            y: data.cpu
        });

        cpuUsageChart.render();
    };

    var updateMemoryChart = function (data) {
        memoryData.push({
            x: data.time,
            y: data.memory
        });

        memoryUsageChart.render();
    };

    var listenForUpdates = function(){
        var pusher = new Pusher('b0d95df00dd6be817af7');
        var channel = pusher.subscribe('stats_channel');

        channel.bind('update_event',function(data){
            updateCPUChart(data);
            updateMemoryChart(data);
        })
    }

    Statistics.initialize = function(){
        //Render the empty charts
        updateCPUChart({time:0, cpu:30});
        updateMemoryChart({time:0, memory:8});

        listenForUpdates();
    };

    return Statistics;
})();

Notifications = (function(){
    var Notifications = function(){}
    var showNotification = function(data){
        $('#notifications').prepend("<div class=alert><button type=button class=close data-dismiss=alert>&times;</button>" + data.message + "</div>");
    }

    var listenForUpdates = function(){
        var pusher = new Pusher('b0d95df00dd6be817af7');
        var channel = pusher.subscribe('notifications_channel');

        channel.bind('new_event',function(data){
            showNotification(data);
        })
    };

    Notifications.initialize = function(){
        listenForUpdates();
    };

    return Notifications;
})();


window.onload = function () {
    Statistics.initialize();
    Notifications.initialize();

    $('#sendnotification').click(function(e){
        $.ajax({
            type:'GET',
            url: 'notification/send',
            data: {message: $('#notification').val()},
            success: function(data){ console.log('Successfully sent the notification.') },
            error: function(){ console.log('Error while sending the notification.') }
        });

        $('#sendNotification').modal('hide');
    });
}


