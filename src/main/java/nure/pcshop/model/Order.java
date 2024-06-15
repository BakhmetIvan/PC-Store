package nure.pcshop.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @Column(nullable = false)
    private String firstName;
    @Column(nullable = false)
    private String lastName;
    private String patronymic;
    private String email;
    @Column(nullable = false)
    private String phoneNumber;
    private String city;
    private String address;
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "delivery_type_id", nullable = false)
    private DeliveryType deliveryType;
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "payment_type_id", nullable = false)
    private PaymentType paymentType;
    @Column(nullable = false)
    private BigDecimal total;
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "order_status_id", nullable = false)
    private OrderStatus status;
    @Column(nullable = false)
    private LocalDateTime orderDate;
    @ToString.Exclude
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems;
    @ToString.Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    private User manager;
}
