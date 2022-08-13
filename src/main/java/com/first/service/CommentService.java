package com.first.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.first.controller.repository.ArticleRepository;
import com.first.controller.repository.CommentRepository;
import com.first.dto.CommentDto;
import com.first.entity.Article;
import com.first.entity.Comment;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CommentService {

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private ArticleRepository articleRepository;

	public List<CommentDto> comments(Long id) {
		// 조회
		List<Comment> list = this.commentRepository.findByArticleId(id);

		val dtos = new ArrayList<CommentDto>();
		list.forEach(c -> dtos.add(CommentDto.createCommentDto(c)));

		System.out.println("111111111111111111111");
		System.out.println("2222222222222222222222");
		System.out.println("33333333333333333333");



		System.out.println("2222222222222222222222");




		return dtos;
	}

	@Transactional
	public CommentDto create(Long articleId, CommentDto dto) {

		// 조회
		Article article = articleRepository.findById(articleId).orElseThrow(() ->new IllegalArgumentException("댓글 생성 실패! 대상 게시글이 없습니다"));

		Comment comment = dto.toEntity(dto, article);

		Comment created = this.commentRepository.save(comment);

		log.info(article.toString());

		return CommentDto.createCommentDto(created);
	}

	@Transactional
	public CommentDto update(Long id, CommentDto dto) {
		// 조회
		Comment target = commentRepository.findById(id).orElseThrow(() ->new IllegalArgumentException("댓글 수정 실패! 대상 게시글이 없습니다"));

		target.patch(dto);

		Comment updated = this.commentRepository.save(target);

		return CommentDto.createCommentDto(updated);
	}

	@Transactional
	public CommentDto delete(Long id) {
		// 조회
		Comment target = commentRepository.findById(id).orElseThrow(() ->new IllegalArgumentException("댓글 삭제 실패! 대상 게시글이 없습니다"));

		this.commentRepository.delete(target);

		return CommentDto.createCommentDto(target);
	}


}
