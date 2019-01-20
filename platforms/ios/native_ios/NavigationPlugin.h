#import <Cordova/CDVPlugin.h>
#import <Cordova/CDVViewController.h>

@interface NavigationPlugin : CDVPlugin

- (void)getCurrentTabControllerName:(CDVInvokedUrlCommand*) command;
- (void)presentLoginController:(CDVInvokedUrlCommand*) command;
- (void)changeRootViewControllerToTabBar:(CDVInvokedUrlCommand*) command;

@end

