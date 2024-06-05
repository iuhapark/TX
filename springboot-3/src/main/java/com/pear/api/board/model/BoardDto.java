package com.pear.api.board.model;

import com.pear.api.post.model.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Component
@Data
@Builder(toBuilder = true)
public class BoardDto {
    private Long id;
    private String title;
    private String description;
    private String regDate;
    private String modDate;
    private List<Post> posts;
}
