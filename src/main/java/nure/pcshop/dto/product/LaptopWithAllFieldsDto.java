package nure.pcshop.dto.product;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class LaptopWithAllFieldsDto {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String brandName;
    private String country;
    private int warrantyPeriod;
    private Float diagonal;
    private String screenType;
    private int refreshRate;
    private int resolution;
    private String processor;
    private String operationSystem;
    private int ramMemory;
    private String ramType;
    private int ramSlotAmount;
    private String diskType;
    private int storage;
    private String gpu;
    private int gpuMemory;
    private int batteryCapacity;
    private Float averageRating;
    private int amount;
}
