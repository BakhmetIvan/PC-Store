package nure.pcshop.dto.image;

import lombok.Data;

@Data
public class ImageRequestDto {
    private String title;
    private String pathToImage;
    private Long productId;
}
