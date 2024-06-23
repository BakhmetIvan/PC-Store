package nure.pcshop.service.products;

import lombok.RequiredArgsConstructor;
import nure.pcshop.dto.product.LaptopPageDto;
import nure.pcshop.dto.product.LaptopRequestDto;
import nure.pcshop.dto.product.LaptopResponseDto;
import nure.pcshop.dto.product.LaptopSearchParametersDto;
import nure.pcshop.dto.product.LaptopWithAllFieldsDto;
import nure.pcshop.exception.EntityNotFoundException;
import nure.pcshop.mapper.LaptopMapper;
import nure.pcshop.model.Laptop;
import nure.pcshop.repository.products.LaptopRepository;
import nure.pcshop.repository.products.LaptopSpecificationBuilder;
import nure.pcshop.service.image.ImageService;
import nure.pcshop.service.review.ReviewService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LaptopServiceImpl implements ProductService {
    private final ImageService imageService;
    private final LaptopRepository laptopRepository;
    private final LaptopMapper laptopMapper;
    private final ReviewService reviewService;
    private final LaptopSpecificationBuilder laptopSpecificationBuilder;

    @Override
    public LaptopResponseDto save(LaptopRequestDto requestDto) {
        Laptop laptop = laptopMapper.toModel(requestDto);
        laptop.setImages(imageService.saveImageList(requestDto));
        return laptopMapper.toDto(laptopRepository.save(laptop));
    }

    @Override
    public Page<LaptopResponseDto> findAll(Pageable pageable) {
        return laptopRepository.findAll(pageable)
                .map(laptopMapper::toDto);
    }

    @Override
    public LaptopPageDto findById(Long id, Pageable pageable) {
        Laptop laptop = laptopRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(String.format("Немає ноутбука з id: %d", id))
        );
        LaptopPageDto responseDto = laptopMapper.toDtoPage(laptop);
        responseDto.setReviews(reviewService.findAllReviewsByProductId(id, pageable)
                .stream().toList());
        return responseDto;
    }

    @Override
    public Page<LaptopResponseDto> findAllByName(String name, Pageable pageable) {
        return laptopRepository.findAllByNameContainingIgnoreCase(name, pageable)
                .map(laptopMapper::toDto);
    }

    @Override
    public LaptopWithAllFieldsDto findCharacteristicById(Long id) {
        Laptop laptop = laptopRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(String.format("Немає ноутбука з id: %d", id))
        );
        return laptopMapper.toDtoWithAllFields(laptop);
    }

    @Transactional
    @Override
    public LaptopResponseDto update(Long id, LaptopRequestDto requestDto) {
        Laptop laptop = laptopRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(String.format("Немає ноутбука з id: %d", id))
        );
        laptopMapper.updateVideoCardFromDto(requestDto, laptop);
        laptop.setImages(imageService.saveImageList(requestDto));
        return laptopMapper.toDto(laptopRepository.save(laptop));
    }

    @Override
    public Page<LaptopResponseDto> search(LaptopSearchParametersDto searchParametersDto, Pageable pageable) {
        Specification<Laptop> laptopSpecification = laptopSpecificationBuilder.build(searchParametersDto);
        return laptopRepository.findAll(laptopSpecification, pageable)
                .map(laptopMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        laptopRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(String.format("Немає ноутбука з id: %d", id))
        );
        laptopRepository.deleteById(id);
    }
}
