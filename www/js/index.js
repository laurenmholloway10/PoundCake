/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

//Create new user account
var poundCakeAuth = firebase.auth();

function handleSignUp() {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END createwithemail]
    }

//if user is not authenticated, then location.assign("https://www.w3schools.com");


//Firebase database Functions
var poundcakeDatabase = firebase.database();

function WriteNewPlayer(){
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;

    poundcakeDatabase.ref('players/').push().set({
      firstName: firstName,
      lastName: lastName,
      email : email,
      bankroll:0,
      status: true
    });
    document.getElementById("registerForm").reset();
}

//Sign in the user if the user is registered
function userSignIn(){
    var email = document.getElementById('Lemail').value;
    var password = document.getElementById('Lpassword').value;
firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {

  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode === 'auth/wrong-password') {
    alert('Wrong password.');
  } else {
    alert(errorMessage);
  }
  console.log(error);
});
var user = firebase.auth().currentUser;

}
//If a user is not signed in, then navigate to the login screen


/*while(!user){
    location.assign("login.html");
    break;
}*/
/*if (user) {
  // User is signed in.
} else {
  location.assign("login.html");

}*/

//Invite Competitors (max 3)
/*function getAllUsers(){
    var allUsers = poundcakeDatabase.ref('players/');
    return allUsers.once('value').then(function(snapshot) {
        var userFirst = snapshot.val().firstName;
        var userLast = snapshot.val().lastName;
        var userFullName = userFirst + " " + userLast;
        for (var player in allUsers) {
            alert(userFullName);
        }
    });
}*/
function userSignOut(){
    firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  alert("Whoops...My bad!");
});
}

//function to redirect user to accept or decline challenge screen
var challenges = poundcakeDatabase.ref("challenges");
var Hostuser = firebase.auth().currentUser;
if(Hostuser != null){
    challenges.once("value")
      .then(function(snapshot) {
        var challenger = snapshot.val();
        if(Hostuser.email == challenger.player1){
            location.assign("InviteFriends.html");
        }
        else if (Hostuser.email == challenger.player2){
            location.assign("InviteFriends.html");
        }
        else if (Hostuser.email == challenger.player3){
            location.assign("InviteFriends.html");
        }
        else if (Hostuser.email == challenger.hostPlayer) {
            location.assign("waitingOnInvites.html");
        }
        else {
            //Do Nothing
            alert("New friends, new money!");
        }
      });
}


function writeNewChallenge() {
    var challengeName = document.getElementById("challengeName").value;
    var buyIn = document.getElementById("buyIn").value;
    var duration = document.getElementById("weeksDuration").value;
    var weeklyPounds = document.getElementById("lbsPerWeek").value;
    var opponent1 = document.getElementById("opp1").value;
    var opponent2 = document.getElementById("opp2").value;
    var opponent3 = document.getElementById("opp3").value;

    var user = firebase.auth().currentUser;

  poundcakeDatabase.ref('challenges/').push().set({
    name: challengeName,
    amount: buyIn,
    duration : duration,
    goal: weeklyPounds,
    hostPlayer: user.email,
    player1: opponent1,
    player2: opponent2,
    player3: opponent3,
    status: false
  });
}
