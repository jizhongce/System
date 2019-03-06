//
//  SMSSignInViewController.swift
//  Hardware_IOS
//
//  Created by Tim.Ji on 2/26/19.
//  Copyright © 2019 Zhongce Ji. All rights reserved.
//

import UIKit

class SMSSignInViewController: UIViewController {

    @IBOutlet weak var SMS_Go_Back_Button: UIButton!
    
    @IBOutlet weak var SMS_Sign_In_Button: UIButton!
    
    @IBAction func SMS_Go_Back_Button_Pressed(_ sender: Any) {
        dismiss(animated: true, completion: nil)
    }
    
    @IBAction func SMS_Sign_In_Button_Pressed(_ sender: Any) {
        
        dismiss(animated: true, completion: nil)
        
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
