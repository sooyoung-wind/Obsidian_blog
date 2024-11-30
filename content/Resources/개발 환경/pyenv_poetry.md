---
title: pyenv & poetry
date: 2024-11-30 20:15
tags:
  - environment
  - platform
---

Created at : 2024-11-30 20:15  
Auther: Soo.Y  

----
### 📝메모 

#### 1. Quick start
1. 폴더 만들기
	```python
	mkdir [프로젝트 이름]
	```
2. 개발 폴더 경로
	```python
	cd [프로젝트 이름]
	```
1. pyenv로 python 버전 설정하기 : `pyenv local [버전]`
	1. pyenv 버전이 낮아서 없다면 `pyenv update`
	2. 만약 설치된 버전이 없으면 `pyenv install 3.12`
	```python
	# example
	pyenv local 3.12
	```
	
5. poetry 초기화 `poetry init`
	1. `pyproject.toml` 파일이 생성된다.
	2. python version은 pyenv global 셋팅 값으로 결정되니 다른 버전을 사용할 경우 `pyproject.toml`에서 python 버전을 변경해야 한다.
	```python
	poetry init
	```
6. `poetry env use python` 실행
	1. `poetry env use python`을 실행해서 설정된 python 버전으로 실행되도록 설정한다.
	2. `poetry env info`를 실행해서 원하는 python 버전과 Virtualenv path를 확인한다.
	```python
	poetry env use python
	poetry env info
	```

----
### 📜출처(참고 문헌)  


----
### 🔗연결 문서

[[pyenv_poetry_사용하기]]
