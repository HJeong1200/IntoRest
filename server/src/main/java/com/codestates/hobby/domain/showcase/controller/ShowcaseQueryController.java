package com.codestates.hobby.domain.showcase.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.codestates.hobby.domain.member.entity.Member;
import com.codestates.hobby.domain.showcase.dto.ShowcaseDto;
import com.codestates.hobby.domain.showcase.entity.Showcase;
import com.codestates.hobby.domain.showcase.mapper.ShowcaseMapper;
import com.codestates.hobby.domain.showcase.service.ShowcaseService;
import com.codestates.hobby.global.config.support.CustomPageRequest;
import com.codestates.hobby.global.dto.MultiResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class ShowcaseQueryController {
	private final ShowcaseService showcaseService;
	private final ShowcaseMapper mapper;

	@GetMapping("/showcases/{showcase-id}")
	public ResponseEntity<?> get(
		@SessionAttribute(required = false) Member loginMember,
		@PathVariable("showcase-id") long showcaseId
	) {
		Showcase showcase = showcaseService.findById(showcaseId);

		ShowcaseDto.Response response = mapper.showcaseToResponse(showcase);
		mapper.setProperties(response, loginMember != null ? loginMember.getId() : null);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/showcases")
	public ResponseEntity<?> getAll(
		@SessionAttribute(required = false) Member loginMember,
		CustomPageRequest pageRequest
	) {
		Page<Showcase> showcases = showcaseService.findAll(pageRequest.to());

		return toResponseEntity(showcases, loginMember);
	}

	@GetMapping("/categories/{category-name}/showcases")
	public ResponseEntity<?> getAllByCategory(
		@SessionAttribute(required = false) Member loginMember,
		@PathVariable("category-name") String category,
		CustomPageRequest pageRequest
	) {
		Page<Showcase> showcases =
			showcaseService.findAllByCategory(category, pageRequest.to());

		return toResponseEntity(showcases, loginMember);
	}

	@GetMapping("/members/{member-id}/showcases")
	public ResponseEntity<?> getAllByMember(
		@SessionAttribute(required = false) Member loginMember,
		@PathVariable("member-id") long memberId,
		CustomPageRequest pageRequest
	) {
		Page<Showcase> showcases =
			showcaseService.findAllByMember(memberId, pageRequest.to());

		return toResponseEntity(showcases, loginMember);
	}

	private ResponseEntity<?> toResponseEntity(Page<Showcase> showcases, Member member) {
		Page<ShowcaseDto.SimpleResponse> responses = showcases.map(showcase -> {
			ShowcaseDto.SimpleResponse response = mapper.showcaseToSimpleResponse(showcase);
			mapper.setProperties(response, member != null ? member.getId() : null);
			return response;
		});

		return new ResponseEntity<>(new MultiResponseDto<>(responses), HttpStatus.OK);
	}
}
