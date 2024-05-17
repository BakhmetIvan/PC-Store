package nure.pcshop.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import nure.pcshop.dto.videocard.VideoCardRequestDto;
import nure.pcshop.dto.videocard.VideoCardResponseDto;
import nure.pcshop.service.products.VideoCardService;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/video-cards")
public class VideoCardController {
    private final VideoCardService cardService;

    @PostMapping
    public VideoCardResponseDto save(@RequestBody @Valid VideoCardRequestDto requestDto) {
        return cardService.save(requestDto);
    }

    @GetMapping
    public List<VideoCardResponseDto> findAll(Pageable pageable) {
        return cardService.findAll(pageable);
    }

    @GetMapping("/{id}")
    public VideoCardResponseDto findById(@PathVariable @Positive Long id) {
        return cardService.findById(id);
    }

    @PutMapping("/{id}")
    public VideoCardResponseDto update(@PathVariable @Positive Long id,
                                       @RequestBody VideoCardRequestDto requestDto) {
        return cardService.update(id, requestDto);
    }
}
