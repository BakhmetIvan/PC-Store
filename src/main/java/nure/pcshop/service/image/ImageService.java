package nure.pcshop.service.image;

import nure.pcshop.dto.image.ImageRequestDto;
import nure.pcshop.dto.image.ImageResponseDto;
import java.util.List;

public interface ImageService {
    void save(ImageRequestDto requestDto);

    ImageResponseDto findImageByProductId(Long productId);

    List<ImageResponseDto> findAllImagesByProductId(Long productId);
}
