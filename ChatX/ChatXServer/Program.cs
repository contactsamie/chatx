using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Owin.Hosting;
using Owin;
using SignalXLib.Lib;

namespace ChatXServer
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseSignalX(new SignalX(""));
        }
    }
    internal class Program
    {
        private static void Main(string[] args)
        {
            var url = "http://localhost:44111";
            using (WebApp.Start<Startup>(url))
            {
                SignalX.Server("SendMessage", (request) =>
                {
                    request.Respond( request.Message);
                });
                System.Diagnostics.Process.Start(url);
                Console.ReadLine();
            }
        }
    }
}
