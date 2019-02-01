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

var iosNav = {
    getCurrentTabControllerName: function (prevUser) {
        var win = function(controller) {
            console.log("Current controller for tab: ", JSON.stringify(controller)); //MAKE SEPERATE TEMPLATE FOR EACH VIEWCONTROLLER ex. pool.html

            if(prevUser == null) {
                firebase.auth().onAuthStateChanged(function(user) {
                  if (user) {
                    iosNav.routing(user, controller);
                  }
                  else {
                    console.log("else of onAuthStateChanged for no user scenario");
                    //ADD CHECK FOR WEBVIEW
                    iosNav.presentAuth();
                  }
                });
            }
            else {
                iosNav.hasLoaded(prevUser, controller);
            }
        };
        var fail = function(e) {
            console.log(e);
        }

        cordova.exec(win, fail, "NavigationPlugin", "getCurrentTabControllerName", []);
    },
    routing: function (user, controller) {
        console.log("user in routing:", JSON.stringify(user));
        app.user = user;

        dataRetreive.getSelectedPoolId().then(function() {
            switch(controller.className) {
              case "PoolsTableViewController":
                pools.addPools();
                console.log("got through user check in PoolsTableViewController");
                iosNav.alignPoolsWebView();
                //iosNav.toggleWebView();
                break;
              case "PoolTableViewController":
                if(controller.webViewHidden == true) {
                    pool.addItems();
                    //iosNav.hideWebView();
                }
                else {
                    viewItem.retrieveItem();
                }
                break;
              case "CreateItemViewController":
                    const cameraSuccess = function(uri) {
                        app.currentPictureURI = uri;
                        //iosNav.toggleWebView();
                        itemCreator.setPicture();
                    };

                    const cameraError = function(err) {
                        iosNav.toggleWebView();
                        alert(err);
                    };

                    navigator.camera.getPicture(cameraSuccess, cameraError, {
                        quality: 10, 
                        destinationType: Camera.DestinationType.FILE_URI,
                        sourceType:Camera.PictureSourceType.CAMERA
                    });
                break;
              case "WishlistViewController":
                wishlist.init();
                break;
              default:
                // code block
            }
        });
    },
    hasLoaded: function (user, controller) {
        var win = function(d) {
            console.log("Loaded?:", d);
            if(d == "notLoaded") {
                iosNav.routing(user, controller);
            }
        };
        var fail = function(e) {
            console.log(e)
        }
        cordova.exec(win, fail, "ListPlugin", "hasLoaded", []);
    },
    presentAuth: function () {
        /*var win = function(d) {
            console.log("web view toggled, going to auth");*/

        auth.presentLogin().then(function() {
            auth.getResult();
        });
        /*};
        var fail = function(e) {
            console.log(e)
        }*/

        //cordova.exec(win, fail, "NavigationPlugin", "toggleWebView", []);
    },
    alignPoolsWebView: function () {
        var win = function(d) {
            console.log("web view toggled, going to auth"); 
        };
        var fail = function(e) {
            console.log(e)
        }

        cordova.exec(win, fail, "NavigationPlugin", "alignPoolsWebView", []);
    },
    fullScreenWebView: function () {
        var win = function(d) {
            console.log("web view toggled, going to auth");
        };
        var fail = function(e) {
            console.log(e)
        }

        cordova.exec(win, fail, "NavigationPlugin", "fullScreenWebView", []);
    },
    toggleWebView: function () {
        var win = function(d) {
            console.log("web view toggled");
        };
        var fail = function(e) {
            console.log(e)
        }

        cordova.exec(win, fail, "NavigationPlugin", "toggleWebView", []);
    },
    describeView: function () {
        var win = function(d) {
            console.log("view described");
        };
        var fail = function(e) {
            console.log(e)
        }

        cordova.exec(win, fail, "NavigationPlugin", "describeView", []);
    },
    presentLoginController: function () {
        var win = function(d) {
            console.log("login controller presented");

            auth.presentLogin();
        };
        var fail = function(e) {
            console.log(e)
        }

        cordova.exec(win, fail, "NavigationPlugin", "presentLoginController", []);
    },
    changeRootViewControllerToTabBar: function () {
        var win = function(d) {
            console.log("tabbar controller presented");

            auth.presentLogin();
        };
        var fail = function(e) {
            console.log(e)
        }

        cordova.exec(win, fail, "NavigationPlugin", "changeRootViewControllerToTabBar", []);
    },
    dismissLoginViewController: function () {
        var win = function(d) {
            console.log("view controller dismissed");
        };
        var fail = function(e) {
            console.log(e)
        }

        cordova.exec(win, fail, "NavigationPlugin", "dismissLoginViewController", []);
    },
    goToTab: function (tab) {
        var win = function(d) {
            console.log("view controller switched");
        };
        var fail = function(e) {
            console.log(e)
        }

        cordova.exec(win, fail, "NavigationPlugin", "goToTab", [tab.toString()]);
    },
};




