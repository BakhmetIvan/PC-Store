package nure.pcshop.repository.products;

import nure.pcshop.model.Laptop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface LaptopRepository extends JpaRepository<Laptop, Long>, JpaSpecificationExecutor<Laptop> {
    Page<Laptop> findAll(Pageable pageable);

    Optional<Laptop> findById(Long id);

    Page<Laptop> findAllByNameContainingIgnoreCase(String name, Pageable pageable);

    @Query("SELECT l FROM Laptop l LEFT JOIN OrderItem oi ON l.id = oi.laptop.id GROUP BY l.id ORDER BY COUNT(oi.id) DESC")
    Page<Laptop> findPopularLaptops(Pageable pageable);
}
