package com.pear.api.board.service;

import com.pear.api.board.model.Board;
import com.pear.api.board.model.BoardDto;
import com.pear.api.common.service.CommandService;
import com.pear.api.common.service.QueryService;

public interface BoardService extends CommandService<BoardDto>, QueryService<BoardDto> {

    default Board dtoToEntity(BoardDto dto) {
        return Board.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .build();
    }

    default BoardDto entityToDto(Board board) {
        return BoardDto.builder()
                .id(board.getId())
                .title(board.getTitle())
                .description(board.getDescription())
                .build();
    }


}
