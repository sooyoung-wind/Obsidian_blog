---
title: pyenv로 파이썬 버전을 관리하자
date: 2024-03-12 14:32
tags:
  - python
  - environment
---

Created at : 2024-03-12 14:32  
Auther: Soo.Y  

# Pyenv ❓

pyenv는 python의 버전을 관리해주는 도구이다. 나는 지금까지 conda로 설치해서 python의 버전을 관리했으나, conda의 결함 등(나는 경험해 본 적이 없다)으로 인해 그리고 이번 프로젝트에서 pyenv를 사용하는 동료로 인해 이번 기회에 바꿔보려고 한다. 

# Pyenv install

나는 윈도우 유저라서 윈도우 파워쉘에서 동작하는 명령어를 가져와 봤다. 혹시나 다른 유저라면 [pyenv github](https://github.com/pyenv/pyenv?tab=readme-ov-file)링크를 확인해보면 된다. 
설치 후에 파워쉘을 다시 실행해 보면 `pyenv --version`을 입력해서 버전을 확인 할 수 있다. 나의 경우에는 3.1.1으로 설치되었다.

혹시나 변경된 내용을 알고 싶다면 다음 링크를 통해서 알아보면 된다. [pyenv-winows github](https://github.com/pyenv-win/pyenv-win)
```
Invoke-WebRequest -UseBasicParsing -Uri "https://raw.githubusercontent.com/pyenv-win/pyenv-win/master/pyenv-win/install-pyenv-win.ps1" -OutFile "./install-pyenv-win.ps1"; &"./install-pyenv-win.ps1"
```

# python install

`pyenv version`을 입력하면 pyenv에서 현재 설정된 global 및 local에 설치된 python 버전을 확인할 수 있다. 초기에는 설정이 안되었다고 할 것이다. 
- `pyenv version` : global, local python version 확인
- `pyenv versions` : 설치된 python 버전 확인  
- `pyenv install --list` :  설치 가능한 python 버전 리스트 확인
- `pyenv install 3.12.1` : 3.12.1 버전으로 python 설치하기 
- `pyenv global 3.12.1` : 글로벌 버전으로 3.12.1로 설정하기 / 이 후에 `pyenv version`을 치면 3.12.1 버전으로 설정되었다고 나온다.
- `pyenv update`: 만약 원하는 최신 버전이 없다면 update를 통해서 최신 버번을 가져올 수 있다.

`pyenv install <버전>`을 통해 해당 python 버전을 설치하고 `pyenv global <version>`을 통해 python의 global 버전까지 설정하였다. 각 작업 디렉토리마다 python 버전을 달리 하고 싶다면 해당 디렉토리에서 `pyenv local <version>`을 실행하면 설정이 완료된다. 

# pyenv로 python 버전 관리하고 poetry로 프로젝트 의존성 관리하기

지금부터 현재 진행하고 있는 프로젝트에서 사용하고 있는 파이썬 관리 및 의존성 관리에 사용하고 있는 pyenv와 poetry를 사용하는 과정에 대해서 설명하겠다.

1. 프로젝트 디렉터리 만들기
	- `mkdir <dir>`
2. 해당 디텍터리 들어가기
	- `cd <dir>`
3. pyenv를 사용하여 원하는 python 버전 설치
	- `pyenv install <version>`
4. python 버전 지정
	- `pyenv local <version>` : 주의 반드시 해당 디렉터리에서 실행해야 한다.
5. Poetry 초기화
	- `poetry init` 명령어로 새로운 프로젝트를 시작한다.
6. 의존성 추가
	- `poetry add <패키지명>` 명령어를 사용하여 필요한 패키지를 프로젝트에 추가한다.
7. 가상 환경 사용
	- `poetry shell` 명령어로 가상 환경을 활성화 할 수 있다.
8. VSCode 설정
	- VSCode를 사용하는 경우, python 인터프리터 설정을 프로젝트의 가상 환경으로 지정한다.
9. 개발 시작
	- 위의 과정을 통해 pyenv와 poetry를 함께 사용하여 python 버전 관리와 프로젝트 의존성 관리를 할 수 있습니다.

# 관련 문서
[[poetry]]
