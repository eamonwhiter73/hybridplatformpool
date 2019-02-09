//
//  PoolTableViewController.m
//  HybridIOSApp
//
//  Created by Holly Schinsky on 6/25/15.
//
//

#import "PoolTableViewController.h"

@interface PoolTableViewController ()

@end

@implementation PoolTableViewController

- (IBAction)handleTap:(UITapGestureRecognizer *)sender {
    if(sender.state == UIGestureRecognizerStateEnded) {
        CGPoint tapLocation = [sender locationInView:self.tableView];
        self.lastTouch = tapLocation;
        NSLog(@"tapLocation: x-%f, y-%f", tapLocation.x, tapLocation.y);
        
        NSIndexPath *tapIndexPath = [self.tableView indexPathForRowAtPoint:tapLocation];
        self.tapRow = tapIndexPath;
        //PoolsTableViewCell *tappedCell = [self.tableView cellForRowAtIndexPath:tapIndexPath];
        NSLog(@"tappedIndexPath: %@", [self.tapRow description]);
        
        //[self performSegueWithIdentifier:@"toItemViewController" sender:self];
        WKWebView* webView = (WKWebView*)self.webView;
        dispatch_async(dispatch_get_main_queue(), ^{
            [webView reload];
            self.webView.hidden = false;
        });
    }
}

-(instancetype)initWithCoder:(NSCoder *)aDecoder {
    self = [super initWithCoder:aDecoder];
    self.leftItems = [[NSMutableArray alloc]init];
    self.rightItems = [[NSMutableArray alloc]init];
    self.wwwFolderName = @"www/templates";
    self.startPage = @"pool.html";
    self.showTableSections = true;
    return self;
}

- (void)viewWillAppear:(BOOL)animated {
    self.webView.hidden = true;
    self.showTableSections = true;
    [super viewWillAppear:animated];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    self.tableView.separatorColor = [UIColor clearColor];

    // Uncomment the following line to preserve selection between presentations.
    // self.clearsSelectionOnViewWillAppear = NO;
    
    // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
    // self.navigationItem.rightBarButtonItem = self.editButtonItem;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    // Return the number of sections.
    if(self.showTableSections) {
        return 1;
    }
    else {
        return 0;
    }
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    // Return the number of rows in the section.
    return [self.leftItems count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    NSLog(@"cellForRowAtIndexPath getting called - row: %li", (long)indexPath.row);
    
    PoolsTableViewCell *cell = (PoolsTableViewCell*)[tableView dequeueReusableCellWithIdentifier:@"Cell"];
    
    if (cell == nil) {
        NSLog(@"cell == nil");
        cell = [[PoolsTableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:@"Cell"];
        cell.selectionStyle = UITableViewCellSelectionStyleNone;
    }
    
    NSURL* leftURL = [NSURL URLWithString:[[self.leftItems objectAtIndex:indexPath.row] valueForKey:@"downloadURL"]];
    [cell.cellLeftImageView sd_setImageWithURL:leftURL];
    cell.cellLeftViewLabel.text = [[self.leftItems objectAtIndex:indexPath.row] valueForKey:@"item"];

    if(![[self.rightItems objectAtIndex:indexPath.row] isEqual:[NSNull null]]) {
        NSURL* rightURL = [NSURL URLWithString:[[self.rightItems objectAtIndex:indexPath.row] valueForKey:@"downloadURL"]];
        [cell.cellRightImageView sd_setImageWithURL:rightURL];
        cell.cellRightViewLabel.text = [[self.rightItems objectAtIndex:indexPath.row] valueForKey:@"item"];
    }
    else {
        cell.cellRightImageView.image = nil;
        cell.cellRightViewLabel.text = @"";
    }
    
    return cell;
}

/*
 // Override to support conditional editing of the table view.
 - (BOOL)tableView:(UITableView *)tableView canEditRowAtIndexPath:(NSIndexPath *)indexPath {
 // Return NO if you do not want the specified item to be editable.
 return YES;
 }
 */

/*
 // Override to support editing the table view.
 - (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath {
 if (editingStyle == UITableViewCellEditingStyleDelete) {
 // Delete the row from the data source
 [tableView deleteRowsAtIndexPaths:@[indexPath] withRowAnimation:UITableViewRowAnimationFade];
 } else if (editingStyle == UITableViewCellEditingStyleInsert) {
 // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
 }
 }
 */

/*
 // Override to support rearranging the table view.
 - (void)tableView:(UITableView *)tableView moveRowAtIndexPath:(NSIndexPath *)fromIndexPath toIndexPath:(NSIndexPath *)toIndexPath {
 }
 */

/*
 // Override to support conditional rearranging of the table view.
 - (BOOL)tableView:(UITableView *)tableView canMoveRowAtIndexPath:(NSIndexPath *)indexPath {
 // Return NO if you do not want the item to be re-orderable.
 return YES;
 }
 */

/*
 #pragma mark - Navigation
 
 // In a storyboard-based application, you will often want to do a little preparation before navigation
 - (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
 // Get the new view controller using [segue destinationViewController].
 // Pass the selected object to the new view controller.
 }
 */

@end
