---
title: pre-commit 설정
date: 2025-01-05 23:51
tags:
  - environment
  - langchain
---

Created at : 2025-01-05 23:51  
Auther: Soo.Y  

----
### 📝메모 

#### pre-commit 이란?
pre-commit은 Git에서 커밋을 실행하기 전에 특정 스크립트를 자동으로 실행하도록 설정할 수 있는 도구입니다. 이 도구를 사용하면 코딩 스타일과 코드 품질을 사전에 검증하여 팀원 간 코드 규칙을 일관성 있게 유지할 수 있습니다.
github : [pre-commit github](https://github.com/pre-commit/pre-commit)

#### pre-commit 주요 기능
- **코드 품질 보장**: 코드 스타일 오류와 간단한 버그를 미리 잡아냄
- **시간 절약**: 코드 리뷰 단계에서 발생하는 수정 작업을 줄여줌
- **협업 개선**: 코드 규칙 준수가 자동화되므로 팀원 간의 코드 충돌 최소화

#### pre-commit install 
pip 또는 poetry로 간단하게 pre-commit을 설치할 수 있다.

```python
poetry add pre-commit
# or pip install pre-commit
```

pre-commit 설정파일을 아래와 같이 기본 설정으로 먼저 생성합니다.
```python
pre-commit sample-config > .pre-commit-config.yaml
```

여기서는 Black 포맷팅으로 설정하는 내용을 추가합니다.
```vim
repos:
-   repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v3.2.0
    hooks:
    -   id: trailing-whitespace
    -   id: end-of-file-fixer
    -   id: check-yaml
    -   id: check-added-large-files
-   repo: https://github.com/psf/black
    rev: stable
    hooks:
    -   id: black
```

#### pre-commit 설치 및 실행
위에서 설정한 파일을 기준으로 pre-commit을 설치합니다. `pre-commit autoupdate`를 사용해서 `.pre-commit-config.yaml`파일에 작성된 버전을 업데이트 해줍니다. 예를 들어 black은 stable이 24.10.0으로 업데이트 되었고 pre-commit은 5.0.0으로 업데이트해서 설정파일이 새롭게 작성된다.
```python
pre-commit autoupdate # 설정된 파일을 기준으로 버전 업데이트
pre-commit install # 설치
pre-commit run --all-files # 실행
```

----
### 📜출처(참고 문헌)  


----
### 🔗연결 문서


