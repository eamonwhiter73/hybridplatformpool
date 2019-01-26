#import <Cordova/CDVPlugin.h>
#import <Cordova/CDVViewController.h>
@import WebKit;
#import "AuthViewController.h"

@interface NavigationPlugin : CDVPlugin

- (void)getCurrentTabControllerName:(CDVInvokedUrlCommand*) command;
- (void)toggleWebView:(CDVInvokedUrlCommand*) command;
- (void)describeView:(CDVInvokedUrlCommand*) command;
- (void)presentLoginController:(CDVInvokedUrlCommand*) command;
- (void)dismissLoginViewController:(CDVInvokedUrlCommand*) command;
//- (void)changeRootViewControllerToTabBar:(CDVInvokedUrlCommand*) command;

@end

