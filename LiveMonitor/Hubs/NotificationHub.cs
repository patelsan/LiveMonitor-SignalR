using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace LiveMonitor.Hubs
{
	public class NotificationHub: Hub
	{
		//This method could be invoked from the client side through the proxy to publish the messages. 
		//However in our case, we chose to do it from the controller instead, so server could do any additional work.
		public void Send(string message)
		{
			Clients.All.showNotification(message);
		}
	}
}
