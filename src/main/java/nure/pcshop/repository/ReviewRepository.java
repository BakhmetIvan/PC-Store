package nure.pcshop.repository;

import nure.pcshop.model.Review;
import nure.pcshop.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> findAllByLaptopId(Long id, Pageable pageable);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.laptop.id = :laptopId")
    Float calculateAverageRating(Long laptopId);

    Optional<Review> findReviewByUserAndId(User user, Long id);

    Page<Review> findAllByUser(User user, Pageable pageable);
}
