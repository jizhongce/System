//
//  SignedInViewController.swift
//  Hardware_IOS
//
//  Created by Tim.Ji on 2/27/19.
//  Copyright © 2019 Zhongce Ji. All rights reserved.
//

import UIKit

class SignedInViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    

    @IBOutlet weak var Personal_Info_Pic: UIImageView!
    
    @IBOutlet weak var User_Table: UITableView!
    
    
    let Sections = [4,1,1]
    
    let Section_Names = [["个 人 信 息", "订 单 信 息", "地 址 簿", "收 藏 夹"], ["设 置"], ["退 出 登 录"]]
    
    let Section_Footer_Height : CGFloat = 5.0
    
    let Section_Header_Height : CGFloat = 5.0
    
    let Section_Height : CGFloat = 60.0
    
    let Table_Cell_Forward_Pic: UIImage = UIImage(named: "forward-60")!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.User_Table.delegate = self

        self.User_Table.dataSource = self
        
        self.User_Table.register(UINib(nibName: "UserTableViewCell", bundle: nil), forCellReuseIdentifier: "UserTableViewCell")
        
        let User_Table_Height = CGFloat(Sections.reduce(0, +)) * (Section_Height + Section_Header_Height + Section_Footer_Height) - Section_Header_Height
        
        self.User_Table.frame = CGRect(origin: self.User_Table.frame.origin, size: CGSize(width: self.view.frame.width, height: User_Table_Height ))
        
//        self.User_Table.isScrollEnabled = false
        
        let Profile_Pic: UIImage = UIImage(named: "IMG_0710-60")!

        Personal_Info_Pic.image = Profile_Pic
        
        Personal_Info_Pic.frame = CGRect(x: 0, y: 0, width: 100.0, height: 100.0)
        
        Personal_Info_Pic.frame.origin.x = self.view.center.x - Personal_Info_Pic.frame.width/2
        
        Personal_Info_Pic.frame.origin.y = 100
        
        Personal_Info_Pic.layer.cornerRadius = 10.0
        
        Personal_Info_Pic.layer.borderWidth = 1.0
        
        Personal_Info_Pic.layer.borderColor = UIColor.black.cgColor
        
        self.view.bringSubview(toFront: Personal_Info_Pic)
        
        // Do any additional setup after loading the view.
    }
    
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let User_Info = User_Table.dequeueReusableCell(withIdentifier: "UserTableViewCell", for: indexPath) as! UserTableViewCell
        
        User_Info.frame = CGRect(origin: User_Info.frame.origin, size: CGSize(width: self.view.frame.width, height: User_Info.frame.height))
        
        let Temp_Name = Section_Names[indexPath.section][indexPath.row]
        
        User_Info.Table_Cell_Label.text = Temp_Name
        
        var Temp_Image : UIImage = UIImage(named: "blank-20")!
        
        switch Temp_Name {
        case "个 人 信 息":
            Temp_Image = UIImage(named: "profile-20")!
        case "订 单 信 息":
            Temp_Image = UIImage(named: "order-20")!
        case "地 址 簿":
            Temp_Image = UIImage(named: "address-20")!
        case "收 藏 夹":
            Temp_Image = UIImage(named: "favorite-20")!
        case "设 置":
            Temp_Image = UIImage(named: "setting-20")!
        case "退 出 登 录":
            Temp_Image = UIImage(named: "log_out-20")!
        default:
            print(Temp_Name)
        }
        
        User_Info.Table_Cell_Pic.image = Temp_Image
        
        if indexPath.section != Sections.count-1  {
            User_Info.Table_Cell_Forward_Pic.image = Table_Cell_Forward_Pic
        }
        
        return User_Info
    }
    
    
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
        let Temp_Name = Section_Names[indexPath.section][indexPath.row]
        
        switch Temp_Name {
        case "个 人 信 息":
            
            let Personal_Info_View: PersonalInfoViewController = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "PersonalInfoView") as! PersonalInfoViewController
            
            self.navigationController?.pushViewController(Personal_Info_View, animated: true)
            
        case "订 单 信 息":
            
            let Order_View: OrderViewController = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "OrderView") as! OrderViewController
            
            self.navigationController?.pushViewController(Order_View, animated: true)
            
            
        case "地 址 簿":
            
            let Address_View: AddressViewController = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "AddressView") as! AddressViewController
            
            self.navigationController?.pushViewController(Address_View, animated: true)
            
            
        case "收 藏 夹":
            
            let Favorite_View: FavoriteViewController = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "FavoriteView") as! FavoriteViewController
            
            self.navigationController?.pushViewController(Favorite_View, animated: true)
            
            
        case "设 置":
            
            let Setting_View: SettingViewController = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "SettingView") as! SettingViewController
            
            self.navigationController?.pushViewController(Setting_View, animated: true)
            
        case "退 出 登 录":
            self.navigationController?.popViewController(animated: true)
        default:
            print(Temp_Name)
        }
        
        
        
        
        
        
        
    }
    
    
    
    
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return Section_Height
    }
    
    func tableView(_ tableView: UITableView, heightForFooterInSection section: Int) -> CGFloat {
        
//        if section == Sections.count-1 {
//            return 0
//        } else {
            return Section_Footer_Height
//        }
        
    }
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        
        if section == 0 {
            return 0
        }
        else{
            return Section_Header_Height
        }
        
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        
        return Sections[section]
        
    }
    
    
    func numberOfSections(in tableView: UITableView) -> Int {
        
        
        return Sections.count
        
        
    }
    
    
    
//    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
//
//        switch indexPath.row {
//        case 5:
//            self.navigationController?.popViewController(animated: true)
//        default:
//            print(indexPath.row)
//            print(indexPath.item)
//        }
//
//    }
    
    
    
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
