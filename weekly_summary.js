/*
	周报邮件模版

    设为日期触发器，每周五自动提醒写周报，点击复制收件人，标题，内容模板到剪贴板，并跳转钉钉

	邮件标题的日期示例: 周报20180423-20180427

	使用时需要自己修改maillist, title_prefix和content模板
*/

function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

function format_date(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  if (day < 10) {
    day = '0' + day;
  }
  if (month < 10) {
    month = '0' + month;
  }
  var formattedDate = year + month + day;
  return formattedDate;
}

function construct_postfix() {
  var begin = format_date(getMonday(new Date()))
  var end = format_date(new Date())
  return begin + "-" + end;
}

var maillist = "aaa <aaa@gmail.com>; bbb <bbb@gmail.com>;"
var title_prefix = "周报 "
var title = title_prefix + construct_postfix()

var content = `
【本周】


【下周】

`
$ui.render({
  views: [{
      type: "button",
      props: {
        title: "复制收件人",
        id: "receiver_button"
      },
      layout: function(make, view) {
        make.center.equalTo(view.super)
        
      },
      events: {
        tapped: function(sender) {
          $clipboard.text = maillist
          $app.openURL("dingtalk://")
        }
      }
    },
    {
      type: "button",
      props: {
        title: "复制标题",
        id: "title_button"
      },
      layout: function(make) {
        var view = $("receiver_button")
        make.left.equalTo(view.left)
        make.top.equalTo(view.bottom).offset(16)
      },
      events: {
        tapped: function(sender) {
          $clipboard.text = title
          $app.openURL("dingtalk://")
        }
      }
    },
    {
      type: "button",
      props: {
        title: "复制内容模版"
      },
      layout: function(make, view) {
        var view = $("title_button")
        make.left.equalTo(view.left)
        make.top.equalTo(view.bottom).offset(16)

      },
      events: {
        tapped: function(sender) {
          $clipboard.text = content
          $app.openURL("dingtalk://")
        }
      }
    },
  ]
})
