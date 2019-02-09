#import <Cordova/CDVPlugin.h>
#import <Cordova/CDVViewController.h>
@import WebKit;
#import "AuthViewController.h"
#import "PoolsTableViewController.h"
#import "PoolTableViewController.h"

@interface NavigationPlugin : CDVPlugin

- (void)getCurrentTabControllerName:(CDVInvokedUrlCommand*) command;
- (void)toggleWebView:(CDVInvokedUrlCommand*) command;
- (void)describeView:(CDVInvokedUrlCommand*) command;
- (void)presentLoginController:(CDVInvokedUrlCommand*) command;
- (void)dismissLoginViewController:(CDVInvokedUrlCommand*) command;
- (void)alignPoolsWebView:(CDVInvokedUrlCommand*) command;
- (void)fullScreenWebView:(CDVInvokedUrlCommand*) command;
- (void)goToTab:(CDVInvokedUrlCommand*) command;
- (void)reloadWebView:(CDVInvokedUrlCommand*) command;
- (void)toggleTableView:(CDVInvokedUrlCommand*) command;
//- (void)changeRootViewControllerToTabBar:(CDVInvokedUrlCommand*) command;

@end

