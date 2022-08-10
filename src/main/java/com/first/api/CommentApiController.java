package com.first.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.first.dto.CommentDto;
import com.first.service.CommentService;

@RestController
public class CommentApiController {

		@Autowired
		private CommentService commentService;

		//댓글 목록 조회
		@GetMapping("/api/article/{id}/comments")
		private ResponseEntity<List<CommentDto>> comments(@PathVariable Long id) {
			List<CommentDto> dtos = this.commentService.comments(id);

			return ResponseEntity.status(HttpStatus.OK).body(dtos);
		}

		//댓글 생성
		@PostMapping("/api/article/{articleId}/comments")
		private ResponseEntity<CommentDto> create(@PathVariable Long articleId, @RequestBody CommentDto dto) {
			CommentDto createDto = this.commentService.create(articleId, dto);
			return ResponseEntity.status(HttpStatus.OK).body(createDto);
		}

		//댓글 수정
		@PatchMapping("/api/article/comments/{id}")
		private ResponseEntity<CommentDto> update(@PathVariable Long id, @RequestBody CommentDto dto) {
			CommentDto updtaeDto = this.commentService.update(id, dto);
			return ResponseEntity.status(HttpStatus.OK).body(updtaeDto);
		}

		//댓글 삭제
		@DeleteMapping("/api/article/comments/{id}")
		private ResponseEntity<CommentDto> update(@PathVariable Long id) {
			CommentDto deleteDto = this.commentService.delete(id);
			return ResponseEntity.status(HttpStatus.OK).body(deleteDto);
		}
}
