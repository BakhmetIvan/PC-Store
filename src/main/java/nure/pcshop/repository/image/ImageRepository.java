package nure.pcshop.repository.image;

import nure.pcshop.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
