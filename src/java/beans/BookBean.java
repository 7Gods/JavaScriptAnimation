package beans;

import javax.enterprise.context.RequestScoped;
import javax.inject.Named;

@Named
@RequestScoped
public class BookBean {
    private Integer price;
    private String bookName;
    private String author;
    

    public String next(){
        toConsole();
        return "output.xhtml";
    }
    
    public void toConsole(){
        System.out.println("★書籍名="+this.bookName+"/ 著者名="+this.author+"/ 価格="+this.price);
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
    

    
}
