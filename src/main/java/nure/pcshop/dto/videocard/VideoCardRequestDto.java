package nure.pcshop.dto.videocard;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class VideoCardRequestDto {
    @NotBlank
    @Length(max = 255)
    private String graphicChip;
    @NotNull
    @Positive
    private int memory;
    @NotNull
    @Positive
    private int bitSize;
    @NotNull
    @Positive
    private int minCapacity;
    @NotNull
    @Positive
    private Float length;
}
