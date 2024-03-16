---
title: Git 명령어 정리
date: 2024-03-15 13:46
tags:
  - platform
  - environment
---

Created at : 2024-03-15 13:46  
Auther: Soo.Y  

# Git 명령어 정리

`git checkout <name>`  
- (로컬)브랜치 이동하기  

`git branch <name>`
- (로컬)브랜치 생성하기  
`git branch -d <name>` 
- (로컬)브랜치 삭제하기  

`git branch -v` 
- (로컬)브랜치 조회하기  
`git branch -a` 
- (로컬)삭제된 브랜치를 포함해서 전체 조회하기  
`git branch -r` 
- (원격)원격 저장소의 브랜치 조회하기  

`git checkout -t <branch name (origin 경로 포함해서)>` 
- 원격저장소에서 특정 브랜치 가져오기  
`git checkout -b <new branch name> <from branch name>` 
- `from branch name`으로부터 새로운 branch 생성하는 방법    

`git push origin <my branch name>:<git branch>` 
- `git branch`에 `<my branch name>`으로 commit한 내용 올리기




# 관련 문서


