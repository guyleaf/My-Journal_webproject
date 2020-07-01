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

}