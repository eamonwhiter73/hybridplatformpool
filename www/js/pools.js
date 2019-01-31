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

var pools = {
    addPools: function() {
        var win = function(d) {
            console.log("Item added!", d);
        };
        var fail = function(e) {
            console.log(e)
        }
        var items = ["Hello", "How"];
        cordova.exec(win, fail, "ListPlugin", "addPools", items);
    },
    createPool: function() {
        console.log("creating pool");
        
        document.getElementById("create_pool_button").style.display = "none";
        var appNode = document.getElementById("app");
        //var templateNode = document.importNode(document.querySelector("#create_pool>#create_pool_container"), true);

        appNode.appendChild(pools.cloneTemplate("create_pool"));

        iosNav.fullScreenWebView();
    },
    submitPool: function() {
        console.log("submitting pool");

        var db = firebase.firestore();

        // Disable deprecated features
        db.settings({
          timestampsInSnapshots: true
        });

        var timestamp = new Date().getTime();
        var poolName = document.getElementById("pool_name").value;

        db.collection("users").doc(app.user.uid).collection("pools").doc(poolName).set({"active": true, "id": timestamp})
            .then(function() {
                console.log("Pool added to users pools collection successfully");
                // Add a new document in collection "cities"
                db.collection("pools").doc(poolName).set({"id": timestamp, "name": poolName, "nearestTo": null, "location": null})
                    .then(function() {
                        console.log("Pool named successfully");
                        db.collection("pools").doc(poolName).collection("users").doc(app.user.uid).set({"active": true, "uid":app.user.uid})
                            .then(function() {
                                // Add a new document in collection "cities"
                                db.collection("users").doc(app.user.uid).update({"lastLocation": null, "poolIds":null, "selectedPoolId": poolName})
                                    .then(function() {
                                        console.log("Last location/poolId added");
                                        app.selectedPoolId = poolName;
                                        pools.removeAfterSubmit();
                                        pools.showCreatePoolButton();
                                        iosNav.alignPoolsWebView();
                                    })
                                    .catch(function(error) {
                                        console.error("Error writing document: ", error);
                                    });
                                })
                                .catch(function(error) {
                                    console.log("Something wrong in: User added to users collection of pool: "+error);
                                })
                        })
                        .catch(function(error) {
                            console.log("Something wrong in: Pool named successfully: "+error);
                        })
            })
            .catch(function(error) {
                console.log("Something wrong in: Pool being added to users pools collection: "+error);
            })
        
        /*document.getElementById("create_pool_button").style.display = "none";
        var appNode = document.getElementById("app");
        //var templateNode = document.importNode(document.querySelector("#create_pool>#create_pool_container"), true);

        appNode.appendChild(pools.cloneTemplate("create_pool"));

        iosNav.fullScreenWebView();*/
    },
    cloneTemplate: function (templateId) {
        var temp = document.getElementById(templateId);
        var clon = temp.content.cloneNode(true);
        return clon;
    },
    removeAfterSubmit: function () {
        document.querySelector("#app>#create_pool_container").remove();
    },
    showCreatePoolButton: function () {
        document.getElementById("create_pool_button").style.display = "flex";
    },
};




