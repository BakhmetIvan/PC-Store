package nure.pcshop.service.products;

import nure.pcshop.dto.product.LaptopUpdateInfoResponseDto;
import nure.pcshop.dto.product.LaptopPageDto;
import nure.pcshop.dto.product.LaptopRequestDto;
import nure.pcshop.dto.product.LaptopResponseDto;
import nure.pcshop.dto.product.LaptopSearchParametersDto;
import nure.pcshop.dto.product.LaptopWithAllFieldsDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface ProductService {
    LaptopResponseDto save(LaptopRequestDto requestDto);

    Page<LaptopResponseDto> findAll(Pageable pageable);

    LaptopPageDto findById(Long id, Pageable pageable);

    Page<LaptopResponseDto> findAllByName(String name, Pageable pageable);

    LaptopWithAllFieldsDto findCharacteristicById(Long id);

    LaptopResponseDto update(Long id, LaptopRequestDto requestDto);

    Page<LaptopResponseDto>search(LaptopSearchParametersDto searchParametersDto, Pageable pageable);

    List<LaptopResponseDto> findPopularLaptops(Pageable pageable);

    LaptopUpdateInfoResponseDto findInfoForUpdateById(Long id);

    void delete(Long id);
}
