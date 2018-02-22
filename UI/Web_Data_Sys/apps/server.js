export function login(username, password, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/log_in", true);
  var body = {User_Name: username, Password : password};

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.send(JSON.stringify(body));

  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    console.log(parseFloat(xhr.responseText));
    console.log(typeof(xhr.responseText));
    cb([statusCode, xhr.responseText]);
  });

}

export function signup(username, password, phonenum, cb){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/sign_up", true);
  var body = {User_Name: username, Password : password, Phone_Number: phonenum};

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.send(JSON.stringify(body));

  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    console.log(xhr.responseText);
    cb(statusCode);
  });
}

export function sendverifycode(phonenum, code, cb){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/phone_verify", true);
  var body = {Phone_Number: phonenum, TempCode : code};

  console.log(body);

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.send(JSON.stringify(body));

  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    console.log(xhr.responseText);
    cb([statusCode, xhr.responseText]);
  });
}


// This is the function for send the message to the server
