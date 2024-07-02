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

|                        명령어                        |                        설명                         |
| :-----------------------------------------------: | :-----------------------------------------------: |
|                      branch                       |                                                   |
|               `git checkout <name>`               |                   (로컬) 브랜치 이동하기                   |
|                `git branch <name>`                |                   (로컬) 브랜치 생성하기                   |
|              `git branch -d <name>`               |                   (로컬) 브랜치 삭제하기                   |
|                  `git branch -v`                  |                   (로컬) 브랜치 조회하기                   |
|                  `git branch -a`                  |            (로컬) 삭제된 브랜치를 포함해서 전체 조회하기             |
|                  `git branch -r`                  |               (원격) 원격 저장소의 브랜치 조회하기               |
|           `git checkout -b <new> <old>`           |           (로컬) old 브랜치에서 new 브랜치를 생성하기            |
|                                                   |                                                   |
|         `git checkout -t <origin/branch>`         |               원격 저장소에서 branch 가져오기                |
|                                                   |                                                   |
|                   Add(Staging)                    |                                                   |
|               `git add <file name>`               |              (로컬) staging 안된 파일 등록하기              |
|              `git reset <file name>`              |          (로컬) staging 및 commit 된 파일 취소하기          |
|                                                   |                                                   |
|                      Commit                       |                                                   |
|                   `git commit`                    |                   (로컬) commi 하기                   |
|               `git commit --amend`                |                   (로컬) 메세지 수정하기                   |
|                                                   |                                                   |
|                       Push                        |                                                   |
|             `git push origin <name>`              |           (로컬) 로컬 저장소에서 원격 저장소로 push 하기           |
|                                                   |                                                   |
|                      Archive                      |                                                   |
| `git archive --format=zip <branch> -o <name.zip>` | (로컬) `.git` 폴더를 제외하고 `<barnch>`해당하는 소스들을 압축하는 명령어 |
|                                                   |                                                   |
|                      Rebase                       |                                                   |
|           `git rebase -i <commit num>`            |                 (로컬) 해당 커밋을 수정하기                  |
|                                                   |                                                   |
|            `git fetch origin --prune`             |               원격 및 로컬에서 삭제한 브랜치 지우기               |

###### Github(원격)에 올라 온 PR(Pull Request) 내용을 로컬에 적용하기
`git fetch origin pull/13/head:<new branch name>`   
- 13번 PR을 new branch name으로 받는 명령어입니다. 
- `git checkout <new branch name>`으로 변경해서 코드를 수정하면 된다고 합니다. (Test 필요)

`git branch -r`로 원격 저장소의 브랜치를 조회한다.    
`git checkout -b <new branch name> <origin/PR branch>`으로 PR branch를 새로운 브랜치 이름으로 가져온다.
이제부터 수정하고 `git add`부터 `git commit & push`를 찬찬히 진행하면 된다고 한다. (Test 필요)  

# 관련 문서


