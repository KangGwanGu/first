package com.first.dto;

import com.first.entity.Article;
import com.first.entity.Comment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
	private Long id;
	private String body;
	private String nickname;
	private Long articleId;
	
	public static CommentDto createCommentDto(Comment comment) {
		return new CommentDto(comment.getId(), comment.getBody(), comment.getNackname(), comment.getArticle().getId());
	}
	
	public Comment toEntity(CommentDto dto, Article article) {
		return new Comment(dto.getId(), article, dto.getNickname(), dto.getBody());
	}
}
