//
//  PoolsList.m
//  
//
//  Created by Eamon White on 1/7/19.
//

#import "ListPlugin.h"

@implementation ListPlugin

-(void)addPools:(CDVInvokedUrlCommand*) command {
    NSArray* pools = command.arguments;
    //NSLog(@"argument: %@", [pools description]);
    
    if(pools != nil || pools.count > 0) {
        NSLog(@"addpools %@", [pools description]);

        if([[self viewController] isKindOfClass:[PoolsTableViewController class]]) {
            PoolsTableViewController* pvc = (PoolsTableViewController*)[self viewController];
            [pools enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
                [pvc.pools addObject:obj];
            }];
            [pvc.tableView reloadData];
        }
        
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"pools"];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    } else {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }
}

-(void)addItems:(CDVInvokedUrlCommand*) command {
    NSArray* items = command.arguments;
    //NSLog(@"argument: %@", [pools description]);
    
    if(items != nil || items.count > 0) {
        NSLog(@"addpools %@", [items description]);
        
        if([[self viewController] isKindOfClass:[PoolTableViewController class]]) {
            PoolTableViewController* poolvc = (PoolTableViewController*)[self viewController].tabBarController.viewControllers[1];
            [items enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
                [poolvc.items addObject:obj];
            }];
            [poolvc.tableView reloadData];
        }

        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"pool"];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    } else {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }
}

@end
