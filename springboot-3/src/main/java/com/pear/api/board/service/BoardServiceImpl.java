package com.pear.api.board.service;

import com.pear.api.board.model.Board;
import com.pear.api.board.model.BoardDto;
import com.pear.api.board.repository.BoardRepository;
import com.pear.api.common.component.Messenger;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
    private final BoardRepository repository;

    @Transactional
    @Override
    public Messenger save(BoardDto dto) {
        Board ent = repository.save(dtoToEntity(dto));
        System.out.println(" ============ BoardServiceImpl save instanceof =========== ");
        System.out.println((ent instanceof Board) ? "SUCCESS" : "FAILURE");
        return Messenger.builder()
                .message((ent instanceof Board) ? "SUCCESS" : "FAILURE")
                .build();
    }

    @Transactional
    @Override
    public Messenger deleteById(Long id) {
        repository.deleteById(id);
        return new Messenger();
    }

    @Override
    public Messenger modify(BoardDto dto) {
        Optional<Board> optionalBoard = repository.findById(dto.getId());
        if(optionalBoard.isPresent()){
            Board board = optionalBoard.get();
            Board modifyBoard = board.toBuilder()
                    .title(dto.getTitle())
                    .description(dto.getDescription())
                    .build();
            repository.save(modifyBoard);

            return Messenger.builder()
                    .message("SUCCESS")
                    .build();
        }else {
            return Messenger.builder()
                    .message("FAIL")
                    .build();

        }


    }

    @Override
    public List<BoardDto> findAll() {
        return repository.findAll().stream().map(i -> entityToDto(i)).toList();
    }

    @Override
    public Optional<BoardDto> findById(Long id) {
//        return Optional.of(entityToDto(repository.findById(id)));
        return null;
    }

    @Override
    public Messenger count() {
        return Messenger.builder()
                .message(repository.count() + "")
                .build();
    }

    @Override
    public boolean existsById(Long id) {
        return repository.existsById(id);
    }
}