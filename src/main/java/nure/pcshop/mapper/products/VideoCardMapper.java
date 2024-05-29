package nure.pcshop.mapper.products;

import nure.pcshop.config.MapperConfig;
import nure.pcshop.dto.videocard.VideoCardRequestDto;
import nure.pcshop.dto.videocard.VideoCardResponseDto;
import nure.pcshop.dto.videocard.VideoCardWithAllFieldsDto;
import nure.pcshop.mapper.image.ImageMapper;
import nure.pcshop.mapper.review.ReviewMapper;
import nure.pcshop.model.VideoCard;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(config = MapperConfig.class, uses = {ImageMapper.class, ReviewMapper.class})
public interface VideoCardMapper {
    VideoCard toModel(VideoCardRequestDto requestDto);

    VideoCardResponseDto toDto(VideoCard card);

    VideoCardWithAllFieldsDto toDtoWithAllFields(VideoCard card);

    void updateVideoCardFromDto(VideoCardRequestDto requestDto, @MappingTarget VideoCard videoCard);
}
