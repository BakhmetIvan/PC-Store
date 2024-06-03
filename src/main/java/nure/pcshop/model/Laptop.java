package nure.pcshop.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@SQLRestriction(value = "is_deleted = FALSE")
@SQLDelete(sql = "UPDATE laptops SET is_deleted = TRUE WHERE id = ?")
@Table(name = "laptops")
public class Laptop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    private String description;
    @ToString.Exclude
    @ManyToMany
    @JoinTable(
            name = "laptops_images",
            joinColumns = @JoinColumn(name = "laptop_id"),
            inverseJoinColumns = @JoinColumn(name = "image_id")
    )
    private List<Image> images;
    @ToString.Exclude
    @OneToMany(mappedBy = "laptop", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews;
    @Column(nullable = false)
    private BigDecimal price;
    private String brandName;
    private String country;
    @Column(nullable = false)
    private int warrantyPeriod;
    private Float averageRating;
    @Column(nullable = false)
    private int amount;
    @Column(nullable = false)
    private Float diagonal;
    @Column(nullable = false)
    private String screenType;
    @Column(nullable = false)
    private int refreshRate;
    @Column(nullable = false)
    private int resolution;
    @Column(nullable = false)
    private String processor;
    @Column(nullable = false)
    private String operationSystem;
    @Column(nullable = false)
    private int ramMemory;
    @Column(nullable = false)
    private String ramType;
    @Column(nullable = false)
    private int ramSlotAmount;
    @Column(nullable = false)
    private String diskType;
    @Column(nullable = false)
    private int storage;
    @Column(nullable = false)
    private String gpu;
    @Column(nullable = false)
    private int gpuMemory;
    @Column(nullable = false)
    private int batteryCapacity;
    @ToString.Exclude
    @Column(name = "is_deleted", nullable = false)
    private boolean isDeleted = false;
}
