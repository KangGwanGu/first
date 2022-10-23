package com.first.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.first.controller.repository.ArticleRepository;
import com.first.dto.ArticleDto;
import com.first.dto.CommentDto;
import com.first.entity.Article;
import com.first.entity.Comment;
import com.first.service.CommentService;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class ArticleController {
	
	@Autowired
	private ArticleRepository articleRepository;
	
	@Autowired
	private CommentService commentService;
	
	@GetMapping("/article/new")
	public String edit(Model model) {
		Article article = new Article();
		article.setId(1L);
		article.setTitle("");
		article.setContent("");
		model.addAttribute("article", article);

		return "/article/new";
	}
	
	@PostMapping("/article/create")
	public String create(ArticleDto form) {
		log.info("create : " + form.toString());
		
		Article article = form.toEntity();
		
		Article saved = this.articleRepository.save(article);
		
		return "redirect:/article/" + saved.getId();
	}
	
	@GetMapping("/article/{id}/delete")
	public String delete(@PathVariable Long id, RedirectAttributes ra) {
		log.info("delete : " + id);
		
		this.articleRepository.deleteById(id);
		ra.addFlashAttribute("msg", "삭제가 완료되었습니다");
		
		return "redirect:/article/";
	}
	
	@GetMapping("/article/{id}/edit")
	public String edit(@PathVariable Long id, Model model) {
		Article article = this.articleRepository.findById(id).orElse(null);
		
		log.info("article : " + article.toString());
		model.addAttribute("article", article);

		return "/article/new";
	}
	
	@GetMapping("/article/{id}")
	public String read(@PathVariable Long id, Model model) {
		log.info("id : " + id);
		
		Article article = this.articleRepository.findById(id).orElse(null);
		List<CommentDto> list = this.commentService.comments(id);
		
//		CommentDto commentDto = CommentDto.createCommentDto(comment); 
		
//		List<CommentDto> list = comment.stream().map(c -> CommentDto.createCommentDto(c)).collect(Collectors.toList());
		
		model.addAttribute("article", article);
		model.addAttribute("commentDto", list);
		
		log.info("article : " + article.toString());
		
		return "article/show";
	}
	
	@GetMapping("/article")
	public String readAll(Model model) {
		
		ArrayList<Article> article = this.articleRepository.findAll();
		
		log.info(article.toString());
		
		model.addAttribute("articleList", article);
		
		return "/article/showAll";
	}


	@GetMapping("/test")
	public String test(Model model) {


		return "/test.html";
	}
}
