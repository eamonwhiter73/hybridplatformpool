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

var itemCreator = {
    setPicture: function() {
        var picContainer = document.querySelector("#app>#pic_container");

        var image = document.createElement("img");
        image.src = app.currentPictureURI;
        image.id = "share_photo";
        image.width = window.innerWidth;

        picContainer.appendChild(image);
    },
    submitItem: function(event) {
        console.log("in submitItem");
        if(document.getElementById('name_input').value == null || document.getElementById('description_input').value == null) {
            alert("You need to fill out all of the fields");
            console.log("You need to fill out all of the fields");
            return;
        }

        resolveLocalFileSystemURL(app.currentPictureURI, function(entry) {
            console.log("in resolveLocalFileSystemURL");
            entry.file(function (file) {
             var reader = new FileReader();
             reader.onloadend = function () {
                  console.log("in reader.onloadend");
                  // This blob object can be saved to firebase
                  var blob = new Blob([new Uint8Array(this.result)], { type: "image/jpeg" });                  
                  itemCreator.sendToFirebase(blob);
             };
             
             reader.readAsArrayBuffer(file);
          });
        }, function (error) {
            console.log(error);
        });
    },
    generateUUID: function() { // Public Domain/MIT
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
            d += performance.now(); //use high-precision timer if available
        }
        
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    },
    sendToFirebase: function(blob) {
        var date = new Date().getTime();
        var storageRef = firebase.storage().ref();
        //var item_name = document.getElementById("item_name_input").value;
        //var description_text = document.getElementById("description_text_area").value;
        var uploadTask = storageRef.child('item_images/'+app.user.uid+'/'+date+'.jpg').put(blob);

    // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', function(snapshot){
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, function(error) {
          // Handle unsuccessful uploads
        }, function() {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            // Initialize Cloud Firestore through Firebase
            var db = firebase.firestore();

            // Disable deprecated features
            db.settings({
              timestampsInSnapshots: true
            });

            var obj = JSON.parse(JSON.stringify({date: date.toString(), 
                                                 downloadURL: downloadURL,
                                                 item: document.querySelector('#name_input').value,
                                                 description: document.querySelector('#description_input').value,
                                                 active: true}));

            // Add a new document in collection "cities"
            db.collection("users").doc(app.user.uid).collection("items").doc("items_array").update({"array": firebase.firestore.FieldValue.arrayUnion(obj)})
                .then(function() {
                    db.collection("pools").doc(app.selectedPoolId).collection("items").doc("items_array").update({array: firebase.firestore.FieldValue.arrayUnion(obj)})
                        .then(function() {
                            console.log("array in pools update");
                            iosNav.goToTab(1);
                        })
                        .catch(function(error) {
                            console.error("Error writing document: ", error);
                            db.collection("pools").doc(app.selectedPoolId).collection("items").doc("items_array").set({array: [obj]})
                                .then(function() {
                                    console.log("array in pools items set");
                                    iosNav.goToTab(1);
                                })
                                .catch(function(error) {
                                    console.error("Error writing document: ", error);
                                });
                        });
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                    db.collection("users").doc(app.user.uid).collection("items").doc("items_array").set({"array": [obj]})
                        .then(function() {
                            console.log("array in pools items update");
                            iosNav.goToTab(1);
                        })
                        .catch(function(error) {
                            console.error("Error writing document: ", error);
                        });
                });
          });
        });
    },
};




