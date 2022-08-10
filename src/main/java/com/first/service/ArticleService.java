package com.first.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.first.controller.repository.ArticleRepository;
import com.first.dto.ArticleDto;
import com.first.entity.Article;

@Service
public class ArticleService {
	@Autowired
	private ArticleRepository articleRepository;

	public List<Article> index() {
		return this.articleRepository.findAll();
	}

	public Article index(Long id) {
		return this.articleRepository.findById(id).orElse(null);
	}
	
	public Article create(@RequestBody ArticleDto article) {
		return this.articleRepository.save(article.toEntity());
	}
	
	public ResponseEntity<Article> update(Long id, ArticleDto article) {
		Article updated = this.articleRepository.save(article.toEntity());
		return ResponseEntity.status(HttpStatus.OK).body(updated);
	}
	
	public ResponseEntity<Article> delete(Long id) {
		this.articleRepository.deleteById(id);
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
}
