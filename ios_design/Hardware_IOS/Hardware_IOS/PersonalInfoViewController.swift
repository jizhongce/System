//
//  PersonalInfoViewController.swift
//  Hardware_IOS
//
//  Created by Tim.Ji on 3/19/19.
//  Copyright © 2019 Zhongce Ji. All rights reserved.
//

import UIKit

class PersonalInfoViewController: UIViewController {

    @IBAction func Back_Button_Pressed(_ sender: Any) {
        
        self.navigationController?.popViewController(animated: true)
        
        
    }
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()

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
