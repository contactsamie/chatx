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

    public class ChatMessage
    {
        public ChatMessage()
        {
            Recepients=new List<string>();
        }
        public object Message { set; get; }
        public List<string> Recepients { set; get; }
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
                    var chat = request.Message as ChatMessage;
                    if (chat?.Recepients == null || chat.Recepients.Count <= 0) return;
                    foreach (var recepient in chat.Recepients.Where(recepient => !string.IsNullOrEmpty(recepient)))
                    {
                        request.RespondToUser( recepient, request.Message);
                    }
                });
                SignalX.Server("GetConnectionID", (request) =>
                {
                    request.RespondToSender(request.ConnectionId);
                });
                System.Diagnostics.Process.Start(url);
                Console.ReadLine();
            }
        }
    }
}
