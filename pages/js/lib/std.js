"use strict";

function get_radio_value(radio_name) {

    var radios = document.getElementsByName(radio_name);

    for (var i = 0, length = radios.length; i < length; i++)
    {
        if (radios[i].checked)
        {
            return radios[i].value;
        }
    }

    return null;

}

function get_radio_value_to_id(radio_name, value) {

    var radios = document.getElementsByName(radio_name);

    for (var i = 0, length = radios.length; i < length; i++)
    {
        if (radios[i].value == value)
        {
            return radios[i].id;
        }
    }

    return null;

}

function trim(str) {
    return str.trim();
}

function html_post_json(url,json_str,onrecieve)
{
    var h = getXmlHttp();
    h.open('POST', url, true);
    h.setRequestHeader('Content-Type','application/json');
    h.onreadystatechange = function() {

        if(h.readyState != 4) {
            return;
        }

        if(h.status == 200)
        {
            var res = JSON.parse(h.responseText);
            if (res.status == 'error') {
                alert(res.message);
            }else if (res.status == 'warning') {
                alert(res.message);
            }else if (res.status != 'success') {
                alert('Неизвестный статус ответа: ' + res.status);
            }else{
                if (onrecieve != null) {
                    onrecieve(res.data);
                }
            }
        }
        else
        {
            alert('Ошибка HTTP-запроса! Код ошибки: ' + h.status + '. ' + h.responseText);
        }

    }

    h.send( json_str );
}

function try_http_post(url,post_param) {
    try {
        return http_post(url,post_param);
    } catch(e) {
        let err_msg = "<b>" + e.name + "</b><br />" + e.message;
        webix.message(err_msg, "error");
    }

    return false;
}

// post_param = {};
// post_param['par1'] = val1;
// . . .
// post_param['parN'] = valN;
function http_post(url,post_param)
{
    var msg = "";

    for (var param_name in post_param)
    {
      msg = msg +
          '--boundary\r\n' +
          'Content-disposition: form-data; name="' + param_name + '"\r\n\r\n'+
          post_param[param_name]+'\r\n';
    }

    msg = msg + '--boundary\r\n';

    var h = getXmlHttp();
    h.open('POST', url, false);
    h.setRequestHeader("Content-Type","multipart/form-data; charset=utf8; boundary=boundary");
    h.setRequestHeader("Content-Length",msg.length);

    h.send( msg );

    if(h.status == 200) {
        return h.responseText;
    } else {
        throw {
            name: "Ответ сервера"
            , message: "Код ошибки: " + h.status + "<br />" + h.responseText
            , code: 0
        };
    }

    return false;
}

function getXmlHttp(){
    var xmlhttp;

    if (typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }else{
        xmlhttp = false;
    }

    return xmlhttp;
}
