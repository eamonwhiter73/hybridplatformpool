//
//  NavigationPlugin.m
//  HybridPool
//
//  Created by Eamon White on 1/14/19.
//  Copyright © 2019 Eamon White. All rights reserved.
//

#import "NavigationPlugin.h"

@implementation NavigationPlugin

-(void)getCurrentTabControllerName:(CDVInvokedUrlCommand*) command {
    NSLog(@"inside getCurrentTabController");
    
    NSString *className = NSStringFromClass([[self viewController] class]);
    
    NSLog(@"className: %@", className);
    
    CDVViewController* pvc = (CDVViewController*)[self viewController];
    NSDictionary* dict = @{@"className": className, @"webViewHidden": [NSNumber numberWithBool:[pvc.webView isHidden]]};
    
    if(className != nil) {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dict];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    } else {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }
}

-(void)presentLoginController:(CDVInvokedUrlCommand*) command {
    NSLog(@"inside presentLoginController");
    
    //UIStoryboard *sb = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
    //CDVViewController *avc = [sb instantiateViewControllerWithIdentifier:@"auth"];
    
    //if(avc != nil) {
        [[[[UIApplication sharedApplication] delegate] window] setRootViewController:[[UIStoryboard storyboardWithName:@"Main" bundle:nil] instantiateViewControllerWithIdentifier:@"auth"]];
        
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    //}
    //else {
        //CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
        //[self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    //}
}

- (void)changeRootViewControllerToTabBar:(CDVInvokedUrlCommand*) command {
    UIStoryboard *sb = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
    CDVViewController *tbc = (CDVViewController*)[sb instantiateViewControllerWithIdentifier:@"tabbar"];
    [[[[UIApplication sharedApplication] delegate] window] setRootViewController:tbc];
}

@end
