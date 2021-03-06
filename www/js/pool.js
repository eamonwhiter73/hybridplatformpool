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
    itemsList: null,
    addItems: function() {
        var win = function(d) {
            console.log("Items added array: ", JSON.stringify(d));

            pool.itemsList = Array.from(d);
            console.log("pool.itemsList: ", JSON.stringify(pool.itemsList));
        };
        var fail = function(e) {
            console.log(e)
        }

        var db = firebase.firestore();

        console.log("app.selectedPoolId:", app.selectedPoolId);

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
    },
    scrollWindow: function () {
        setTimeout(function() {
            window.scrollTo(0, 150);
        }, 1000)
    },
    borrowItem: function () {
        console.log("showing datepicker");
        
        document.getElementById("pool_container").style.display = "none";
        var appNode = document.getElementById("app");

        appNode.appendChild(pool.cloneTemplate("borrow_item"));

        document.getElementById("daterange").addEventListener("touchstart", pool.scrollWindow, false);

        var date = new Date();

        $(function() {
          $('input[name="daterange"]').daterangepicker({
            "minYear": 2019,
            "maxSpan": {
                "days": 5
            },
            "locale": {
                "format": "MM/DD/YYYY",
                "separator": " - ",
                "applyLabel": "Apply",
                "cancelLabel": "Cancel",
                "fromLabel": "From",
                "toLabel": "To",
                "customRangeLabel": "Custom",
                "weekLabel": "W",
                "daysOfWeek": [
                    "Su",
                    "Mo",
                    "Tu",
                    "We",
                    "Th",
                    "Fr",
                    "Sa"
                ],
                "monthNames": [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                ],
                "firstDay": 1
            },
            "alwaysShowCalendars": true,
            "startDate": (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear(),
            "endDate": (date.getMonth() + 1) + '/' + (date.getDate() + 3) + '/' +  date.getFullYear(),
            "opens": "center"
          }, function(start, end, label) {
            console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));

            //SEND REQUEST HERE USERNAME AND DATE
          });
        });

        //iosNav.toggleWebView();
        //pool.togglePoolTableViewSection();
    },
    setPicture: function(box, items) {
        var picContainer = document.getElementById("pic_container");

        var image = document.createElement("img");
        image.id = "borrow_photo";
        image.width = window.innerWidth;

        var numBox = parseInt(box);
        image.src = pool.determineArrayObject(numBox).downloadURL;


        picContainer.appendChild(image);
    },
    setName: function(box) {
        var numBox = parseInt(box);
        var nameContainer = document.getElementById("name_display");
        nameContainer.innerHTML = pool.determineArrayObject(numBox).item;
    },
    setDescription: function(box) {
        var numBox = parseInt(box);
        var desContainer = document.getElementById("description_display");
        desContainer.innerHTML = pool.determineArrayObject(numBox).description;
    },
    determineArrayObject: function (numBox) {
        if(numBox % 2 == 1) {
            if(numBox == 1) {
                return pool.itemsList[0];
            }
            else {
                return pool.itemsList[numBox - (numBox % 2 + 1)];
            }
        }
        else {
            if(numBox == 2) {
                return pool.itemsList[0];
            }
            else {
                return pool.itemsList[numBox - (numBox / 2 + 1)];
            }
        } 
    },
    retrieveItem: function() {
        var win = function(d) {
            console.log("Item#:", d); //SHOW BOX THAT WAS TOUCHED/TAPPED

            pool.getItems(d);
        };
        var fail = function(e) {
            console.log(e);
        }

        var items = [];
        cordova.exec(win, fail, "ItemViewPlugin", "retrieveItem", items);
    },
    getItems: function(boxIdAsString) {
        var win = function(itemsArray) {
            console.log("Items:", itemsArray); //SHOW BOX THAT WAS TOUCHED/TAPPED

            pool.itemsList = Array.from(itemsArray);

            pool.setPicture(boxIdAsString);
            pool.setName(boxIdAsString);
            pool.setDescription(boxIdAsString);

            pool.togglePoolTableViewSection();
        };
        var fail = function(e) {
            console.log(e)
        }

        var items = [boxIdAsString];
        cordova.exec(win, fail, "ItemViewPlugin", "getItems", items);
    },
    togglePoolTableViewSection: function() {
        var win = function(itemsArray) {
            console.log("section hidden"); //SHOW BOX THAT WAS TOUCHED/TAPPED
        };
        var fail = function(e) {
            console.log(e)
        }

        cordova.exec(win, fail, "ListPlugin", "togglePoolTableViewSection", []);
    },
    cloneTemplate: function (templateId) {
        var temp = document.getElementById(templateId);
        var clon = temp.content.cloneNode(true);
        return clon;
    },
};




