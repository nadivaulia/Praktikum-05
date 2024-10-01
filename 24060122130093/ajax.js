function getXMLHTTPRequest() {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else {
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}

function get_server_time() {
    var xmlhttp = getXMLHTTPRequest();
    var page = 'get_server_time.php';
    xmlhttp.open("GET", page, true);
    xmlhttp.onreadystatechange = function() {
        document.getElementById('showtime').innerHTML = '<img src="./images/ajax_loader.png">';
        if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200)){
            document.getElementById('showtime').innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.send(null);
}

function add_customer_get() {
    var xmlhttp = getXMLHTTPRequest();

    var name = encodeURI(document.getElementById('name').value);
    var address = encodeURI(document.getElementById('address').value);
    var city = encodeURI(document.getElementById('city').value);

    // Validate
    if (name != "" && address != "" && city != "") {
        var url = "add_customer_get.php?name=" + name + "&address=" + address + "&city=" + city;
        var inner = "add_response"
        xmlhttp.open('GET', url, true);
        xmlhttp.onreadystatechange = function() {
            document.getElementById(inner).innerHTML = '<img src="./images/ajax_loader.png"/>';
            if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200)){
                document.getElementById(inner).innerHTML = xmlhttp.responseText;
            }
            return false;
        }
        xmlhttp.send(inner);
    } else {
        alert("Please fill all the fields");
    }
}

function add_customer_post() {
    var xmlhttp = getXMLHTTPRequest();

    var name = encodeURI(document.getElementById('name').value);
    var address = encodeURI(document.getElementById('address').value);
    var city = encodeURI(document.getElementById('city').value);

    // Validate
    if (name != "" && address != "" && city != "") {
        var url = "add_customer_post.php";
        var inner = "add_response"
        var params = "name=" + name + "&address=" + address + "&city=" + city;
        xmlhttp.open('POST', url, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.onreadystatechange = function() {
            document.getElementById(inner).innerHTML = '<img src="./images/ajax_loader.png"/>';
            if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200)){
                document.getElementById(inner).innerHTML = xmlhttp.responseText;
            }
            return false;
        }
        xmlhttp.send(params);
    } else {
        alert("Please fill all the fields");
    }
}

function callAjax(url, inner) {
    var xmlhttp = getXMLHTTPRequest();
    xmlhttp.open('GET', url, true);
    xmlhttp.onreadystatechange = function() {
        document.getElementById(inner).innerHTML = '<img src="./images/ajax_loader.png"/>';
        if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200)){
            document.getElementById(inner).innerHTML = xmlhttp.responseText;
        }
        return false
    }
    xmlhttp.send(null);
}

function showCustomer(customerid) {
    var inner = 'detail_customer';
    var url = 'get_customer.php?id=' + customerid;
    if (customerid == "") {
        document.getElementById(inner).innerHTML = '';
    } else {
        callAjax(url, inner);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let searchInput = document.getElementById('search');
    let searchResult = document.getElementById('searchResult');

    searchInput.addEventListener('keyup', function () {
        let keyword = searchInput.value;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                searchResult.innerHTML = xhr.responseText;
            }
        }

        xhr.open('GET', 'get_books.php?keyword=' + keyword, true);
        xhr.send();
    });
});

var input = document.getElementById("keywords");

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("search").click();
  }
});