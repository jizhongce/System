//
//  UserViewController.swift
//  Hardware_IOS
//
//  Created by Tim.Ji on 2/24/19.
//  Copyright © 2019 Zhongce Ji. All rights reserved.
//

import UIKit

class UserViewController: UIViewController {

    @IBOutlet weak var Log_In_Button: UIButton!
    
    override func viewDidAppear(_ animated: Bool) {
        self.navigationController?.setNavigationBarHidden(true, animated: false)
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()

        self.navigationController?.setNavigationBarHidden(true, animated: false)
        
        
        
        Log_In_Button.layer.cornerRadius = 10.0
        Log_In_Button.layer.borderWidth = 1.0
        Log_In_Button.layer.borderColor = UIColor.black.cgColor
        
        
        
        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
