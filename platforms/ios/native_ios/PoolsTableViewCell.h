//
//  PoolsTableViewCell.h
//  HybridPool
//
//  Created by Eamon White on 1/8/19.
//  Copyright © 2019 Eamon White. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface PoolsTableViewCell : UITableViewCell

@property (strong, nonatomic) IBOutlet UILabel *cellLeftViewLabel;
@property (strong, nonatomic) IBOutlet UILabel *cellRightViewLabel;
@property (strong, nonatomic) IBOutlet UIImageView *cellLeftImageView;
@property (strong, nonatomic) IBOutlet UIImageView *cellRightImageView;

@end
