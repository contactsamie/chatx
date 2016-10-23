$(function () {
  signalx.ready(function () {
    signalx.server("SendMessage", function (request) {
        setTimeout(function() {
            request.respond( "So you think that " + request.message);
        },3000);
    });
    var updateMessageBox = function (m) {
        var el = $(".msg_container_base");
          el.append(m);
           el.animate({ scrollTop: $(".msg_container_base")[0].scrollHeight }, 300);
      };
      var sendMessage = function(m) {
          m && signalx.server.SendMessage({
              Message: m,
              Recepients:[]
          }, "ReceiveMessage");
          $("#btn-input").val(' ');
          m && signalx.client.SelfMessage(m);
      };
      signalx.client.ReceiveMessage = function(message) {
          updateMessageBox('<div class="row msg_container base_receive"><div class="col-md-2 col-xs-2 avatar"><img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive "></div><div class="col-md-10 col-xs-10"><div class="messages msg_receive"><p>' + message + '</p><time datetime="2009-11-13T20:00">Timothy • 51 min</time></div></div></div>');
      };
      signalx.client.SelfMessage = function (message) {
          updateMessageBox('<div class="row msg_container base_sent"><div class="col-md-10 col-xs-10"><div class="messages msg_sent"><p>' + message + '</p><time datetime="2009-11-13T20:00">Timothy • 51 min</time></div></div><div class="col-md-2 col-xs-2 avatar"><img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive "> </div></div>');
      };
      $(document).on('click', '#btn-chat', function (e) {
          sendMessage($("#btn-input").val());
      });
      $("#btn-input").keypress(function (e) {
          var key = e.which;
          if (key == 13)  // the enter key code
          {
              sendMessage($("#btn-input").val());
              return false;
          }
      });
      signalx.client.ReceiveConId = function (result) {
              $("#conid").html(result);
          };
      setTimeout(function () {
          signalx.server.GetConnectionID("hfjfj", function (result) {
              $("#conid").html(result);
          });
      },3000);

        $(document).on('click', '.panel-heading span.icon_minim', function (e) {
            var $this = $(this);
            if (!$this.hasClass('panel-collapsed')) {
                $this.parents('.panel').find('.panel-body').slideUp();
                $this.addClass('panel-collapsed');
                $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
            } else {
                $this.parents('.panel').find('.panel-body').slideDown();
                $this.removeClass('panel-collapsed');
                $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
            }
        });
        $(document).on('focus', '.panel-footer input.chat_input', function (e) {
            var $this = $(this);
            if ($('#minim_chat_window').hasClass('panel-collapsed')) {
                $this.parents('.panel').find('.panel-body').slideDown();
                $('#minim_chat_window').removeClass('panel-collapsed');
                $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
            }
        });
        $(document).on('click', '#new_chat', function (e) {
            var size = $(".chat-window:last-child").css("margin-left");
            size_total = parseInt(size) + 400;
            alert(size_total);
            var clone = $("#chat_window_1").clone().appendTo(".container");
            clone.css("margin-left", size_total);
        });
        $(document).on('click', '.icon_close', function (e) {
            //$(this).parent().parent().parent().parent().remove();
            $("#chat_window_1").remove();
        });
    });
});





