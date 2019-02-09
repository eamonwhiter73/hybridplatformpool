
//
//  ItemViewPlugin.m
//  HybridPool
//
//  Created by Eamon White on 1/11/19.
//  Copyright © 2019 Eamon White. All rights reserved.
//

#import "ItemViewPlugin.h"

@implementation ItemViewPlugin

-(void)retrieveItem:(CDVInvokedUrlCommand*) command {
    PoolTableViewController* vic = (PoolTableViewController*)[self viewController];
    NSLog(@"viewController loaded: %@", [vic description]);
    
    CGFloat touchX = vic.lastTouch.x;
    NSInteger touchRow = vic.tapRow.row + 1;
    NSInteger box;
    
    if(touchX > 191.0) {
        box = touchRow * 2;
    }
    else {
        box = touchRow * 2 - 1;
    }
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[NSString stringWithFormat:@"%li", (long)box]];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void)getItems:(CDVInvokedUrlCommand*) command {
    NSArray* items = command.arguments;
    
    PoolTableViewController* vic = (PoolTableViewController*)[self viewController];
    NSLog(@"viewController loaded: %@", [vic description]);
    
    if([items[0] intValue] % 2 == 1) {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:vic.leftItems];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }
    else {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:vic.rightItems];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }
}

@end
