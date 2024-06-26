package nure.pcshop.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import nure.pcshop.dto.product.LaptopPageDto;
import nure.pcshop.dto.product.LaptopRequestDto;
import nure.pcshop.dto.product.LaptopResponseDto;
import nure.pcshop.dto.product.LaptopSearchParametersDto;
import nure.pcshop.dto.product.LaptopUpdateInfoResponseDto;
import nure.pcshop.dto.product.LaptopWithAllFieldsDto;
import nure.pcshop.dto.review.ReviewRequestDto;
import nure.pcshop.dto.review.ReviewResponseDto;
import nure.pcshop.model.User;
import nure.pcshop.service.products.ProductService;
import nure.pcshop.service.review.ReviewService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
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
@RequestMapping("/laptops")
public class LaptopController {
    private final ProductService productService;
    private final ReviewService reviewService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    @Operation(summary = "Create a new laptop",
            description = "Allows an admin to create a new laptop")
    public LaptopResponseDto save(@ModelAttribute @Valid LaptopRequestDto requestDto) {
        return productService.save(requestDto);
    }

    @GetMapping("/search")
    @Operation(summary = "Search laptops by name",
            description = "Finds laptops by their name")
    public Page<LaptopResponseDto> search(LaptopSearchParametersDto searchParametersDto,
                                              @PageableDefault Pageable pageable) {
        return productService.search(searchParametersDto, pageable);
    }

    @GetMapping
    @Operation(summary = "Get all laptops",
            description = "Retrieves a paginated page of all laptops")
    public Page<LaptopResponseDto> findAll(@PageableDefault Pageable pageable) {
        return productService.findAll(pageable);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get laptop by ID",
            description = "Retrieves a laptop by its ID along with its reviews")
    public LaptopPageDto findById(@PathVariable @Positive Long id,
                                  @PageableDefault Pageable pageable) {
        return productService.findById(id, pageable);
    }

    @GetMapping("/popular")
    @Operation(summary = "Get 5 popular laptops",
            description = "Retrieves 5 the most popular laptops")
    public List<LaptopResponseDto> findPopularLaptops(Pageable pageable) {
        return productService.findPopularLaptops(pageable);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/update/{id}")
    @Operation(summary = "Update a laptop",
            description = "Allows an admin to update a laptop's information")
    public LaptopResponseDto update(@PathVariable @Positive Long id,
                                    @Valid @ModelAttribute LaptopRequestDto requestDto) {
        return productService.update(id, requestDto);
    }

    @GetMapping("/{id}/characteristic")
    @Operation(summary = "Get laptop characteristics by ID",
            description = "Retrieves all characteristics of a laptop by its ID")
    public LaptopWithAllFieldsDto findCharacteristicById(@PathVariable @Positive Long id) {
        return productService.findCharacteristicById(id);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/update/{id}")
    @Operation(summary = "Get laptop info for update by ID",
            description = "Retrieves all info of a laptop for update by its ID")
    public LaptopUpdateInfoResponseDto getInfoForUpdate(@PathVariable @Positive Long id) {
        return productService.findInfoForUpdateById(id);
    }

    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    @PostMapping("/{id}/reviews")
    @Operation(summary = "Post a review",
            description = "Allows a user to post a review for a specific laptop")
    public ReviewResponseDto postReview(@PathVariable @Positive Long id,
                                        Authentication authentication,
                                        @Valid @RequestBody ReviewRequestDto requestDto) {
        User user = (User) authentication.getPrincipal();
        return reviewService.postReview(id, user.getId(), requestDto);
    }

    @GetMapping("/{id}/reviews")
    @Operation(summary = "Get all reviews for a laptop",
            description = "Retrieves a paginated page of all reviews for a specific laptop")
    public Page<ReviewResponseDto> findAllReviews(@PathVariable @Positive Long id,
                                                  @PageableDefault Pageable pageable) {
        return reviewService.findAllReviewsByProductId(id, pageable);
    }

    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/reviews/{id}")
    @Operation(summary = "Delete review",
            description = "User can delete his review by id")
    public void deleteReviewById(Authentication authentication,
                                 @PathVariable @Positive Long id) {
        User user = (User) authentication.getPrincipal();
        reviewService.delete(user, id);
    }


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a laptop by ID",
            description = "Allows an admin to delete a laptop by its ID")
    public void deleteById(@PathVariable @Positive Long id) {
        productService.delete(id);
    }
}
