---
title: Python 개발을 위한 기본 설정 및 VScode extension 추천
date: 2024-04-10 13:27
tags:
  - platform
  - python
  - environment
---

Created at : 2024-04-10 13:27  
Auther: Soo.Y  

최근에 챗봇 프로젝트를 함께 하고 있는 사람들로부터 extension에 대해서 정리해 달라는 요청이 있어서 저도 어떤 extension을 사용하고 있는지 정리할 겸 작성하고자 합니다. 나는 개발자 출신은 아니지만, 본의 아니게 석사 때부터 리눅스 서버를 관리하게 되어서 Atom, notepad, spyder, vim 등 다양한 편집기에 대해서 스스로 고민을 많이 해본 적이 있었다. 

AI 6기 과정을 받으면서 내가 VScode를 쓰게 된 배경을 설명하면, 처음에는 spyder를 주로 사용했다. R 언어를 사용한 경험이 있어서 R studio의 UI와 동일했고 jypyter와 같이 line by line 실행이 가능했으며, 중간에 print를 사용하지도 않고 현재 실행되고 있는 변수명을 포함해서 타입, 변수 안에 있는 값(dict이면 내부 구조)들을 전부 다 GUI 형태로 확인을 할 수 있어서 사용했었다. 그래서 머리 속으로 상상하면서 코드를 작성하는 방식이 아니라고 코드 한 줄 마다 결과 값을 육안으로 확인하고 원리를 이해하면서 코드를 구현할 수 있는 장점이 있었다. 

Spyder 화면
![[Pasted image 20240411014641.png]]

그런데 spyder의 최대 단점이 확장 tool들이 존재하지 않았다. 오직 python만을 위한 IDE이고 plot을 보여주는 창도 따로 존재를 했지만, 결국 VScode와 PyCharm에서 고민하다가 VScode를 선택했다.이유는 간단하게도 VScode가 PyCharm보다 가볍고 extension의 매력과 내가 R 언어를 사용하다 보니 다양한 프로그램 언어를 지원하고 있는 VScode를 최종적으로 선택하게 된다. (아무리 생각해도 extension으로 튜닝하는 점이 내 취향 🥰)

# 기본 설정

- VScode의 setting 창은 `ctrl + ,`으로 들어가거나 `File -> Preferences -> Settings`으로 들어갈 수 있다. 
- 또는 `ctrl + shift + p`을 이용한 명령 팔레트를 열어서 `setting`을 검색해서 들어가는 방법도 있다.

## 한국어 패치

처음으로 vscode 편집기를 실행하면 영어로 설정되어 있다. 한국어로 변경을 하고 싶으면 extension에서 Korean이라고 검색하면 아래와 같은 한국어 팩을 찾을 수 있고 설치를 하면 언어가 변경이 된다.

![[Pasted image 20240410133219.png]]

사용법은 `ctrl + shift + p`를 눌러서 명령 팔레트를 불러오고 `display`를 검색해서 `Configure Display Language`를 선택하면 영어 또는 한국어를 선택하는 창이 나온다. 여기서 원하는 언어를 선택하면 편집기가 재부팅 되면서 적용이 된다.

![[Pasted image 20240410133753.png]]

## 글꼴 설정(필수)

지금 진행하고 있는 프로젝트에서 같이 활동하는 사람들은 젊어서 그런지 폰트 사이즈가 상당히 작았다. 나는 이런 작은 폰트가 불편해서 나와 같은 사람을 위해서 글꼴을 설정하는 방법도 설명하겠다.

VScode 옵션 창에서 Commonly Used가 나오는데 바로 처음에 볼 수 있는 메뉴가 Font Size와 Font Family이다. 여기서 글자의 크기와 글꼴을 선택할 수 있다. 혹시나 안 보인다면 `search settings` 창에서 검색해서 찾을 수 있다.

![[Pasted image 20240410134241.png]]

