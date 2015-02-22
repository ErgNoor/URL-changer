var current_url = "";
var new_url = "";
var elem_current_url = document.getElementById('current_url');
var elem_new_url = document.getElementById('new_url');
var mozg_url = "http://megamozg.ru/";
var habr_url = "http://habrahabr.ru/";
var re = /(http:\/\/.*\.\w+\/)(.*)/;

function change_elem_url(elem, url) {
    // elem.href = new_url;
    elem.innerHTML = url;
}

chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    current_url = tabs[0].url;
    change_elem_url(elem_current_url, current_url);

    if (current_url.indexOf("habrahabr") + 1) {
        new_url = current_url.replace(re, mozg_url+"$2");
        change_elem_url(elem_new_url, new_url);
    }
    else if (current_url.indexOf("megamozg") + 1) {
        new_url = current_url.replace(re, habr_url+"$2");
        change_elem_url(elem_new_url, new_url);
    }
    else {
        elem_current_url.style.display = 'none';
        elem_new_url.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    elem_current_url.onclick = function () {
        chrome.tabs.create({active:true, url: current_url})
    };

    elem_new_url.onclick = function () {
        chrome.tabs.create({active:true, url: new_url})
    };
});
