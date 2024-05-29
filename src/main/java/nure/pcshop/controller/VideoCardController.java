package nure.pcshop.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import nure.pcshop.dto.review.ReviewRequestDto;
import nure.pcshop.dto.review.ReviewResponseDto;
import nure.pcshop.dto.videocard.VideoCardRequestDto;
import nure.pcshop.dto.videocard.VideoCardResponseDto;
import nure.pcshop.dto.videocard.VideoCardWithAllFieldsDto;
import nure.pcshop.model.User;
import nure.pcshop.service.products.VideoCardService;
import nure.pcshop.service.review.ReviewService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/video-cards")
public class VideoCardController {
    private final VideoCardService cardService;
    private final ReviewService reviewService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public VideoCardResponseDto save(@RequestBody @Valid VideoCardRequestDto requestDto) {
        return cardService.save(requestDto);
    }

    @GetMapping
    public List<VideoCardResponseDto> findAll(@PageableDefault Pageable pageable) {
        return cardService.findAll(pageable);
    }

    @GetMapping("/{id}")
    public VideoCardWithAllFieldsDto findById(@PathVariable @Positive Long id,
                                              @PageableDefault Pageable pageable) {
        return cardService.findById(id, pageable);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public VideoCardResponseDto update(@PathVariable @Positive Long id,
                                       @Valid @RequestBody VideoCardRequestDto requestDto) {
        return cardService.update(id, requestDto);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable @Positive Long id) {
        cardService.delete(id);
    }

    @PostMapping("{productId}/reviews")
    public ReviewResponseDto postReview(@PathVariable @Positive Long productId,
                                        Authentication authentication,
                                        @Valid @RequestBody ReviewRequestDto requestDto) {
        User user = (User) authentication.getPrincipal();
        return reviewService.postReview(productId, user.getId(), requestDto);
    }

    @GetMapping("{productId}/reviews")
    public List<ReviewResponseDto> findAllReviews(@PathVariable @Positive Long productId,
                                                  @PageableDefault Pageable pageable) {
        return reviewService.findAllReviewsByProductId(productId, pageable);
    }
}
