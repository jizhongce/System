export function login(username, password, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/log_in", true);
  var body = {User_Name: username, Password : password};

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.send(JSON.stringify(body));

  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    console.log(xhr.responseText);
    cb(statusCode);
  });

}


// This is the function for send the message to the server
