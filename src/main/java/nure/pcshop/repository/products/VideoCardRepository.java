package nure.pcshop.repository.products;

import nure.pcshop.model.VideoCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VideoCardRepository extends JpaRepository<VideoCard, Long> {
    Optional<VideoCard> findById(Long id);
}
