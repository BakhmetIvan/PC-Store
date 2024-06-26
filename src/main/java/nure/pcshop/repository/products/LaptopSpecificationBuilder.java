package nure.pcshop.repository.products;

import lombok.RequiredArgsConstructor;
import nure.pcshop.dto.product.LaptopSearchParametersDto;
import nure.pcshop.model.Laptop;
import nure.pcshop.repository.specification.GenericSpecificationProvider;
import nure.pcshop.repository.specification.SpecificationBuilder;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LaptopSpecificationBuilder implements SpecificationBuilder<Laptop> {
    private final GenericSpecificationProvider<Laptop> specificationProvider;

    @Override
    public Specification<Laptop> build(LaptopSearchParametersDto searchParameters) {
        Specification<Laptop> specification = Specification.where(null);
        if (searchParameters.getNames() != null && searchParameters.getNames().length > 0) {
            specification = specification.and(specificationProvider.getSpecification("name", searchParameters.getNames()));
        }
        if (searchParameters.getPrices() != null && searchParameters.getPrices().length == 2) {
            specification = specification.and(specificationProvider.getSpecification("price", searchParameters.getPrices()));
        }
        if (searchParameters.getBrandNames() != null && searchParameters.getBrandNames().length > 0) {
            specification = specification.and(specificationProvider.getSpecification("brandName", searchParameters.getBrandNames()));
        }
        if (searchParameters.getCountries() != null && searchParameters.getCountries().length > 0) {
            specification = specification.and(specificationProvider.getSpecification("country", searchParameters.getCountries()));
        }
        if (searchParameters.getDiagonals() != null && searchParameters.getDiagonals().length > 0) {
            specification = specification.and(specificationProvider.getSpecification("diagonal", searchParameters.getDiagonals()));
        }
        if (searchParameters.getScreenTypes() != null && searchParameters.getScreenTypes().length > 0) {
            specification = specification.and(specificationProvider.getSpecification("screenType", searchParameters.getScreenTypes()));
        }
        if (searchParameters.getRefreshRates() != null && searchParameters.getRefreshRates().length > 0) {
            specification = specification.and(specificationProvider.getSpecification("refreshRate", searchParameters.getRefreshRates()));
        }
        if (searchParameters.getResolutions() != null && searchParameters.getResolutions().length > 0) {
            specification = specification.and(specificationProvider.getSpecification("resolution", searchParameters.getResolutions()));
        }
        if (searchParameters.getProcessors() != null && searchParameters.getProcessors().length > 0) {
            specification = specification.and(specificationProvider.getSpecification("processor", searchParameters.getProcessors()));
        }
        if (searchParameters.getOperationSystems() != null && searchParameters.getOperationSystems().length > 0) {
            specification = specification.and(specificationProvider.getSpecification("operationSystem", searchParameters.getOperationSystems()));
        }
        if (searchParameters.getRamMemories() != null && searchParameters.getRamMemories().length > 0) {
            specification = specification.and(specificationProvider.getSpecification("ramMemory", searchParameters.getRamMemories()));
        }
        if (searchParameters.getDiskTypes() != null && searchParameters.getDiskTypes().length > 0) {
            specification = specification.and(specificationProvider.getSpecification("diskType", searchParameters.getDiskTypes()));
        }
        if (searchParameters.getStorages() != null && searchParameters.getStorages().length > 0) {
            specification = specification.and(specificationProvider.getSpecification("storage", searchParameters.getStorages()));
        }
        if (searchParameters.getGpus() != null && searchParameters.getGpus().length > 0) {
            specification = specification.and(specificationProvider.getSpecification("gpu", searchParameters.getGpus()));
        }
        if (searchParameters.getGpuMemories() != null && searchParameters.getGpuMemories().length > 0) {
            specification = specification.and(specificationProvider.getSpecification("gpuMemory", searchParameters.getGpuMemories()));
        }
        if (searchParameters.getBatteryCapacities() != null && searchParameters.getBatteryCapacities().length > 0) {
            specification = specification.and(specificationProvider.getSpecification("batteryCapacity", searchParameters.getBatteryCapacities()));
        }
        return specification;
    }
}
