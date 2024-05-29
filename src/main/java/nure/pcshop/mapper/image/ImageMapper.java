package nure.pcshop.mapper.image;

import nure.pcshop.config.MapperConfig;
import nure.pcshop.dto.image.ImageRequestDto;
import nure.pcshop.dto.image.ImageResponseDto;
import nure.pcshop.model.Image;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapperConfig.class)
public interface ImageMapper {
    @Mapping(source = "productId", target = "product.id")
    Image toModel(ImageRequestDto requestDto);

    default ImageResponseDto toDto(Image image, byte[] imageData) {
        ImageResponseDto responseDto = new ImageResponseDto();
        responseDto.setId(image.getId());
        responseDto.setTitle(image.getTitle());
        responseDto.setContentType("image/jpeg");
        responseDto.setImageData(imageData);
        return responseDto;
    }
}
