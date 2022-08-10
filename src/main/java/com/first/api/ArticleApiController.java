package com.first.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.first.dto.ArticleDto;
import com.first.entity.Article;
import com.first.service.ArticleService;

import lombok.extern.slf4j.Slf4j;

@RestController
public class ArticleApiController {

	@Autowired
	private ArticleService articleservice;

	//get
	@GetMapping("/api/article")
	public List<Article> index() {
		return articleservice.index();
	}

	//get
	@GetMapping("/api/article/{id}")
	public Article index(@PathVariable Long id) {
		return this.articleservice.index(id);
	}

	//post
	@PostMapping("/api/article")
	public Article create(@RequestBody ArticleDto article) {
		return this.articleservice.create(article);
	}

	//patch
	@PatchMapping("/api/article/{id}")
	public ResponseEntity<Article> update(@PathVariable Long id, @RequestBody ArticleDto article) {
		return this.articleservice.update(id, article);
	}

	//delete
	@DeleteMapping("/api/article/{id}")
	public void delete(@PathVariable Long id) {
		this.articleservice.delete(id);
	}
}
