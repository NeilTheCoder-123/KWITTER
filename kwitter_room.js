
//ADD YOUR FIREBASE LINKS HERE
var firebaseConfig = {
      apiKey: "AIzaSyCN1IGzlsySXQTFi0bgZFBVzJZMC-CXXEQ",
      authDomain: "kwitter-56b23.firebaseapp.com",
      databaseURL: "https://kwitter-56b23-default-rtdb.firebaseio.com",
      projectId: "kwitter-56b23",
      storageBucket: "kwitter-56b23.appspot.com",
      messagingSenderId: "366116741391",
      appId: "1:366116741391:web:80bd62e74d9f7554919e7a",
      measurementId: "G-VEDKZZHVFL"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    console.log(localStorage.getItem("username"));
    document.getElementById("username").innerHTML = "Welcome "+localStorage.getItem("username")+"!";

function addRoom(){
      room_name = document.getElementById("roominput").value;
    firebase.database().ref("/").child(localStorage.getItem("username")).update({
        purpose: "adding room"
    });
    localStorage.setItem("room_name", room_name);
    window.location = "kwitter_page.html";
}


function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {
      childKey  = childSnapshot.key;
      console.log(childKey);
       Room_names = childKey;
       row = "<div class='roomname' id="+Room_names+" onclick='reto_roomname(this.id)' >#"+ Room_names +"</div><hr>";
      document.getElementById("output").innerHTML += row;
      });});}
getData();

function reto_roomname(id){
      console.log(id);
     window.location = "kwitter_page.html"; 
}

function logout(){
      localStorage.removeItem("username");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}