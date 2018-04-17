/*

start of User_Home function

login,
signup,
sendverifycode,
changepassgetphone,
changepass,
phonechangelogin,
changephone,

*/

export function login(username, password, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/log_in", true);
  var body = {User_Name: username, Password : password};

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.send(JSON.stringify(body));

  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    cb([statusCode, JSON.parse(xhr.responseText)]);
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
    console.log(JSON.parse(xhr.responseText));
    cb([statusCode, JSON.parse(xhr.responseText)]);
  });
}

export function changepassgetphone(username, cb){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/pass_change_user", true);
  var body = {User_Name: username};

  console.log(body);

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.send(JSON.stringify(body));

  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    cb([statusCode, JSON.parse(xhr.responseText)]);
  });
}

export function changepass(id, newpassword, cb){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/change_pass", true);
  var body = {User_ID: id, New_Password : newpassword};

  console.log(body);

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.send(JSON.stringify(body));

  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    cb(statusCode);
  });
}

export function phonechangelogin(username, password, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/phone_change_log_in", true);
  var body = {User_Name: username, Password : password};

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.send(JSON.stringify(body));

  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    cb([statusCode, JSON.parse(xhr.responseText)]);
  });

}

export function changephone(id, newphone, cb){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/change_phone", true);
  var body = {User_ID: id, New_Phone : newphone};

  console.log(body);

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.send(JSON.stringify(body));

  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    cb([statusCode, JSON.parse(xhr.responseText)]);
  });
}

// This is the function for send the message to the server

/*
End of User_Home function
*/


/*

start of Home1 function

getAllproducts

*/

export function getAllproducts(cb){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:8080/get_all_products", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send();

  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    var responseDict = {StatusCode : statusCode, ResponseText: JSON.parse(xhr.responseText) }
    cb(responseDict);
  });
}
