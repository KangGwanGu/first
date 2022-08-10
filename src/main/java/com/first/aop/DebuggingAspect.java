package com.first.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Aspect
@Component
@Slf4j
public class DebuggingAspect {

	@Pointcut( "execution(* com.first.api.CommentApiController.create(..))")
	private void cut() {}

	@Before("cut()")
	public void loggingArgs(JoinPoint joinPoint) {
		//입력값 가져오기
		Object[] args = joinPoint.getArgs();

		//클래스명
		String className = joinPoint.getTarget().getClass().getSimpleName();

		//메소드명
		String methodName = joinPoint.getSignature().getName();

		//입력값 로깅
		for (Object object : args) {
			log.info("{}#{}의 입력값 : {}", className, methodName, object);
		}
	}

	@AfterReturning(value = "cut()", returning = "returnObj")
	public void loggingReturnValue(JoinPoint joinPoint, Object returnObj) {
		//클래스명
		String className = joinPoint.getTarget().getClass().getSimpleName();

		//메소드명
		String methodName = joinPoint.getSignature().getName();

		log.info("{}#{}의 반환값 : {}", className, methodName, returnObj);
	}

}
