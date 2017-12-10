    //定义HTTP连接对象  
    var xmlHttp;  
                  
    //实例化HTTP连接对象  
    function createXmlHttpRequest() {  
        if(window.XMLHttpRequest) {  
            xmlHttp = new XMLHttpRequest();  
        } else if(window.ActiveXObject) {  
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");  
        }   
    }  
                  
    //发起注册请求  
    function modifyPsd() {  
        createXmlHttpRequest();  
        var name = document.getElementById("username").value;  
        var password = document.getElementById("password").value; 
		var password2 = document.getElementById("password2").value;
        if(name == null || name == "") {  
            innerHtml("请输入用户名");  
            return;  
        }  
        if(password == null || password == "") {  
            innerHtml("请输入密码");  
            return;  
        }   		
        var url = "user.php";  
        xmlHttp.open("POST", url, true);  
        xmlHttp.onreadystatechange = handleResult;  
        xmlHttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');    
        xmlHttp.send("action=modifyPsd&&name=" + name + "&psd=" + password+"&newpsd=" + password2);   
    }  
      
    //处理服务器返回的结果/更新页面  
    function handleResult() {  
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {  
            var response = xmlHttp.responseText;  
			//alert(response);
            var json = eval('(' + response + ')');   
			
            if(json['modify_result']) {  
                alert("密码修改成功！");  
                //页面跳转  
                //window.location.href='MainTab/home.html';  
            } else {  
                innerHtml("用户名或旧密码错误，请重新输入");  
            }  
        }  
    }  
      
    //插入提示语  
    function innerHtml(message) {  
        document.getElementById("tip").innerHTML = "<span style='font-size:12px; color:red;'>" + message + "</span>";  
    }  