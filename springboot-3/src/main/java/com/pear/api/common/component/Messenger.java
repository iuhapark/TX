package com.pear.api.common.component;

import lombok.*;
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
