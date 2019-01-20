#import <Cordova/CDVPlugin.h>
#import "PoolTableViewController.h"
#import "PoolsTableViewController.h"

@interface ListPlugin : CDVPlugin
    - (void)addPools:(CDVInvokedUrlCommand*) command;
@end
