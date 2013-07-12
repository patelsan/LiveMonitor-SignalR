using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace LiveMonitor.Hubs
{
	public class NotificationHub: Hub
	{
		//This method could be called to directly broadcast the message form the client side proxy, 
		//however in our case, we chose to broadcast if from a NotificationController
		public void Send(string message)
		{
			Clients.All.showNotification(message);
		}
	}
}