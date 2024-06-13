package nure.pcshop.service.image;

import lombok.RequiredArgsConstructor;
import nure.pcshop.dto.product.LaptopRequestDto;
import nure.pcshop.model.Image;
import nure.pcshop.repository.ImageRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {
    private final ImageRepository imageRepository;

    @Override
    public List<Image> saveImageList(LaptopRequestDto requestDto) {
        if (requestDto.getImagesFiles() == null) {
            return null;
        }
        List<Image> images = new ArrayList<>();
        for (MultipartFile file : requestDto.getImagesFiles()) {
            try {
                String title = requestDto.getName();
                String data = Base64.getEncoder().encodeToString(file.getBytes());
                Image existingImage = imageRepository.findByData(data);
                if (existingImage != null) {
                    images.add(existingImage);
                } else {
                    Image image = new Image();
                    image.setTitle(title);
                    image.setData(data);
                    images.add(imageRepository.save(image));
                }
            } catch (IOException e) {
                throw new RuntimeException("Помилка зберігання зображення", e);
            }
        }
        return images;
    }
}
