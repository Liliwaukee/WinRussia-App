function loadPage(){

  $('ul.tabs').tabs('select_tab', 'tab_id');
  $(".button-collapse").sideNav();
  $('.collapsible').collapsible();


  splash()

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDubrku8KDKknKI65kLZoaajAcTNzjK4SY",
    authDomain: "winrussia-6387d.firebaseapp.com",
    databaseURL: "https://winrussia-6387d.firebaseio.com",
    projectId: "winrussia-6387d",
    storageBucket: "winrussia-6387d.appspot.com",
    messagingSenderId: "528662042752"
  };
  firebase.initializeApp(config);

  $("#btn-google").click(function(e){
  //e.preventDefault();
  console.log("presionaste el botón de google")
  signinWithGoogle();
})

$("#btn-facebook").click(function(e){
//e.preventDefault();
console.log("presionaste el botón de facebook")
authenticationFacebook();
})


//Funcion para iniciar sesion
function signinWithGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  //Se inicia sesion con un pop-up
  firebase.auth().signInWithPopup(provider).then(function (result) {
      //token de google
      var token = result.credential.accessToken;
      var user = result.user;
      //Display
      var displayName = user.displayName;
      localStorage.setItem("userName1", displayName);
    //email
    //  var email = user.email;
    //  localStorage.setItem("userEmail1", email);
    //Photo
      var photoURL = user.photoURL;
      localStorage.setItem("userPicture1", photoURL);
      console.log(photoURL);
      //vista
      window.location.assign("views/principal.html");
      // console.log(user);
    }).catch(function (error) {
      //se manejan los erores aqui
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      if (errorCode === 'ya existe una cuenta con una credencial distinta') {
        alert('Provedor registrado');
        // If you are using multiple auth providers on your app you should handle linking
        // the user's accounts here.
      } else {
        console.error(error);
      }
    });
  console.log('SignIn');
  dataUser()
}

function dataUser() {
       console.log("Se ejecutó dataUser")
       var userName = localStorage.getItem("userName1");
      // var userEmail = localStorage.getItem("userEmail1");
       var userPicture = localStorage.getItem("userPicture1");
       //$('#user-name2').html(userName);
      // $('#user-picture').attr('src', userPicture);
   }



function authenticationFacebook(provider){
  console.log("Inicio authfacebook")
  var provider = new firebase.auth.FacebookAuthProvider();
  //provider.addScope("public_profile");
  firebase.auth().signInWithPopup(provider).then(function(result) {
    //tokenfacebook
    var token = result.credential.accessToken;
    var user = result.user;
    var displayName = user.displayName;
  //  localStorage.setItem("nombre", user.displayName);
    window.location.href = "views/principal.html";
    console.log(user);
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

//Función para agregar datos de usuario
function inizializarFire(){
  console.log("Se ejecutó inizializarFire")
  firebase.auth().onAuthStateChanged(function(user) {
  //  var $userPicture = $("user-pic");
    //var $userName = $("user-name");
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var userPhoto = user.photoURL;
      console.log(userPhoto);
      console.log(displayName);
      //var $displayName2 = localStorage.getItem(displayName1);
      //console.log(displayName2);
      $("#user-picture").attr("src", userPhoto);
      $("#user-name").text(displayName);
      //$userName.textContent = displayName;
    //  $userPicture.attr('src', userPhoto);


    }
  });
  }
//window.onload = function(){
  inizializarFire()
//}

}




//**************---------- APIS FUNCTIONS ---------**************

//API https://yesno.wtf/



function questionPaul() {
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(e) {
  if(this.readyState === 4){
    if(this.status === 200){
      var response = JSON.parse(this.response);

      var imageAnswer = response.image;
      var answer = document.getElementById('image-answer-container');
      var image = document.getElementById('image-answer').src = imageAnswer;

    }
  }
}
xhr.open("GET", "https://yesno.wtf/api/", true);
//xhr.setRequestHeader("Content-type", "application/json");
xhr.send();

}
$("#btn-answer-paul").click(questionPaul)








//**************---------- FIN APIS FUNCTIONS ---------**************



// Función splash
function splash() {
	setInterval(function() {
				$("#splash").hide();
        $("#main").removeClass("hide");
	 }, 3000);
}

$(document).ready(loadPage);
