package nure.pcshop.service.products.impl;

import lombok.RequiredArgsConstructor;
import nure.pcshop.dto.product.LaptopPageDto;
import nure.pcshop.dto.product.LaptopRequestDto;
import nure.pcshop.dto.product.LaptopResponseDto;
import nure.pcshop.dto.product.LaptopWithAllFieldsDto;
import nure.pcshop.exception.EntityNotFoundException;
import nure.pcshop.mapper.products.LaptopMapper;
import nure.pcshop.model.Laptop;
import nure.pcshop.repository.products.LaptopRepository;
import nure.pcshop.service.image.ImageService;
import nure.pcshop.service.products.ProductService;
import nure.pcshop.service.review.ReviewService;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LaptopServiceImpl implements ProductService {
    private final ImageService imageService;
    private final LaptopRepository laptopRepository;
    private final LaptopMapper laptopMapper;
    private final ReviewService reviewService;

    @Override
    public LaptopResponseDto save(LaptopRequestDto requestDto) {
        Laptop laptop = laptopMapper.toModel(requestDto);
        laptop.setImages(imageService.saveImageList(requestDto));
        return laptopMapper.toDto(laptopRepository.save(laptop));
    }

    @Override
    public List<LaptopResponseDto> findAll(Pageable pageable) {
        return laptopRepository.findAll(pageable).stream()
                .map(laptopMapper::toDto)
                .toList();
    }

    @Override
    public LaptopPageDto findById(Long id, Pageable pageable) {
        Laptop laptop = laptopRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(String.format("Немає ноутбука з id: %d", id))
        );
        LaptopPageDto responseDto = laptopMapper.toDtoPage(laptop);
        responseDto.setReviews(reviewService.findAllReviewsByProductId(id, pageable));
        return responseDto;
    }

    @Override
    public List<LaptopResponseDto> findAllByName(String name, Pageable pageable) {
        return laptopRepository.findAllByNameContainingIgnoreCase(name, pageable).stream()
                .map(laptopMapper::toDto)
                .toList();
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
    public void delete(Long id) {
        laptopRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(String.format("Немає ноутбука з id: %d", id))
        );
        laptopRepository.deleteById(id);
    }
}
