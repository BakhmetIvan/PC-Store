package nure.pcshop.service.products;

import nure.pcshop.dto.product.LaptopPageDto;
import nure.pcshop.dto.product.LaptopRequestDto;
import nure.pcshop.dto.product.LaptopResponseDto;
import nure.pcshop.dto.product.LaptopWithAllFieldsDto;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface ProductService {
    LaptopResponseDto save(LaptopRequestDto requestDto);

    List<LaptopResponseDto> findAll(Pageable pageable);

    LaptopPageDto findById(Long id, Pageable pageable);

    List<LaptopResponseDto> findAllByName(String name, Pageable pageable);

    LaptopWithAllFieldsDto findCharacteristicById(Long id);

    LaptopResponseDto update(Long id, LaptopRequestDto requestDto);

    void delete(Long id);
}
