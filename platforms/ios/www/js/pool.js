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

var pool = {
    addItems: function() {
        var win = function(d) {
            console.log("Item added!", d);
        };
        var fail = function(e) {
            console.log(e)
        }

        var db = firebase.firestore();

        // Disable deprecated features
        db.settings({
          timestampsInSnapshots: true
        });

        db.collection("pools").doc(app.selectedPoolId).collection("items").doc("items_array").get()
            .then(function(doc) {
                if (doc.exists) {
                    console.log("Document data:", JSON.stringify(doc.data()));
                    cordova.exec(win, fail, "ListPlugin", "addItems", doc.data().array);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
    }
};




