using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using LiveMonitor.Hubs;
using Microsoft.AspNet.SignalR;

namespace LiveMonitor.Controllers
{
    public class NotificationController : Controller
    {
		//Update with your application keys
        private readonly static string APP_ID = "46568";
        private readonly static string APP_KEY = "b0d95df00dd6be817af7";
        private readonly static string APP_SECRET = "d5fa096323689eba8026";

        [AcceptVerbs(HttpVerbs.Get)]
        public JsonResult Send(string message)
        {
			//You need to create instance using the GlobalHost, creating a direct instance of your hub would result in to runtime exception
			IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<NotificationHub>();
			hubContext.Clients.All.showNotification(message);

            return Json(new { message = "Sent the notification." }, JsonRequestBehavior.AllowGet);
        }
    }
}
