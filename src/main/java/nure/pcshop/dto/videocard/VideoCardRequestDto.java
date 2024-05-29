package nure.pcshop.dto.videocard;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import org.hibernate.validator.constraints.Length;
import java.math.BigDecimal;

@Data
public class VideoCardRequestDto {
    @NotBlank
    @Length(max = 255)
    private String name;
    @Length(max = 500)
    private String description;
    @NotNull
    @Positive
    private BigDecimal price;
    @Length(max = 255)
    private String brandName;
    @Length(max = 255)
    private String country;
    @NotNull
    private int warrantyPeriod;
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
    @NotNull
    @Positive
    private int amount;
}
