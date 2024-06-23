package nure.pcshop.dto.product;

import lombok.Data;

@Data
public class LaptopSearchParametersDto {
    private String[] names;
    private String[] prices;
    private String[] brandNames;
    private String[] countries;
    private String[] diagonals;
    private String[] screenTypes;
    private String[] refreshRates;
    private String[] resolutions;
    private String[] processors;
    private String[] operationSystems;
    private String[] ramMemories;
    private String[] diskTypes;
    private String[] storages;
    private String[] gpus;
    private String[] gpuMemories;
    private String[] batteryCapacities;
}
