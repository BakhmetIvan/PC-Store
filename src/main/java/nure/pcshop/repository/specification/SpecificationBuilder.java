package nure.pcshop.repository.specification;

import nure.pcshop.dto.product.LaptopSearchParametersDto;
import org.springframework.data.jpa.domain.Specification;

public interface SpecificationBuilder<T> {
    Specification<T> build(LaptopSearchParametersDto searchParametersDto);
}
