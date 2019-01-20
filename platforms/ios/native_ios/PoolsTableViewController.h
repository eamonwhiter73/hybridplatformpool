//
//  SecondViewController.h
//  HybridPool
//
//  Created by Eamon White on 1/7/19.
//  Copyright © 2019 Eamon White. All rights reserved.
//

#import <UIKit/UIKit.h>
@import WebKit;
#import "PoolsTableViewCell.h"
#import <Cordova/CDVViewController.h>

@interface PoolsTableViewController : CDVViewController

@property (nonatomic,strong) NSMutableArray* pools;
@property (nonatomic) CGPoint lastTouch;
@property (nonatomic, strong) NSIndexPath* tapRow;

@end

