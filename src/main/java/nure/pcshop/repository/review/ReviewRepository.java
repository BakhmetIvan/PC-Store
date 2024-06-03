package nure.pcshop.repository.review;

import nure.pcshop.model.Review;
import nure.pcshop.model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findAllByLaptopId(Long id, Pageable pageable);

    Optional<Review> findReviewByUser(User user);
}
