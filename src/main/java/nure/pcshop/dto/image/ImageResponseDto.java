package nure.pcshop.dto.image;

import lombok.Data;

@Data
public class ImageResponseDto {
    private Long id;
    private String title;
    private String contentType;
    private byte[] imageData;
}
