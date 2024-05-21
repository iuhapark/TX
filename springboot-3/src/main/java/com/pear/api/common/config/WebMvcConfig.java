package com.pear.api.common.config;

import com.pear.api.common.component.interceptor.AuthInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;

@Component
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {
    private final AuthInterceptor authInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry){
        LocaleChangeInterceptor interceptor = new LocaleChangeInterceptor();
        interceptor.setParamName("locale");
        registry.addInterceptor(authInterceptor)
//                .addPathPatterns("/api/**")
//                .excludePathPatterns("/api/auth/**")
//                .excludePathPatterns("/api/users/**")
//                .excludePathPatterns("/api/payment/**")
//                .excludePathPatterns("/api/product/**")
//                .excludePathPatterns("/favicon.ico");
                .excludePathPatterns("/**");

        //token 있는지 여부 확인하는 역할
    }
}
