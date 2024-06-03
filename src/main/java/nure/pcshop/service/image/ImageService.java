package nure.pcshop.service.image;

import nure.pcshop.dto.product.LaptopRequestDto;
import nure.pcshop.model.Image;
import java.util.List;

public interface ImageService {
    List<Image> saveImageList(LaptopRequestDto requestDto);
}
