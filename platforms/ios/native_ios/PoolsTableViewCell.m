//
//  PoolsTableViewCell.m
//  HybridPool
//
//  Created by Eamon White on 1/8/19.
//  Copyright © 2019 Eamon White. All rights reserved.
//

#import "PoolsTableViewCell.h"

@implementation PoolsTableViewCell
@synthesize cellLeftViewLabel;
@synthesize cellRightViewLabel;
@synthesize cellLeftImageView;
@synthesize cellRightImageView;

- (void)awakeFromNib {
    [super awakeFromNib];
    // Initialization code
    cellLeftViewLabel.numberOfLines = 0;
    cellRightViewLabel.numberOfLines = 0;
    cellLeftViewLabel.textColor = [UIColor blackColor];
    cellRightViewLabel.textColor = [UIColor blackColor];
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

@end
