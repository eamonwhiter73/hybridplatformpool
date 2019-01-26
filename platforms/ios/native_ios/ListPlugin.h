#import <Cordova/CDVPlugin.h>
#import "PoolTableViewController.h"
#import "PoolsTableViewController.h"

@interface ListPlugin : CDVPlugin
    - (void)addPools:(CDVInvokedUrlCommand*) command;
    - (void)addItems:(CDVInvokedUrlCommand*) command;
    - (void)hasLoaded:(CDVInvokedUrlCommand*) command;
@end
