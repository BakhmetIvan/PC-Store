package nure.pcshop.config;

import nure.pcshop.model.Laptop;
import nure.pcshop.repository.specification.GenericSpecificationProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpecificationConfig {
    @Bean
    public GenericSpecificationProvider<Laptop> laptopSpecificationProvider() {
        GenericSpecificationProvider<Laptop> provider = new GenericSpecificationProvider<>();
        provider.addSpecification("name", params -> provider.createNameSpecification("name", params));
        provider.addSpecification("price", params -> provider.createRangeSpecification("price", params));
        provider.addSpecification("brandName", params -> provider.createInSpecification("brandName", params));
        provider.addSpecification("country", params -> provider.createInSpecification("country", params));
        provider.addSpecification("diagonal", params -> provider.createInSpecification("diagonal", params));
        provider.addSpecification("screenType", params -> provider.createInSpecification("screenType", params));
        provider.addSpecification("refreshRate", params -> provider.createInSpecification("refreshRate", params));
        provider.addSpecification("resolution", params -> provider.createInSpecification("resolution", params));
        provider.addSpecification("processor", params -> provider.createInSpecification("processor", params));
        provider.addSpecification("operationSystem", params -> provider.createInSpecification("operationSystem", params));
        provider.addSpecification("ramMemory", params -> provider.createInSpecification("ramMemory", params));
        provider.addSpecification("diskType", params -> provider.createInSpecification("diskType", params));
        provider.addSpecification("storage", params -> provider.createInSpecification("storage", params));
        provider.addSpecification("gpu", params -> provider.createInSpecification("gpu", params));
        provider.addSpecification("gpuMemory", params -> provider.createInSpecification("gpuMemory", params));
        provider.addSpecification("batteryCapacity", params -> provider.createInSpecification("batteryCapacity", params));
        return provider;
    }
}