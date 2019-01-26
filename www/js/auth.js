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

var auth = {
    presentLogin: async function () {
        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('email');
        provider.addScope('pages_show_list');

        return firebase.auth().signInWithRedirect(provider);
    },
    getResult: function () {
        firebase.auth().getRedirectResult().then(function(result) {
        
            if (result.credential) {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var token = result.credential.accessToken;
                // ...
            }
            
            // The signed-in user info.
            app.user = result.user;
            
            console.log("result.user in presentLogin:", JSON.stringify(app.user));


        }).then(function() {
            //iosNav.getCurrentTabControllerName();
            iosNav.toggleWebView();
            iosNav.getCurrentTabControllerName(app.user);
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("Error:", error);
            
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }
};




