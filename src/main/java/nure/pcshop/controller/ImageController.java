package nure.pcshop.controller;

import lombok.RequiredArgsConstructor;
import nure.pcshop.dto.image.ImageRequestDto;
import nure.pcshop.service.image.ImageService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/images")
public class ImageController {
    private final ImageService imageService;

    @PostMapping
    public void save(ImageRequestDto requestDto) {
        imageService.save(requestDto);
    }
}
