package nure.pcshop.mapper;

import nure.pcshop.config.MapperConfig;
import nure.pcshop.dto.image.ImageResponseDto;
import nure.pcshop.model.Image;
import org.mapstruct.Mapper;
import org.mapstruct.Named;
import java.util.List;

@Mapper(config = MapperConfig.class)
public interface ImageMapper {
    ImageResponseDto toDto(Image image);

    @Named("toSingleImageDto")
    default ImageResponseDto toSingleImageDto(List<Image> images) {
        if (!images.isEmpty()) {
            return toDto(images.get(0));
        }
        return null;
    }
}
