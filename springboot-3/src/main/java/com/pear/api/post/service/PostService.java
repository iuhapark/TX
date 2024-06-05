package com.pear.api.post.service;


import com.pear.api.common.service.CommandService;
import com.pear.api.common.service.QueryService;
import com.pear.api.post.model.Post;
import com.pear.api.post.model.PostDto;

import java.util.List;

public interface PostService extends CommandService<PostDto>, QueryService<PostDto> { //인터페이스 확장, 다중 상속 허용

    default Post dtoToEntity(PostDto dto) {
        return Post.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .content(dto.getContent())
                .build();
    }

    default PostDto entityToDto(Post post) {
        return PostDto.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .build();
    }

    List<PostDto> findAllByBoardId(Long id);

    List<PostDto> getPostsByBoardId(Long boardId);

}
