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

    var listenForUpdates = function () {
    	var connection = $.hubConnection("http://localhost:8080")
    	var hubProxy = connection.createHubProxy('statsHub')
    	hubProxy.on('updateStats', function (data) {
    		updateCPUChart(data);
    		updateMemoryChart(data);

    	});

    	connection.start();
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

    var listenForUpdates = function () {
    	var notificaiton = $.connection.notificationHub;
    	notificaiton.client.showNotification = function (message) {
    		$('#notifications').prepend("<div class=alert><button type=button class=close data-dismiss=alert>&times;</button>" + message + "</div>");
    	};

    	$.connection.hub.start();
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


