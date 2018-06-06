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
    var responseDict = {StatusCode : statusCode, ResponseText: JSON.parse(xhr.responseText) }
    cb(responseDict);
  });

}

export function signup(username, password, phonenum, firstname, lastname, cb){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/sign_up", true);
  var body = {User_Name: username, Password : password, Phone_Number: phonenum, First_Name: firstname, Last_Name: lastname};

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.send(JSON.stringify(body));

  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    var responseDict = {StatusCode : statusCode, ResponseText: JSON.parse(xhr.responseText) }
    console.log(JSON.parse(xhr.responseText));
    cb(responseDict);
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
    var responseDict = {StatusCode : statusCode, ResponseText: JSON.parse(xhr.responseText) }
    console.log(JSON.parse(xhr.responseText));
    cb(responseDict);
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
    var responseDict = {StatusCode : statusCode, ResponseText: JSON.parse(xhr.responseText) }
    cb(responseDict);
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
    var responseDict = {StatusCode : statusCode }
    cb(responseDict);
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
    var responseDict = {StatusCode : statusCode, ResponseText: JSON.parse(xhr.responseText) }
    cb(responseDict);
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
    var responseDict = {StatusCode : statusCode, ResponseText: JSON.parse(xhr.responseText) }
    cb(responseDict);
  });
}

// This is the function for send the message to the server

/*
End of User_Home function
*/


/*
Start of User_Home function after log in

getshoppingcart

addToshoppingcart

getuserprofile

*/


export function getuserprofile(User_ID, cb){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/get_user_profile", true);
  var body = {User_ID: User_ID};

  console.log(body);

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.send(JSON.stringify(body));

  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    var responseDict = {StatusCode : statusCode, ResponseText: JSON.parse(xhr.responseText) }
    cb(responseDict);
  });
}



export function getshoppingcart(User_ID, cb){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/get_shopping_cart", true);
  var body = {User_ID: User_ID};

  console.log(body);

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.send(JSON.stringify(body));

  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    var responseDict = {StatusCode : statusCode, ResponseText: JSON.parse(xhr.responseText) }
    cb(responseDict);
  });
}



export function addToshoppingcart(User_ID, TempProduct, cb){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/add_to_shopping_cart", true);
  var body = {User_ID: User_ID, TempProduct : TempProduct};

  console.log(body);

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.send(JSON.stringify(body));

  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    var responseDict = {StatusCode : statusCode, ResponseText: JSON.parse(xhr.responseText) }
    cb(responseDict);
  });
}



export function addTofavoriteproduct(User_ID, TempProductID, cb){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/add_to_favorite_product", true);
  var body = {User_ID: User_ID, TempProductID : TempProductID};

  console.log(body);

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.send(JSON.stringify(body));

  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    var responseDict = {StatusCode : statusCode, ResponseText: JSON.parse(xhr.responseText) }
    cb(responseDict);
  });
}


export function getfavoriteproduct(User_ID, cb){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/get_favorite_product", true);
  var body = {User_ID: User_ID};

  console.log(body);

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.send(JSON.stringify(body));

  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    var responseDict = {StatusCode : statusCode, ResponseText: JSON.parse(xhr.responseText) }
    cb(responseDict);
  });
}


export function getuserorder(User_ID, cb){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/get_user_order", true);
  var body = {User_ID: User_ID};

  console.log(body);

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.send(JSON.stringify(body));

  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    var responseDict = {StatusCode : statusCode, ResponseText: JSON.parse(xhr.responseText) }
    cb(responseDict);
  });
}


/*
End of User_Home function after log in
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
