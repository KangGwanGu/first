package com.first;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.first.entity.Article;
import com.first.service.ArticleService;

@SpringBootTest
class FirstApplicationTests {

	@Autowired
	private ArticleService articleService;

	@Test
	void contextLoads() {
		//예상
		Article a = new Article(1L, "111", "111");
		Article b = new Article(1L, "222", "222");
		Article c = new Article(1L, "333", "333");

		List<Article> expected = new ArrayList<Article>(Arrays.asList(a,b,c));

		//실제
		List<Article> articles = this.articleService.index();

		//비교
		assertEquals(expected.toString(), articles.toString());

	}

}
