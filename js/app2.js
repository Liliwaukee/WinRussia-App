function loadPage(){

  $('ul.tabs').tabs('select_tab', 'tab_id');
  $(".button-collapse").sideNav();
  $('.collapsible').collapsible();


  splash()


  $("#btn-google").click(function(e){
  //e.preventDefault();
  authGoogle();
})

function authGoogle(){
  var provider = new firebase.auth.GoogleAuthProvider();
  authentication(provider);
}

//Funcion para iniciar sesion
function googleSignin() {
  firebase.auth()
    //Se inicia sesion con un pop-up
    .signInWithPopup(provider).then(function (result) {
      //token de google
      var token = result.credential.accessToken;
      var user = result.user;
      var displayName = user.displayName;
      localStorage.setItem("userNameL", displayName);
      var email = user.email;
      localStorage.setItem("userEmailL", email);
      var photoURL = user.photoURL;
      localStorage.setItem("userPictureL", photoURL);
      window.location.assign("test.html");
      // console.log(user);
    }).catch(function (error) {
      //se manejan los erores aqui
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('You have already signed up with a different auth provider for that email.');
        // If you are using multiple auth providers on your app you should handle linking
        // the user's accounts here.
      } else {
        console.error(error);
      }
    });
  console.log('SignIn Succesfull');
}


function getUserData() {
       var userName = localStorage.getItem("userNameL");
       var userEmail = localStorage.getItem("userEmailL");
       var userPicture = localStorage.getItem("userPictureL");
       $('#user-name').html(userName);
       $('#user-name2').html(userName);
       $('#user-picture').attr('src', userPicture);
   }



   // Función splash
   function splash() {
   	setInterval(function() {
   				$("#splash").hide();
           $("#main").removeClass("hide");
   	 }, 3000);
   }

}
$(document).ready(loadPage);
