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

//Work on this, tapped out!
function viewAllUsers(){
    for (var newUser in poundcakeDatabase.ref('players')) {
        newUser = document.createElement("INPUT");
        newUser.setAttribute("type", "checkbox");
        var text = document.createTextNode(newUser.firstName);
        newUser.appendChild(text);
    }

}
//Invite Competitors (max 3)
function chooseCompetitors(){

}

function writeNewChallenge() {
    var challengeName = document.getElementById("challengeName").value;
    var buyIn = document.getElementById("buyIn").value;
    var duration = document.getElementById("weeksDuration").value;
    var weeklyPounds = document.getElementById("lbsPerWeek").value;

  poundcakeDatabase.ref('challenges/').push().set({
    name: challengeName,
    amount: buyIn,
    duration : duration,
    goal:weeklyPounds
  });
}
