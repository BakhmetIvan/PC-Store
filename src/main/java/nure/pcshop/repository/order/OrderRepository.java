package nure.pcshop.repository.order;

import nure.pcshop.model.Order;
import nure.pcshop.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Page<Order> findAllByUser(User user, Pageable pageable);

    Optional<Order> findByUserAndId(User user, Long id);

    Page<Order> findAllByStatusIdAndUser(Long statusId, User user, Pageable pageable);
}
