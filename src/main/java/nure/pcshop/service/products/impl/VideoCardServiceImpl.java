package nure.pcshop.service.products.impl;

import lombok.RequiredArgsConstructor;
import nure.pcshop.dto.videocard.VideoCardRequestDto;
import nure.pcshop.dto.videocard.VideoCardResponseDto;
import nure.pcshop.dto.videocard.VideoCardWithAllFieldsDto;
import nure.pcshop.exception.EntityNotFoundException;
import nure.pcshop.mapper.products.VideoCardMapper;
import nure.pcshop.model.VideoCard;
import nure.pcshop.repository.products.VideoCardRepository;
import nure.pcshop.service.image.ImageService;
import nure.pcshop.service.products.VideoCardService;
import nure.pcshop.service.review.ReviewService;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VideoCardServiceImpl implements VideoCardService {
    private final ImageService imageService;
    private final VideoCardRepository videoCardRepository;
    private final VideoCardMapper videoCardMapper;
    private final ReviewService reviewService;

    @Override
    public VideoCardResponseDto save(VideoCardRequestDto requestDto) {
        VideoCard videoCard = videoCardMapper.toModel(requestDto);
        return videoCardMapper.toDto(videoCardRepository.save(videoCard));
    }

    @Override
    public List<VideoCardResponseDto> findAll(Pageable pageable) {
        return videoCardRepository.findAll(pageable).stream()
                .map(videoCardMapper::toDto)
                .peek(videoCard -> videoCard.setImage(imageService.findImageByProductId(videoCard.getId())))
                .toList();
    }

    @Override
    public VideoCardWithAllFieldsDto findById(Long id, Pageable pageable) {
        VideoCard videoCard = videoCardRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(String.format("Немає відеокарти з id: %d", id))
        );
        VideoCardWithAllFieldsDto responseDto = videoCardMapper.toDtoWithAllFields(videoCard);
        responseDto.setImages(imageService.findAllImagesByProductId(videoCard.getId()));
        responseDto.setReviews(reviewService.findAllReviewsByProductId(id, pageable));
        return responseDto;
    }

    @Transactional
    @Override
    public VideoCardResponseDto update(Long id, VideoCardRequestDto requestDto) {
        VideoCard videoCard = videoCardRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(String.format("Немає відеокарти з id: %d", id))
        );
        videoCardMapper.updateVideoCardFromDto(requestDto, videoCard);
        return videoCardMapper.toDto(videoCardRepository.save(videoCard));
    }

    @Override
    public void delete(Long id) {
        videoCardRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(String.format("Немає відеокарти з id: %d", id))
        );
        videoCardRepository.deleteById(id);
    }
}
