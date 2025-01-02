---
title: jupyter notebook을 markdown 형식으로 변환하기
date: 2025-01-03 05:42
tags:
  - python
  - langchain
---

Created at : 2025-01-03 05:42  
Auther: Soo.Y  

----
### 📝메모 

### jpyter notebook(.ipynb) to markdown(.md) 변환

ipynb 파일을 md 파일로 변환하는 대표적인 방법으로는 `nbconvert`를 사용하여 변환할 수 있다. 

#### 설치하기
poetry 환경 또는 pip install를 이용하여 `nbconvert`를 설치한다. 
`poetry add nbconvert` or `pip install nbconvert`

#### 사용법
사용법은 아래와 같이 `--to` 다음에 변환하고자 하는 파일 형식을 입력해주면 된다. 여기서는 markdown을 입력해서 md 형식으로 변환을 했다.
`jupyter nbconvert --to markdown filename.ipynb`

만약 다수의 파일을 동시에 변환하고자 한다면 아래와 같이 사용하면 된다.

`jupyter nbconvert --to markdown *.ipynb`

#### 출력물
파일은 주피터 파일 이름과 동일한 파일로 생성된다.

----
### 📜출처(참고 문헌)  


----
### 🔗연결 문서


