package nure.pcshop.dto.product;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import org.hibernate.validator.constraints.Length;
import org.springframework.web.multipart.MultipartFile;
import java.math.BigDecimal;
import java.util.List;

@Data
public class LaptopRequestDto {
    @NotBlank
    @Length(max = 255)
    private String name;
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
    @NotNull
    private Float diagonal;
    @NotNull
    private String screenType;
    @NotNull
    private int refreshRate;
    @NotNull
    private int resolution;
    @NotBlank
    @Length(max = 255)
    private String processor;
    @NotBlank
    @Length(max = 255)
    private String operationSystem;
    @NotNull
    private int ramMemory;
    @NotBlank
    @Length(max = 255)
    private String ramType;
    @NotNull
    private int ramSlotAmount;
    @NotBlank
    @Length(max = 255)
    private String diskType;
    @NotNull
    private int storage;
    @NotBlank
    @Length(max = 255)
    private String gpu;
    @NotNull
    private int gpuMemory;
    @NotNull
    private int batteryCapacity;
    private List<MultipartFile> imagesFiles;
}
