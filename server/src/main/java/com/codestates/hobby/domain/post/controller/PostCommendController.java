package com.codestates.hobby.domain.post.controller;

import com.codestates.hobby.domain.post.dto.PostDto;
import com.codestates.hobby.domain.post.entity.Post;
import com.codestates.hobby.domain.post.mapper.PostMapper;
import com.codestates.hobby.domain.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostCommendController {
    private final PostService postService;

    @PostMapping()
    public ResponseEntity<?> post(@RequestBody PostDto.Post postDto,
                                  @AuthenticationPrincipal Long memberId) {
        postDto.setMemberId(memberId);
        Post post = postService.post(postDto);
        return new ResponseEntity<>(post, HttpStatus.CREATED);
    }

    @PatchMapping("/{post-id}")
    public ResponseEntity<?> patch(@RequestBody PostDto.Patch patchDto,
                                   @PathVariable("post-id") long postId,
                                   @AuthenticationPrincipal Long memberId) {
        if (patchDto.getMemberId().equals(memberId)){

        }
        patchDto.setProperties(memberId, postId);

        Post post = postService.update(patchDto);
        return new ResponseEntity<>(post,HttpStatus.OK);
    }

    @DeleteMapping("/{post-id}")
    public ResponseEntity<?> delete(@PathVariable("post-id") long postId,
                                    @AuthenticationPrincipal Long memberId) {
        postService.delete(postId,memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
