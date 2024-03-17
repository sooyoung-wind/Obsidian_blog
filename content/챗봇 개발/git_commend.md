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

|            명령어             |                      설명                      |
|:-----------------------------:|:----------------------------------------------:|
|            branch             |                                                |
|     `git checkout <name>`     |             (로컬) 브랜치 이동하기             |
|      `git branch <name>`      |             (로컬) 브랜치 생성하기             |
|    `git branch -d <name>`     |             (로컬) 브랜치 삭제하기             |
|        `git branch -v`        |             (로컬) 브랜치 조회하기             |
|        `git branch -a`        | (로컬) 삭제된 브랜치를 포함해서 전체 조회하기  |
|        `git branch -r`        |      (원격) 원격 저장소의 브랜치 조회하기      |
| `git checkout -b <new> <old>` |  (로컬) old 브랜치에서 new 브랜치를 생성하기   |
|                               |                                                |
|         Add(Staging)          |                                                |
|     `git add <file name>`     |       (로컬) staging 안된 파일 등록하기        |
|    `git reset <file name>`    |        (로컬) staging 된 파일 취소하기         |
|                               |                                                |
|            Commit             |                                                |
|         `git commit`          |               (로컬) commi 하기                |
|     `git commit --amend`      |             (로컬) 메세지 수정하기             |
|                               |                                                |
|             Push              |                                                |
|   `git push origin <name>`    | (로컬) 로컬 저장소에서 원격 저장소로 push 하기 |
|                               |                                                |
|                               |                                                |


# 관련 문서


