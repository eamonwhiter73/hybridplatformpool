//
//  MyTableViewController.h
//  HybridIOSApp
//
//  Created by Holly Schinsky on 6/25/15.
//
//

#import <UIKit/UIKit.h>
@import WebKit;
#import "PoolsTableViewCell.h"
#import <Cordova/CDVViewController.h>

@interface PoolTableViewController : CDVViewController
@property (nonatomic,strong) NSMutableArray* items;
@property (nonatomic) CGPoint lastTouch;
@property (nonatomic, strong) NSIndexPath* tapRow;

@end
