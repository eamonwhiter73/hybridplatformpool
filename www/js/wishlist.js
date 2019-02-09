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

var wishlist = {
    wishesArray: [],
    unsubscribe: null,
    init: function () {

        //INITIALIZE POSITION OF BUTTON
        document.getElementById("wishlist_add_item_button").style.top = document.getElementById("app").scrollTop + window.screen.height - 133 + "px";

        document.getElementById("app").addEventListener("scroll", function() {
          document.getElementById("wishlist_add_item_button").style.top = document.getElementById("app").scrollTop + window.screen.height - 133 + "px";
        });

        //ADJUST PADDING FOR WEBVIEW SCROLL
        document.getElementById("app").style.paddingBottom = "133px";

        var db = firebase.firestore();

        db.collection("pools").doc(app.selectedPoolId).collection("wishlist").doc("wishes")
            .onSnapshot(function(doc) {
                console.log("data from wishlist: ", doc.data());
                if(document.getElementById("wishlist_items_container").children.length == 0) {
                    wishlist.wishesArray = doc.data().array;

                    for(wish of wishlist.wishesArray) {
                        var wishContainer = document.createElement("div");
                        wishContainer.style.display = "flex";
                        wishContainer.style.flex = "1";
                        wishContainer.style.minHeight = "64px";
                        wishContainer.style.width = "100%";
                        wishContainer.style.margin = "0 8px 8px 8px";
                        wishContainer.style.alignItems = "center";
                        wishContainer.style.backgroundColor = "#e0e0e0";
                        wishContainer.style.paddingLeft = "8px";
                        wishContainer.style.justifyContent = "space-between";
                        wishContainer.className = "wish_container";

                        var itemName = document.createElement("div");
                        itemName.innerHTML = wish.item;
                        itemName.className = "item_name";

                        var itemWhereToBuy = document.createElement("div");
                        itemWhereToBuy.innerHTML = wish.whereToBuyURL;
                        itemWhereToBuy.className = "item_where_to_buy";

                        wishContainer.appendChild(itemName);
                        wishContainer.appendChild(itemWhereToBuy);
                        document.getElementById("wishlist_items_container").appendChild(wishContainer);
                    }
                }
            });

        wishlist.unsubscribe = db.collection("pools").doc(app.selectedPoolId).collection("wishlist")
            .onSnapshot(function(snapshot) {
                snapshot.docChanges().forEach(function(change) {
                    if (change.type === "added") {
                        console.log("New: ", change.doc.data());
                    }
                    if (change.type === "modified") {
                        console.log("Modified: ", change.doc.data());

                        var numSpots = change.doc.data().array.length - wishlist.wishesArray.length;
                        for(var x = 1; x <= numSpots; x++) {
                            var item = change.doc.data().array[change.doc.data().array.length - x];

                            wishlist.wishesArray.push(item);
                            
                            var wishContainer = document.createElement("div");
                            wishContainer.style.display = "flex";
                            wishContainer.style.flex = "1";
                            wishContainer.style.minHeight = "64px";
                            wishContainer.style.width = "100%";
                            wishContainer.style.margin = "0 8px 8px 8px";
                            wishContainer.style.alignItems = "center";
                            wishContainer.style.backgroundColor = "#e0e0e0";
                            wishContainer.style.paddingLeft = "8px";
                            wishContainer.style.justifyContent = "space-between";
                            wishContainer.className = "wish_container";

                            var itemName = document.createElement("div");
                            itemName.innerHTML = item.item;
                            itemName.className = "item_name";

                            var itemWhereToBuy = document.createElement("div");
                            itemWhereToBuy.innerHTML = item.whereToBuyURL;
                            itemWhereToBuy.className = "item_where_to_buy";

                            wishContainer.appendChild(itemName);
                            wishContainer.appendChild(itemWhereToBuy);
                            document.getElementById("wishlist_items_container").appendChild(wishContainer);
                        }
                    }
                    if (change.type === "removed") {
                        console.log("Removed: ", change.doc.data());
                    }
                    else {
                        console.log("something other than change happened in wishlist");
                    }
                });
            });
    },
    uploadItem: function () { //HELP OTHERS HELP YOU - ADD A WHERE TO BUY LINK TO SHOW OTHERS WHERE TO BUY WHAT YOU WANT!
        if(document.getElementById('add_item_description').value == null || document.getElementById('add_item_name').value == null) {
            alert("You need to fill out all of the fields");
            console.log("You need to fill out all of the fields");
            return;
        }

        var date = new Date().getTime();

        var item = JSON.parse(JSON.stringify({
                                                 date: date.toString(), 
                                                 whereToBuyURL: document.querySelector('#where_to_buy').value,
                                                 item: document.querySelector('#add_item_name').value,
                                                 description: document.querySelector('#add_item_description').value
                                            }));

        var db = firebase.firestore();

        db.collection("pools").doc(app.selectedPoolId).collection("wishlist").doc("wishes").update({array: firebase.firestore.FieldValue.arrayUnion(item)})
            .then(function() {
                console.log("wish added");
                document.getElementById("add_to_wishlist_container").style.display = "none";
                document.getElementById("wishlist_items_container").style.display = "flex";
                document.getElementById("wishlist_add_item_button").style.display = "flex";
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
                db.collection("pools").doc(app.selectedPoolId).collection("wishlist").doc("wishes").set({array: [item]})
                    .then(function() {
                        console.log("wish added");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
            });
    },
    addItem: function () {
        console.log("showing add item to wishlist");
        
        document.getElementById("wishlist_add_item_button").style.display = "none";
        document.getElementById("wishlist_items_container").style.display = "none";
        var appNode = document.getElementById("app");

        appNode.appendChild(wishlist.cloneTemplate("add_to_wishlist"));
    },
    cloneTemplate: function (templateId) {
        var temp = document.getElementById(templateId);
        var clon = temp.content.cloneNode(true);
        return clon;
    },
};




