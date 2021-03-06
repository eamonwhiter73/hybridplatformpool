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
    
    if(items != nil || items.count > 0) {
        
        PoolTableViewController* poolvc = (PoolTableViewController*)[self viewController].tabBarController.viewControllers[1];
        //NSLog(@"addpools %@", [items description]);
        
        if([[self viewController] isKindOfClass:[PoolTableViewController class]]) {
            [items enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
        
                if(idx % 2 == 1) {
                    if(idx == 0) {
                        [poolvc.leftItems addObject:obj];
                    }
                    else {
                        [poolvc.rightItems addObject:obj];
                    }
                }
                else {
                    [poolvc.leftItems addObject:obj];
                }
            }];
            
            if(items.count % 2 == 1) {
                [poolvc.rightItems addObject:[NSNull null]];
            }
            
            [poolvc.tableView reloadData];
        }

        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:items];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    } else {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }
}

- (void)hasLoaded:(CDVInvokedUrlCommand*) command {
    if([[self viewController] isKindOfClass:[PoolsTableViewController class]]) {
        PoolsTableViewController* pvc = (PoolsTableViewController*)[self viewController];
        
        //CHANGE 1 TO 0 when going to real scenario without preloaded items (1 row has been preloaded)
        if([[pvc.tableView indexPathsForVisibleRows] count] > 1) {
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"hasLoaded"];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }
        else if([[pvc.tableView indexPathsForVisibleRows] count] == 1) {
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"notLoaded"];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }
        else {
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }
    }
}

- (void)togglePoolTableViewSection:(CDVInvokedUrlCommand*) command {
    PoolTableViewController* view = (PoolTableViewController*)[self viewController];
    if(view.showTableSections == true) {
        dispatch_async(dispatch_get_main_queue(), ^{
            view.showTableSections = false;
            [view.tableView reloadData];
        });
    }
    else {
        dispatch_async(dispatch_get_main_queue(), ^{
            view.showTableSections = true;
            [view.tableView reloadData];
        });
    }
    
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
