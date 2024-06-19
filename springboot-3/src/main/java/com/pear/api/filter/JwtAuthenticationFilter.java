//package com.pear.api.filter;
//
//import com.pear.api.common.component.security.JwtProvider;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Component;
//import org.springframework.util.StringUtils;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//
//@Component
//@RequiredArgsConstructor
//public class JwtAuthenticationFilter extends OncePerRequestFilter {
//    private final JwtProvider jwtProvider;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//
//        try {
//            String token = parseBearerToken(request);
//            if (token == null) {
//                filterChain.doFilter(request, response);
//                return;
//            }
////            String userId = jwtProvider.validate(token);
////            if (userId == null) {
////                filterChain.doFilter(request, response);
////                return;
////            }
//        } catch (Exception exception) { //Exception : 모든 예외의 최상위 클래스 (모든 예외를 처리하기 위한 catch문)
//            exception.printStackTrace();
//        }
//        filterChain.doFilter(request, response); //doFilter : 다음 필터로 이동
//    }
//
//    private String parseBearerToken(HttpServletRequest request) {
//        String authorization = request.getHeader("Authorization");
//        boolean hasAuthorization = StringUtils.hasText(authorization); //hasText : 문자열이 null이 아니고 길이가 0보다 크고 공백이 아닌지 확인
//        if (!hasAuthorization) return null;
//
//        boolean isBearer = authorization.startsWith("Bearer "); //startsWith : 문자열이 특정 문자열로 시작하는지 확인
//        if (!isBearer) return null;
//
//        String token = authorization.substring(7); //substring : 문자열의 일부를 추출
//        return token;
//
//    }
//}
