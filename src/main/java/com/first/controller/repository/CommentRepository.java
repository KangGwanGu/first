package com.first.controller.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.first.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long>{
	@Query(value = "SELECT * FROM COMMENT WHERE ARTICLE_ID = :articleId", nativeQuery = true)
	List<Comment> findByArticleId(@Param("articleId") Long id);
	
	@Query(name = "Comment.findByNickname", nativeQuery = true)
	List<Comment> findByNickname(String nickname);
}
