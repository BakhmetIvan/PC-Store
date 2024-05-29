package nure.pcshop.service.image.impl;

import lombok.RequiredArgsConstructor;
import nure.pcshop.dto.image.ImageRequestDto;
import nure.pcshop.dto.image.ImageResponseDto;
import nure.pcshop.exception.EntityNotFoundException;
import nure.pcshop.mapper.image.ImageMapper;
import nure.pcshop.model.Image;
import nure.pcshop.repository.image.ImageRepository;
import nure.pcshop.service.image.ImageService;
import org.springframework.stereotype.Service;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {
    private final ImageRepository imageRepository;
    private final ImageMapper imageMapper;

    public void save(ImageRequestDto requestDto) {
        Image image = imageMapper.toModel(requestDto);
        imageRepository.save(image);
    }
    @Override
    public ImageResponseDto findImageByProductId(Long productId) {
        Image image = imageRepository.findByProductId(productId).orElseThrow(
                () -> new EntityNotFoundException("Немае фото для товара з id: " + productId)
        );
        return imageMapper.toDto(image, getBytesFromImage(image.getPathToImage()));
    }

    @Override
    public List<ImageResponseDto> findAllImagesByProductId(Long productId) {
        return imageRepository.findAllByProductId(productId).stream()
                .map(image ->
                        imageMapper.toDto(image, getBytesFromImage(image.getPathToImage()))
                )
                .toList();
    }

    private byte[] getBytesFromImage(String imagePath) {
        try {
            File imageFile = new File(imagePath);
            BufferedImage bufferedImage = ImageIO.read(imageFile);

            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            ImageIO.write(bufferedImage, "jpg", byteArrayOutputStream);

            return byteArrayOutputStream.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Неможливо прочитати url: " + imagePath);
        }
    }
}
