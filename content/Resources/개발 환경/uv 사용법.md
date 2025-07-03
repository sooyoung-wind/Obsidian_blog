---
title: uv 사용법
date: 2025-07-04 04:09
tags:
  - environment
  - Solar
---

Created at : 2025-07-04 04:09  
Auther: Soo.Y  

----
### 📝메모 

# uv install

[공식홈페이지](https://docs.astral.sh/uv/getting-started/installation/)를 통해서 사용자의 OS에 맞추어서 설치를 하면 된다.

# uv 사용법

## python 버전 관리

- `uv python list` : 설치 가능한 python 버전 리스트를 보여준다.(이미 설치된 버전도 보여준다.)
- `uv python install 3.11` : 3.11 버전 python을 설치한다. 
- `uv python dir` : python이 설치되는 경로를 보여준다.
- `uv python find` : 현재 폴더에서 사용할 수 있는 python 실행파일 경로를 보여준다.

## 가상환경 생성
- `uv init [풀더이름]` : 폴더 이름으로 초기화한다. python 버전은 글로벌로 설정된 버을 사용한다.
- `uv venv --python 3.12` : 현재폴더를 기준으로 python 버전에 맞추어서 가상환경을 구축한다.

## 패키지 설치
- `uv pip install [패키지]` : 패키지 설치(pyproject.toml과 uv.lock이 변경되지 않는다.)
- `uv add [패키지]` : 패키지 설치
- `uv remove [패키지]` : 패키지 제거
- `uv pip freeze > requirements.txt` : requirements.txt로 패키지 목록을 저장한다.
- `uv pip install -r requirements.txt` : requirements.txt에 있는 패키지를 설치한다.


----
### 📜출처(참고 문헌)  


----
### 🔗연결 문서


