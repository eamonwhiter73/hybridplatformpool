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
        
        dispatch_async(dispatch_get_main_queue(), ^{
            WKWebView* webView = (WKWebView*)self.webView;
            [webView reload];
            self.webView.hidden = false;
        });
    }
}

-(instancetype)initWithCoder:(NSCoder *)aDecoder {
    self = [super initWithCoder:aDecoder];
    self.items = [[NSMutableArray alloc]init];
    return self;
}

- (void)viewWillAppear:(BOOL)animated {
    self.webView.hidden = true;
    [super viewWillAppear:animated];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    [self.items addObject:@"Hio"];
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
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    // Return the number of rows in the section.
    return [self.items count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    
    //UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"Cell1" forIndexPath:indexPath];
    NSLog(@"indexPath.row: %li, %@", (long)indexPath.row, [self.items objectAtIndex:indexPath.row]);
    
    PoolsTableViewCell *cell = (PoolsTableViewCell*)[tableView dequeueReusableCellWithIdentifier:@"Cell" forIndexPath:indexPath];
    
    cell.cellLeftViewLabel.text = [self.items objectAtIndex:indexPath.row];
    cell.cellRightViewLabel.text = [self.items objectAtIndex:indexPath.row];
    
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
