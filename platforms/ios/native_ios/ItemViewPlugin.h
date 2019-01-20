//
//  ItemViewPlugin.h
//  HybridPool
//
//  Created by Eamon White on 1/11/19.
//  Copyright © 2019 Eamon White. All rights reserved.
//

#import <Cordova/CDVPlugin.h>
#import "PoolTableViewController.h"

@interface ItemViewPlugin : CDVPlugin
    - (void)retrieveItem:(CDVInvokedUrlCommand*) command;
@end
