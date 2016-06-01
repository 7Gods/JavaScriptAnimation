/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package beans;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

@Named
@RequestScoped
public class bb {
    
    private  String msg;
    
    private String adress;
    
    public String next(){
        toConsole();
        return "output.xhtml";
    }
    
    public void toConsole(){
        System.out.println("★アドレス="+this.adress+"/ メッセージ="+this.msg);
    }
    
    
    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }
    
   
}
