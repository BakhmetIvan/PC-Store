package nure.pcshop.mapper.products;

import nure.pcshop.config.MapperConfig;
import nure.pcshop.dto.product.LaptopPageDto;
import nure.pcshop.dto.product.LaptopRequestDto;
import nure.pcshop.dto.product.LaptopResponseDto;
import nure.pcshop.dto.product.LaptopWithAllFieldsDto;
import nure.pcshop.mapper.image.ImageMapper;
import nure.pcshop.mapper.review.ReviewMapper;
import nure.pcshop.model.Laptop;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(config = MapperConfig.class, uses = {ImageMapper.class, ReviewMapper.class})
public interface LaptopMapper {
    Laptop toModel(LaptopRequestDto requestDto);

    @Mapping(source = "images", target = "image", qualifiedByName = "toSingleImageDto")
    @Mapping(source = "reviews", target = "reviewsCount", qualifiedByName = "setReviewsCount")
    LaptopResponseDto toDto(Laptop laptop);

    LaptopWithAllFieldsDto toDtoWithAllFields(Laptop laptop);

    LaptopPageDto toDtoPage(Laptop laptop);

    void updateVideoCardFromDto(LaptopRequestDto requestDto, @MappingTarget Laptop laptop);
}
