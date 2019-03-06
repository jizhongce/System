//
//  SignUpViewController.swift
//  Hardware_IOS
//
//  Created by Tim.Ji on 2/25/19.
//  Copyright © 2019 Zhongce Ji. All rights reserved.
//

import UIKit

class SignUpViewController: UIViewController {

    @IBOutlet weak var Go_Back_Button: UIButton!
    
    @IBOutlet weak var Submit_Button: UIButton!
    
    @IBAction func Go_Back_Button_Pressed(_ sender: Any) {
        
//        navigationController?.popViewController(animated: true)
        dismiss(animated: true, completion: nil)
        
    }
    
    @IBAction func Submit_Button_Pressed(_ sender: Any) {
        
        dismiss(animated: true, completion: nil)

    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()

        Submit_Button.layer.cornerRadius = 10.0
        
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
