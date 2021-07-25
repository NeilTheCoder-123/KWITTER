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
  firebase.initializeApp(firebaseConfig);

  user_name = localStorage.getItem("username");
  room_name = localStorage.getItem("room_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;
    console.log(message_data);

    name = message_data['name'];
    message = message_data['message'];
    likes = message_data['like'];
    name_tag = "<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
    message_tag = "<h4 class='message_h4'>"+message+"</h4>";
    like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value = "+likes+" onclick = 'updateLike(this.id);'>";
    thumbs_icon = "<span class='glyphicon glyphicon-thumbs-up'>Likes: "+likes+"</span></button><hr>";

    row = name_tag + message_tag + like_button + thumbs_icon;
    document.getElementById("output").innerHTML += row;
 } });  }); }
getData();

function updateLike(message_id){
    buttonid = message_id;
    like = document.getElementById(buttonid).value;
    updated_likes = Number(like)+1;
    console.log(message_id);

    firebase.database().ref(room_name).child(message_id).update({
        like: updated_likes
    });
}

function send_message(){
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name:user_name,
        message:msg,
        like:0
    });
    document.getElementById("msg").innerHTML = "";
}

function logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("room_name");
    window.location.replace("index.html");
}