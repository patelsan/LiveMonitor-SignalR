using PusherServer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

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
            Pusher pusher = new Pusher(APP_ID, APP_KEY, APP_SECRET);
            var result = pusher.Trigger("notifications_channel", "new_event", new { message = message });

            return Json(new { message = "Sent the notification." }, JsonRequestBehavior.AllowGet);
        }
    }
}
