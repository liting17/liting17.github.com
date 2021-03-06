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
    function register() {  
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
        if(password!==password2){
			innerHtml('请输入相同的确认密码');
			return;
		}		
        var url = "user.php";  
        xmlHttp.open("POST", url, true);  
        xmlHttp.onreadystatechange = handleResult;  
        xmlHttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');    
        xmlHttp.send("action=register&name=" + name + "&psd=" + password);  
    }  
      
    //处理服务器返回的结果/更新页面  
    function handleResult() {  
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {  
            var response = xmlHttp.responseText;  
			//alert(response);
            var json = eval('(' + response + ')');   
			
            if(json['register_result']) {  
                alert("注册成功！");  
                //页面跳转  
                //window.location.href='MainTab/home.html';  
            } else {  
                innerHtml("用户名已存在，请重新注册");  
            }  
        }  
    }  
      
    //插入提示语  
    function innerHtml(message) {  
        document.getElementById("tip").innerHTML = "<span style='font-size:12px; color:red;'>" + message + "</span>";  
    }  