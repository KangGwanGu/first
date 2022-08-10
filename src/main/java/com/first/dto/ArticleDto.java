package com.first.dto;

import com.first.entity.Article;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class ArticleDto {
	private Long id;
	private String title;
	private String content;
	
	public Article toEntity() {
		return new Article(id, title, content);
	}
}
