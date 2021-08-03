package comecommerce.bookstore.controller;

import com.google.common.collect.Lists;
import comecommerce.bookstore.dao.BookRepository;
import comecommerce.bookstore.dao.CategoryRepository;
import comecommerce.bookstore.dao.PublisherRepository;
import comecommerce.bookstore.dto.ListCategoryWithBookQuantity;
import comecommerce.bookstore.dto.ListPubWithCatWithBookQuantity;
import comecommerce.bookstore.entity.Book;
import comecommerce.bookstore.entity.Category;
import comecommerce.bookstore.entity.Publisher;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/catwithbookquantity")
@AllArgsConstructor
public class CategoryWithBookQuantityController {
    private CategoryRepository categoryRepository;
    private BookRepository bookRepository;
    private PublisherRepository publisherRepository;
    @GetMapping("/index")
    public List<ListCategoryWithBookQuantity> getListCatWithBookQuantity()
    {
        List<ListCategoryWithBookQuantity>ls= new ArrayList<>();
        List<Category>cats=categoryRepository.findAll();
        for (Category item : cats) {
            List<Book>books=this.bookRepository.findBookByCategoryId(item.getId());
            ListCategoryWithBookQuantity data=new ListCategoryWithBookQuantity(item.getId(),books.size(),item.getName());
            ls.add(data);
        }
        return ls;
    }
    @GetMapping("/withpub")
    public List<ListPubWithCatWithBookQuantity>getListPubWithCatWithBookQuantities()
    {
        List<ListPubWithCatWithBookQuantity>listPubWithCatWithBookQuantities=new ArrayList<>();
        List<Publisher>lsPub=publisherRepository.findAll();
        List<Category>cats=categoryRepository.findAll();
        for(Publisher data:lsPub)
        {
            List<ListCategoryWithBookQuantity>ls= new ArrayList<>();
            for(Category cat:cats)
            {
                List<Book>books=this.bookRepository.findDataCatPub(cat.getId(),data.getId());
                ListCategoryWithBookQuantity listCategoryWithBookQuantity=new ListCategoryWithBookQuantity(cat.getId(),books.size(),cat.getName());
                ls.add(listCategoryWithBookQuantity);
            }
            ListPubWithCatWithBookQuantity item=new ListPubWithCatWithBookQuantity(data.getId(),data.getName(),ls);
            listPubWithCatWithBookQuantities.add(item);
        }
        return listPubWithCatWithBookQuantities;
    }
}
