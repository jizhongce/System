//
//  UserTableViewCell.swift
//  Hardware_IOS
//
//  Created by Tim.Ji on 3/5/19.
//  Copyright © 2019 Zhongce Ji. All rights reserved.
//

import UIKit

class UserTableViewCell: UITableViewCell {

    
    @IBOutlet weak var Table_Cell_Label: UILabel!
    
    @IBOutlet weak var Table_Cell_Pic: UIImageView!
    
    @IBOutlet weak var Table_Cell_Forward_Pic: UIImageView!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
        
        Table_Cell_Forward_Pic.frame = CGRect(origin: CGPoint(x: self.frame.width - 1, y: Table_Cell_Forward_Pic.frame.origin.y), size: Table_Cell_Forward_Pic.frame.size)
        
        Table_Cell_Label.frame = CGRect(origin: Table_Cell_Label.frame.origin, size: CGSize(width: 200, height: Table_Cell_Label.frame.height))
        
        
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
}
