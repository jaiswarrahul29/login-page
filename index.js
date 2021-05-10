// initializing firebase

var firebaseConfig = {
    apiKey: "AIzaSyCNT3UVKeq-vGLcKmQxyIZuKnTyp-vVoKM",
    authDoindex: "fir-loginweb-5e381.firebaseapp.com",
    projectId: "fir-loginweb-5e381",
    storageBucket: "fir-loginweb-5e381.appspot.com",
    messagingSenderId: "537969373552",
    appId: "1:537969373552:web:ff710df5e6e0e9b7eb9fb5",
    measurementId: "G-Q4EMSJ1TTF"
};
firebase.initializeApp(firebaseConfig);



firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        document.getElementById('main-content').style.display="block"
        document.getElementById('login-content').style.display="none"
    } else {
        // No user is signed in.
        document.getElementById('main-content').style.display = "none"
        document.getElementById('login-content').style.display = "block"
        
    }
});

function login() {
    const useremail = document.getElementById('email').value;
    const userpassword = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(useremail, userpassword)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            document.getElementById('main-content').style.display="block"
            document.getElementById('login-content').style.display="none"
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("error:" + errorMessage);
        });
}

function signUp() {
    const useremail = document.getElementById('email').value;
    const userpassword = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(useremail, userpassword)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            document.getElementById('main-content').style.display="block"
            document.getElementById('login-content').style.display="none"
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("error:" + errorMessage);
            
            // ..
        });

}


function google(){
    var provider = new firebase.auth.GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...

            if (user) {
                document.getElementById('chat-area').style.display = "block";
                document.getElementById('login-area').style.display = "none";
                document.getElementById('signout-btn').style.display = "block";


            }
        }).catch((error) => {
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
    


function facebook(){
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // The signed-in user info.
            var user = result.user;
            document.getElementById('main-content').style.display="block"
            document.getElementById('login-content').style.display="none"

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var accessToken = credential.accessToken;

            // ...
        })
        .catch((error) => {
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

//logout function
function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        //alert("signout successfully");
        document.getElementById('main-content').style.display = "none"
        document.getElementById('login-content').style.display = "block"

    }).catch((error) => {
        // An error happened.
    });
}