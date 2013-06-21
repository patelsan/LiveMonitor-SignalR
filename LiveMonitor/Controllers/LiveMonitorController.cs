using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LiveMonitor.Controllers
{
    public class LiveMonitorController: Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}