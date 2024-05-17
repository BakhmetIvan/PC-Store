package nure.pcshop.service.products;

import nure.pcshop.dto.videocard.VideoCardRequestDto;
import nure.pcshop.dto.videocard.VideoCardResponseDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface VideoCardService {
    VideoCardResponseDto save(VideoCardRequestDto requestDto);

    List<VideoCardResponseDto> findAll(Pageable pageable);

    VideoCardResponseDto findById(Long id);

    VideoCardResponseDto update(Long id, VideoCardRequestDto requestDto);

    void delete(Long id);
}