내가 사용하는 글자 크기는 15이고, 글꼴은 `D2Coding`을 사용하고 있다. 기본적으로 os에서 설치된 글꼴이 아니므로 아래 링크를 통해서 설치를 해야 한다. 네이버의 나눔글꼴을 바탕으로 코딩할 때 한글와 영문의 깨짐 현상을 해결한 글꼴이다. 또한 **터미널에서 한글이 깨지는 현상도 사라지니 어떻게 보면 거의 필수로 설치해야 하는 글꼴이라고 볼 수 있다.** 유료로 판매만 하지 않으면 저작권에 대한 문제가 없으므로 편안하게 사용하면 된다.
[D2Coding Github](https://github.com/naver/d2codingfont)

## 테마 설정

VScode 옵션 창에서 `Color Theme`를 검색하면 테마를 설정할 수 있는 메뉴가 나옵니다. 저는 너무 칙칙한 테마가 싫어서 과거에 사용했던 Atom 편집기의 `Atom One Dark`을 extension을 통해서 설치한 다음에 사용하고 있습니다. 기본 테마가 별로 라면 extension에 다양한 테마들이 올라와 있으니 쇼핑하듯이 선택하시면 즐거운 코딩 시간이 된다고 생각합니다.

![[Pasted image 20240410140616.png]]

## Sticky

VScode 옵션 창에서 `sticky scroll`을 검색하면 아래와 같은 메뉴 선택을 볼 수 있는데 이걸 체크하면 편집기 창 상단에 지금 어떤 함수 안에 있는 코드를 보고 있고 이 함수가 어떤 파라미터와 리턴을 보내주고 있는지 확인 할 수 있다. 

![[Pasted image 20240410215513.png]]

처음에는 불편하다고 생각했는데 간단한 함수에서는 큰 도움이 안되었지만 Class를 작성할 때 내가 지금 어떤 Class에서 코드를 작성하고 있는지 확인할 수 있어서 나한테는 좋은 기능이라고 느꼈다.

![[Pasted image 20240410141748.png]]

아래 그림을 보면 SlackBase 클래스 안에 get_event_response라는 함수의 코드라는 것을 확인할 수 있다.

![[Pasted image 20240410142421.png]]

만약 Stick 옵션을 사용하지 않으면 디렉터리 경로로 나타나는데 이 경로는 마우스 커서 기준이다. 커서 위치와 다른 곳을 보고 있으면 나타나지 않는다. 그래서 나는 이 옵션을 추천합니다.
![[Pasted image 20240410215350.png]]

## 단축키 설정

단축키 설정은 아주 개인적인 취향이므로 설정하는 방법만 작성하겠다. VScode 왼쪽 하단에 보면 큰 톱니바퀴가 있는데 이걸 누르면 `keyborad shortcuts` 이라는 메뉴를 선택할 수 있다. 단축키는 사용하면서 변경하는 것을 추천한다. 나의 경우에도 서로 충돌하는 단축키 때문에 변경하지 그 외에는 기본 값을 사용하고 있습니다. (예, Vim 편집기 단축키)

![[Pasted image 20240410143127.png]]

### 단축키 모음
- `ctrl + /` : 주석 처리하기
- ```ctrl + 백틱(`)``` : 터미널 창 열기 및 닫기
- `ctrl + b` : 왼쪽 탐색 창 열기 및 닫기
- `F12 or ctrl + 클릭` : 해당 함수 정의 문으로 이동하기
- `F2` : 함수 이름을 동시에 변경하기(다른 곳에서 사용한 이름도 같이 변경해 준다 😄 )
이 외에 아주 많은 단축키가 있습니다. 

# 코드 스타일

코드 스타일은 각자 개인적인 취향에 의해서 결정하거나 팀 프로젝트에서 협의 하에 진행한다. 각 좋아하는 옷 스타일이 다른 것 처럼 코드 스타일로 서로 다르게 된다. 이런 차이로 인해 독자적으로 코드를 작성하는 경우에는 상관이 없지만, 협업을 하는 프로젝트에서는 논쟁이 발생할 수 있다. 그래서 공식적으로 사용하고 있는 코드 스타일을 준수하게 되면 큰 문제 없이 동일한 코드 스타일로 일관되게 작성될 수 있다.
그렇다면 프로젝트에서 변경된 코드 스타일로 인해 매번 공식 문서를 통해서 스타일을 맞추어야 한다면 상당한 시간이 들어가게 된다. VScode extension에서는 이런 코드 스타일을 제공해 주고 있어서 해당하는 코드 스타일을 설정하면 자동으로 정렬해준다. 
아래 대표적으로 사용하는 코드 스타일을 간략하게 소개하고 설치를 하면 된다.

## PEP 8
PEP 8은 Python 코드를 읽기 쉽고 일관되게 작성하기 위한 공식 스타일 가이드입니다. PEP 8에서 명시된 코드 스타일의 규칙을 준수하고 있는지 체크를 합니다. 내부적으로 정해진 코스 스타일이 없다면 추천한다. VScode에서는 extension에서 `autopep8`을 검색하면 설치할 수 있다. 
[PEP 8 공식 문서](https://peps.python.org/pep-0008/)

autopep8 extension의 옵션에서 `Args`에서 `--max-line-length=140`이라고 설정하면 한 줄에 140까지 체크해주는 것을 의미한다. 가끔 100으로 설정된 경우가 있으니 확인해보면 좋겠다.

![[Pasted image 20240410224233.png]]

## Flake8
flake8은 pep8 을 준수하는 코드 스타일, 버그를 검사하는 강력한 도구입니다. 하지만, 자동으로 수정은 해주지 않아서 직접 수정해야 하는 단점을 가지고 있습니다.
VScode extension에서는 `Flake8`이라고 검색하여 설치를 할 수 있다.
Flake 8도 동일하게 --max-line-length=140 옵션이 가능하다.
[Flake8 공식 문서](https://flake8.pycqa.org/en/latest/)

## Black
Black도 PEP 8을 준수하면서 **자동으로** 코드 스타일을 변경해주는 도구입니다. VScode extension에서는 `Black Formatter`라고 마이크로 소프트에서 개발 extension을 설치하면 된다. 
Black도 동일하게 --max-line-length=140 옵션이 가능하다.
[Black 공식문서](https://black.readthedocs.io/en/stable/)

# Pylance

Pylance도 VScode extension에 있는 마이크로 소프트에서 개발한 툴이다. 정적 타입 검사, 자동 검사, 실시간 오류 강조 등의 기능을 제공하고 있다. 특히 나는 타입 검사 때문에 사용하고 있다. Python 특성 상 C 언어와 달리 타입 지정에 대해서는 자유롭기 때문에 잘못된 타입이 입력될 경우 발생되는 런타임 오류에 대해서는 개발자가 직접 관리를 해야 한다. 
Pylance는 이런 타입 검사를 실시간으로 체크를 해주기 때문에 실수를 줄일 수 있고 type hint에 대한 공부도 같이 할 수 있다고 본다. 
Pylance에서 제공해주는 자세한 기능은 홈페이지 또는 extension 설명 글에서 확인하면 됩니다.
[Pylance github](https://github.com/microsoft/pylance-release)

![[Pasted image 20240410233101.png]]

# Extension for Python

## Python Extension Pack
아마도 python을 주력 언어로 사용한다면 다들 한번 식은 설치하는 extension pack이지 않을까 생각합니다. Python 언어 지원을 기본으로 Docsting을 자동으로 생성해주는 autodocsting포함해서 Python 가상 환경, Python에서 사용하는 indent 설정 관련 툴들을 한번에 설치해주는 패키지이다.

![[Pasted image 20240411000118.png]]

가상 환경을 관리해주는 툴을 직관적으로 사용할 수 있어서 편안하기 하지만, 본인이 가상 환경 구축에 대해서 초보하고 생각하면 추천하지 않는다. 내가 작성한 [[pyenv]] [[poetry]]을 참고해서 CLI 환경에서 설정하고 관리하는 노력을 했으면 하는 바램이다. 
> 나는 pyenv에 poetry를 사용하고 있고 `.git` 폴더를 프로젝트와 동일하게 경로에 위치해서 사용하고 있어서 pip 패키지도 프로젝트 폴더에 `.venv`라는 폴더 이름으로 설치가 된다. 이런 상세한 설정은 poetry에서 CLI로 세밀하게 설정하는 부분이므로 이런 환경 설정을 위해서는 CLI 환경에서 먼저 공부하는 것을 추천합니다.

![[Pasted image 20240411001013.png]]

## indent-rainbow

Python에서는 들여쓰기가 중요한데 이게 짧은 코드인 경우에는 괜찮지만 코드가 길어지면 들여쓰기 잘 정렬되어 있는지 확인이 힘들다.(기본 값으로 제공하지만 나처럼 눈이 침침하면 추천한다.)
들여쓰기 된 상태를 색깔로 표기되어서 보기에 좋고 vscode에서 기본적으로 제공하는 것에 비해 식별이 용이했다.

![[Pasted image 20240410234254.png]]

## Jypyter
VScode에서도 Jypyter notebook를 사용할 수 있다. 

![[Pasted image 20240410233436.png]]

설치 후 명령 팔레트(`ctrl + shift + p`)에서 new 만 검색해도 `create: New Jupyter Notebook`이 나타나고 이를 선택하면 Jupyter Notebook이 생성되는 화면을 볼 수 있다.

![[Pasted image 20240410233705.png]]

## Error lens
코드를 작성하다가 실시간으로 오류가 검출되는 경우에 코드 라인에 오류 내용을 표기해 주는 extension이다.  기본적으로 PROBLEMS 라는 콘솔 창에 의해 오류 내용을 확인 할 수 있다. 사용해 본 경험으로는 오류가 발생하는 부분에서만 빨간색 밑줄을 보여줘서 빠르게 훑어보는 경우에 지나치는 상황이 있어서 Error Lens를 사용하게 되었다. 
사용해 보시면 해당 줄이 전체적으로 연한 빨간색으로 색칠이 되기 때문에 쉽게 찾을 수 있다.

![[Pasted image 20240411003836.png]]

아래 그림은 tqdm이 가상 환경에 없어서 경고를 보낸 예시이다. `Alt + F8`을 누르면 팝업 창처럼 내용을 확인할 수 있다. 한 줄에 너무 길면 이렇게 해서 봐야 한눈에 읽을 수 있다.

![[Pasted image 20240411004935.png]]

## Material Icon Theme
VScode의 탐색기에서 투박한 icon을 이쁘게 살려주는 테마이다. 

![[Pasted image 20240411015714.png]]

테마를 적용한 전과 후이다. 여기서 마음에 드는 점은 **ipynb 파일 확장자가 jypyter 아이콘으로 나타나는 점**이 마음에 들었다.

![[Pasted image 20240411020044.png]]

# 터미널 설정

나는 최근 프로젝트로 인해 Git을 사용하고 있다 보니 VScode의 터미널은 default로 git bash가 실행되도록 설정되어 있다. 원래는 투박한 프롬프트를 보여주는데 오랜 시간 리눅스 환경에서 사용한 경험을 바탕으로 나만의 프롬프트를 설정해서 사용하고 있다. 사용 방법은 제가 관거에 작성했던 블로그에 설명되어 있다. 

[Git bash 꾸미기](https://sooyoung-wind.github.io/git/zsh/python/2023/09/14/ubuntu_windows.html) <- 참고로 윈도우에서 우분투 환경을 구축하는 내용도 포함되어 있어서 이 부분은 제외하고 bash 꾸미기만 참고하시면 된다.

![[Pasted image 20240411002015.png]]

내가 구성한 프롬프트는 `시간 사용자 in 디렉터리 경로 (git status) 그리고 가상 환경 이름` 순으로 설정했다.

# Git extensions

## Git Graph
Git commit 상태를 그래프로 이쁘게 보여주는 고마운 extension이다. 

![[Pasted image 20240411003327.png]]

설치를 하면 VScode 하단 바에 `Git Graph`라는 버튼이 생긴다. 이 버튼을 누르면 현재 작업하고 있는 워크스페이스에 해당하는 Git의 commit 정보를 보여준다.

![[Pasted image 20240411003442.png]]

## GitLens
GitLens는 Git 관련된 기능들을 아주 많이 제공해주는 가장 유명한 extension이다. 단, 부분 유료화라서 저도 필요한 기능한 사용하고 많이 사용은 하지 않는다. 

![[Pasted image 20240411005155.png]]

그 중에서 가장 많이 쓰는 기능이 해당 줄에 커서를 옮기면 가장 최근에 반영된 commit 메시지가 화면에서 볼 수 있다. 이를 통해 누가 언제 어떤 이유로 코드를 작성 및 수정을 했는지 빠르게 확인할 수 있다. 더 상세한 내용은 마우스를 올리면 commit 정보가 나오고 commit을 클릭하면 현재 파일에 대한 commit history가 전부 다 조회해서 과거 기록을 쉽게 찾아볼 수 있다. Git Graph하고 다른 점은 Git Graph는 commit 순서에 따라 찾을 수 있기 때문에 특정 파일에 대한 변경 내용을 확인하고자 하면 Git Lens가 편리하게 알려주는 장점이 있다.

![[Pasted image 20240411005517.png]]

Git Lens를 설치하면 오른쪽 상단에 Git Lnes의 아이콘이 생성되는데 그 아이콘을 누르면 메뉴가 나오는데 여기서 Toggle File Blame을 선택하면 분할창으로 각 코드마다 commit 메시지지와 함께 누가 변경했는지 확인할 수 있다. 또한 Toggle File Changes를 누르면 가장 최근에 반영된 commit 만 보여준다. 

![[Pasted image 20240411010644.png]]


![[Pasted image 20240411010337.png]]

## Gitmoji
VScode로 Git commit을 할 때 사용하는 이모지들을 검색해줘서 적절한 commit에 해당 하는 이모지를 쉽게 사용할 수 있도록 해준다. 나 같이 이모지 영문을 외우지 못한 개발자에게 도움이 되는 extenstion이라고 생각한다. 

![[Pasted image 20240411011845.png]]

Git add, commit, push를 담당하는 Source control 패널에서 아래와 같은 이모지를 클릭하면 이모지와 함께 주로 사용하는 commit 메시지의 종류를 같이 보여준다.

![[Pasted image 20240411022400.png]]

여기서 적절하게 상황에 맞는 이모지를 선택하고 commit을 작성하시면 됩니다. 지금 블로그를 위해서 사용하고 있는 옵시디언도 이모지 확장 툴을 사용해서 쉽게 사용하고 있다. 😋

![[Pasted image 20240411022033.png]]

## GitHub Pull Requests
GitHub 홈페이지에 접속해서 해당 레포에 들어가고 PR을 작성하는 과정을 줄여주는 고마운 툴이다. 그럼 Git commit을 VScode로 했다면, PR도 VScode에서 실행해보자.


![[Pasted image 20240411022656.png]]

Extension에서 GitHub Pull Requests를 검색해서 설치를 하면 commit 후에 자동으로 PR도 생성하겠나? 라는 알림이 생성된다. 여기서 생성하겠다고 하면 PR을 생성할 수 있다.

![[Pasted image 20240411031231.png]]

 이 extention을 통해서 PR에 달리는 코멘트도 자동으로 연동이 되어서 실시간으로 볼 수 있고 해당 하는 코멘트를 VScode 편집기에서 직접 볼 수 있다. 아래는 예시로 만들어 본 PR입니다.

![[Pasted image 20240411030943.png]]

PR 기본 화면인데 여기서 PR 번호를 클릭하면 GitHub 홈페이지로 바로 연결된다. 진짜로 이걸 찾고 사용하면서 많이 편해졌다. 일일이 GitHub 홈페이지에 직접 들어가고 생성하고 확인하는 작업이 불편했었는데 extension을 통해서 편리하게 PR을 올릴 수 있게 되었다.

![[Pasted image 20240411031416.png]]

# 마무리

실제로 VScode의 extension 생태계는 상당히 활발하다고 생각한다. 그래서 잘 사용하면 업무 효율을 높일 수 있다고 생각한다. 여기서 소개는 하지 않은 MongoDB, MySQL extension도 있어서 DB를 보는 viewer를 별도로 실행할 필요가 없어서 상당히 좋다고 생각한다. 다만, extension이 점점 많이 설치할 수록 VScode가 첫 실행되는 속도는 점차 느려진다.

VScode의 최대 강점은 extension을 통한 기능 확장이라고 생각한다. 이 점이 양날의 검으로 extension을 제외하면 그렇게 좋다고 생각할 수 없다. 결국 VScode는 extension이 없으면 이빨 빠진 호랑이라고 생각한다. 한동안 강력한 IDE가 있지 않는 한 계속 사용할 생각입니다.

아무쪼록 이 글을 읽고 많은 도움이 되었으면 합니다.

# 관련 문서

https://www.youtube.com/watch?v=XMfyfNZooi4
