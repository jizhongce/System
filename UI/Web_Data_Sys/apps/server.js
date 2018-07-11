
import {CreateParametersForRequest} from './util.js'
/*

start of User_Home function



login,
signup,
changepass
signupsendverifycode
changepasswordsendverifycode

*/

export function login(Log_In_Phone_Number, Log_In_Password, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/log_in", true);
  var body = {Log_In_Phone_Number: Log_In_Phone_Number, Log_In_Password : Log_In_Password};

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.send(JSON.stringify(body));

  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    var responseDict = {StatusCode : statusCode, ResponseText: JSON.parse(xhr.responseText) }
    cb(responseDict);
  });

}


export function signupsendverifycode(Sign_Up_Phone_Number, cb){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/sign_up_send_verify_code", true);
  var body = {Sign_Up_Phone_Number: Sign_Up_Phone_Number};

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



export function signup(Sign_Up_Phone_Number, Sign_Up_Password, Sign_Up_Verify_Code, cb){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/sign_up", true);
  var body = {Sign_Up_Phone_Number: Sign_Up_Phone_Number, Sign_Up_Password : Sign_Up_Password, Sign_Up_Verify_Code: Sign_Up_Verify_Code};

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



export function changepasswordsendverifycode(Change_Password_Phone_Number, cb){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/change_password_send_verify_code", true);
  var body = {Change_Password_Phone_Number: Change_Password_Phone_Number};

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


export function changepassword(Change_Password_Phone_Number, Change_Password_New_Password, Change_Password_Verify_Code, cb){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/change_password", true);
  var body = {Change_Password_Phone_Number: Change_Password_Phone_Number, Change_Password_New_Password: Change_Password_New_Password, Change_Password_Verify_Code: Change_Password_Verify_Code};

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


/*
End of User_Home function
*/


/*
Start of User_Home function after log in

getshoppingcart

addToshoppingcart

getuserprofile

*/


export function getuserinfo(User_ID, cb){
  var xhr = new XMLHttpRequest();

  var parameters = CreateParametersForRequest("User_ID", User_ID)
  console.log("http://localhost:8080/get_user_info" + "?" + parameters);
  xhr.open("GET", "http://localhost:8080/get_user_info" + "?" + parameters , true);

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.send();

  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    var responseDict = {StatusCode : statusCode, ResponseText: JSON.parse(xhr.responseText) }
    cb(responseDict);
  });
}


export function getuserprofile(User_ID, cb){
  var xhr = new XMLHttpRequest();

  var parameters = CreateParametersForRequest("User_ID", User_ID)
  console.log("http://localhost:8080/get_user_profile" + "?" + parameters);
  xhr.open("GET", "http://localhost:8080/get_user_profile" + "?" + parameters , true);

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.send();

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



export function shoppingcartquantitychange(User_ID, TempProduct, cb){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/shopping_cart_quantity_change", true);
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



export function deletefromshoppingcart(User_ID, Product_ID, cb){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/delete_from_shopping_cart", true);
  var body = {User_ID: User_ID, Product_ID : Product_ID};

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


export function deleteFromfavoriteproduct(User_ID, TempProductID, cb){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/delete_From_favorite_product", true);
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


export function checkfavoriteexist(User_ID, Product_ID, cb){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/check_favorite_exist", true);
  var body = {User_ID: User_ID, Product_ID: Product_ID};

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


export function getsingleproductinfo(Product_ID, cb){
  var xhr = new XMLHttpRequest();
  // Next create a parameters
  var parameters = CreateParametersForRequest("Product_ID", Product_ID)
  console.log("http://localhost:8080/get_single_product_info" + "?" + parameters);
  xhr.open("GET", "http://localhost:8080/get_single_product_info" + "?" + parameters , true);


  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.send();

  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    var responseDict = {StatusCode : statusCode, ResponseText: JSON.parse(xhr.responseText) }
    cb(responseDict);
  });
}


export function getaddressbook(User_ID, cb){
  var xhr = new XMLHttpRequest();
  // Next create a parameters
  var parameters = CreateParametersForRequest("User_ID", User_ID)
  console.log("http://localhost:8080/get_address_book" + "?" + parameters);
  xhr.open("GET", "http://localhost:8080/get_address_book" + "?" + parameters , true);


  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.send();

  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    var responseDict = {StatusCode : statusCode, ResponseText: JSON.parse(xhr.responseText) }
    cb(responseDict);
  });
}


export function addnewaddress(User_ID, New_Address, cb){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/add_new_address", true);
  var body = {User_ID: User_ID, New_Address: New_Address};

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


export function deleteaddress(User_ID, Address_ID, cb){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/delete_address", true);
  var body = {User_ID: User_ID, Address_ID: Address_ID};

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


export function editaddress(User_ID, New_Address, cb){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/edit_address", true);
  var body = {User_ID: User_ID, New_Address: New_Address};

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



export function submitorder(User_ID, Shopping_Cart, Shipping_Address, cb){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/submit_order", true);
  var body = {User_ID: User_ID, Shopping_Cart: Shopping_Cart, Shipping_Address: Shipping_Address};

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



export function getsingleorder(Order_ID, cb){
  var xhr = new XMLHttpRequest();
  // Next create a parameters
  var parameters = CreateParametersForRequest("Order_ID", Order_ID)
  console.log("http://localhost:8080/get_single_order" + "?" + parameters);
  xhr.open("GET", "http://localhost:8080/get_single_order" + "?" + parameters , true);


  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.send();

  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    var responseDict = {StatusCode : statusCode, ResponseText: JSON.parse(xhr.responseText) }
    cb(responseDict);
  });
}


export function depositpaymentsubmited(User_ID, Deposit_Payment_Info, cb){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/deposit_payment_submited", true);
  var body = {User_ID: User_ID, Deposit_Payment_Info: Deposit_Payment_Info};

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
