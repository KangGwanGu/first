package com.first.controller.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;

import com.first.entity.Article;

public interface ArticleRepository extends JpaRepository<Article, Long>{
	@Override
	ArrayList<Article> findAll();
}
