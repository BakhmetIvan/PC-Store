package nure.pcshop.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Getter
@Setter
@SQLDelete(sql = "UPDATE video_cards SET is_deleted = TRUE WHERE id = ?")
@SQLRestriction(value = "is_deleted = FALSE")
@Table(name = "video_cards")
public class VideoCard extends Product {
    @Column(nullable = false)
    private String graphicChip;
    @Column(nullable = false)
    private int memory;
    @Column(nullable = false)
    private int bitSize;
    @Column(nullable = false)
    private int minCapacity;
    @Column(nullable = false)
    private Float length;
}
