package nure.pcshop.service.products.impl;

import lombok.RequiredArgsConstructor;
import nure.pcshop.dto.videocard.VideoCardRequestDto;
import nure.pcshop.dto.videocard.VideoCardResponseDto;
import nure.pcshop.exception.EntityNotFoundException;
import nure.pcshop.mapper.products.VideoCardMapper;
import nure.pcshop.model.VideoCard;
import nure.pcshop.repository.products.VideoCardRepository;
import nure.pcshop.service.products.VideoCardService;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VideoCardServiceImpl implements VideoCardService {
    private final VideoCardRepository videoCardRepository;
    private final VideoCardMapper videoCardMapper;

    @Override
    public VideoCardResponseDto save(VideoCardRequestDto requestDto) {
        VideoCard videoCard = videoCardMapper.toModel(requestDto);
        return videoCardMapper.toDto(videoCardRepository.save(videoCard));
    }

    @Override
    public List<VideoCardResponseDto> findAll(Pageable pageable) {
        return videoCardRepository.findAll(pageable).stream()
                .map(videoCardMapper::toDto)
                .toList();
    }

    @Override
    public VideoCardResponseDto findById(Long id) {
        VideoCard videoCard = videoCardRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(String.format("Can't find video card by id: %d", id))
        );
        return videoCardMapper.toDto(videoCard);
    }

    @Transactional
    @Override
    public VideoCardResponseDto update(Long id, VideoCardRequestDto requestDto) {
        VideoCard videoCard = videoCardRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(String.format("Can't find video card by id: %d", id))
        );
        videoCardMapper.updateVideoCardFromDto(requestDto, videoCard);
        return videoCardMapper.toDto(videoCard);
    }

    @Override
    public void delete(Long id) {

    }
}
