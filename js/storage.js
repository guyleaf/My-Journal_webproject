var firebaseConfig = {
    apiKey: "AIzaSyAl85nYdAzpRvImPuRmV0wBYIoJsuYvOz4",
    authDomain: "webproject-c0c23.firebaseapp.com",
    databaseURL: "https://webproject-c0c23.firebaseio.com",
    projectId: "webproject-c0c23",
    storageBucket: "webproject-c0c23.appspot.com",
    messagingSenderId: "289612517070",
    appId: "1:289612517070:web:d380d0f343686f3fdc0a9f",
    measurementId: "G-48K4SWPMER"
};

firebase.initializeApp(firebaseConfig);
// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();
var store = firebase.firestore();
// Create a storage reference from our storage service
var storageRef = storage.ref();
var storeRef = store.collection('notebooks');
var docRef = storeRef.doc("xy4M5tEubPgcyMiPUL5B");
function getImage(image_name, classname) {
    storageRef.child(image_name).getDownloadURL().then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'
      
        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
          var blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();

        // Or inserted into an <img> element:
        var img = document.getElementsByClassName(classname)[0];
        img.src = url;
      }).catch(function(error) {
        // Handle any errors
        console.log('error loading images')
      }
    );
}

function getData(month, page) {
  storeRef.doc(month).get().then(function(result){
    result = result.data();
    let tmp = result.text[page - 1].replace("\\n", "\r\n");
    $('.main-text').html(tmp);
    $(".main__pic").attr("src", result.img.main[page - 1] ? result.img.main[page - 1] : "");
    if (result.img.aside != undefined)
    {
        $(".main__aside").attr("src", result.img.aside);
        $(".main-text").css("justify-content", "start");
    }
    else
    {
        $(".main-text").css("justify-content", "center");
    }
    
    $(".button_back").css("visibility", "visible");
    $(".button_next").css("visibility", "visible");
    $(".button_back").removeAttr("href");
    $(".button_next").removeAttr("href");

    let months = [
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ]
    if (page == 1)
    {
        if (months[months.indexOf(month) - 1] != undefined)
            $(".button_back").attr("href", months[months.indexOf(month) - 1] + ".html");
        else
            $(".button_back").css("visibility", "hidden");
    }
    
    if (result.text.length == page)
    {
        if (months[months.indexOf(month) + 1] != undefined)
            $(".button_next").attr("href", months[months.indexOf(month) + 1] + ".html");
        else
            $(".button_next").css("visibility", "hidden");
    }

    $(".current").html("Home > " + month + " > " + page);
  });
}