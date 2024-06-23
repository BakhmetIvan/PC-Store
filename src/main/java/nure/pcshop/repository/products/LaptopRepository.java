package nure.pcshop.repository.products;

import nure.pcshop.model.Laptop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface LaptopRepository extends JpaRepository<Laptop, Long>, JpaSpecificationExecutor<Laptop> {
    Page<Laptop> findAll(Pageable pageable);

    Optional<Laptop> findById(Long id);

    Page<Laptop> findAllByNameContainingIgnoreCase(String name, Pageable pageable);
}
