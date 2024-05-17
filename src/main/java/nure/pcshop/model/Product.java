package nure.pcshop.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@SQLRestriction(value = "is_deleted = FALSE")
@SQLDelete(sql = "UPDATE products SET is_deleted = TRUE WHERE id = ?")
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;
    @Column(nullable = false)
    protected String name;
    protected String description;
    @ToString.Exclude
    @ManyToMany
    @JoinTable(
            name = "products_images",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "image_id")
    )
    protected List<Image> images;
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    protected List<Review> reviews;
    @Column(nullable = false)
    protected BigDecimal price;
    protected String brandName;
    protected String country;
    @Column(nullable = false)
    protected int warrantyPeriod;
    protected Float averageRating;
    @Column(nullable = false)
    protected boolean is_deleted = false;
}

