package com.pear.api.common.component;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@NoArgsConstructor
@AllArgsConstructor
@Component
@Getter
@Builder
public class Messenger {
    private String message;
    private String accessToken;
    private String refreshToken;
    private Long id;
}
