---
title: poetry에 대해서 ❓
date: 2024-03-11 21:41:00
tags:
  - python
  - environment
---
# Poetry ?

Poetry란 pip와 같이 패키지의 설치 및 관리를 해주는 의존성 관리자이다. pip를 사용해서 패키지를 설치하고 관리할 수 있지만 requirements.txt에서 패키지를 일일이 관리를 해줘야 한다. 게다가 requirements.txt는 자동으로 생성되지도 않아서 열심히 개발하고 있는 도중에 작성하려고 하면 어떤 패키지를 설치했는지 관리하기가 힘들어진다.  

또한, Poetry는 conda에서 python 가상환경을 만들어 주는 역할도 동시에 해주는 고마운 녀석이다. 실제로는 가상환경을 먼저 생성하고 생성된 가상환경에 들어가서 의존성 패키지를 설치하고 관리를 해야 하는데 poetry는 이를 동시에 작업을 할 수 있게 해준다.  

pip 생태계가 많이 퍼져 있어서 커뮤니티도 많이 활성화되어 있지만 conda 가상 환경의 결함(아직 난 경험해보지 않아서 잘 모르지만)으로 인해 고생할 수도 있으니 미리 배우고자 한다.  

# Poetry install

아래 코드를 입력해서 poetry 설치를 할 수 있다.  그런데 windows 유저들은 환경 변수에 poetry를 따로 추가해줘야 하기 때문에 다른 방법을 찾아보았다.

```
curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python
```


(Windows) 아래 코드를 사용해서 poetry도 설치하면서 동시에 환경 변수에 추가하는 명령어라고 한다.
```
(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | python -
```

만약 실행이 안된다면 py 명령어 에러라면 python 설치가 필요한 상황이다. 그러므로 python 설치를 해야 하는데 python 버전 관리도 같이 고려하면 좋기 때문에 [[pyenv]] 문서를 같이 확인하여 설치하기를 바랍니다.  

설치가 완료되면 `poetry.exe`가 있는 경로를 알려준다. 이 경로를 windows 환경 변수에 등록해줘야 한다. bash를 이용하는 경우 export로 환경 변수를 설정해주면 된다. 

나의 경우에는 `export PATH=$PATH:$HOME/AppData/Roaming/Python/Scripts`와 같이 설정해야 했다. `.bashrc`에 등록해 두면 VSCode에서 터미널을 새로 열면 자동으로 등록된다. (이 부분은 개념을 모르는 분들은 추가적으로 검색해서 찾아보셔야 합니다. 😭)

# poetry config

poetry에서는 가상 환경을 자동으로 생성해주는데 나의 경우에는 자동으로 생성이 안되었고 “Skipping virtualenv creation, as specified in config file.”라는 메세지가 상단에 항상 나왔습니다. 이 경우는 `virtualenvs.create`를 `false`로 설정되었을 경우에 발생한다고 구글링을 통해서 확인했습니다. 만약 이런 경우가 발생하면 아래 명령어를 통해서 확인하고 설정해보시기를 바랍니다.

```
# poetry config를 확인하는 명령어
poetry config --list
```

가상 환경 생성을 다시 활성화하는 명령어입니다.  
```
poetry config virtualenvs.create true
```

가상 환경을 test로 생성되는지 확인해 봅시다.
1. `poetry new <프로젝트 이름>`
2. `cd poetry <프로젝트 이름>`
3. `poetry add numpy`
4. `poetry env info` or `poetry env info --path` : 가상 환경 경로 확인

## poetry 가상 환경 경로 설정

기본적으로 poetry 가상 환경 경로는 디폴트 경로가 정해져 있다. 이를 각 프로젝트 폴더에 반영해서 설치되는 패키지를 쉽게 찾아서 관리해 볼 수 있다. 
일단 기존에 설정된 가상 환경을 삭제해 보겠습니다.(설정된 가상 환경이 없으면 스킵)
`poetry env list`를 입력해서 가상 환경 리스트를 확인하고 아래 그름과 같이 가상 환경의 풀 네임을 확인해야 합니다. 

![[Pasted image 20240312175232.png]]

`poetry env remove my-test-UvGIfenI-py3.12` 을 입력해서 가상 환경을 삭제합니다. 

그럼 이제부터 해당 프로젝트 폴더 내부에 가상 환경 설정 및 패키지들을 설정해보겠습니다. (저는 이게 관리하기 편하다고 생각해서 설정했으니 원하지 않으면 스킵하시면 됩니다.)
`poetry config virtualenvs.in-project true` 을 사용해서 프로젝트 폴더 내부에 생성되도록 설정합니다. 추후에 변경하고 싶으면 `poetry config virtualenvs.in-project false`로 바꾸시면 됩니다.

# poetry 명령어

- `poetry init` : (초기화) 현재 디렉터리에서 `pyproject.toml` 파일을 생성하여 새 프로젝트를 시작합니다.
- `poetry add <패키지명>` : (패키지 추가) 프로젝트에 패키지를 추가합니다.
- `poetry show` : (패키지 목록) 설치된 패키지 목록을 확인합니다.
- `poetry remove <패키지명>`: (패키지 삭제) 프로젝트에서 패키지를 삭제합니다.
- `poetry run python <파일명.py>`
 : (파이썬 파일 실행) poetry 환경 내에서 파이썬 파일을 실행합니다.  ---> 가상 환경 path 설정을 잘 했다면 `python <파일명.py>` 으로 해도 문제가 없다.
- `poetry install` : (의존성 설치) `pyproject.toml`에 정의된 모든 의존성을 설치합니다.  
- `poetry update` : (업데이트) 의존성을 최신 버전으로 업데이트하고 `poetry.lock`파일을 갱신합니다.
- `poetry env info` : (환경 정보) 현재 디렉터리에 설정된 poetry 환경 정보를 확인합니다.

# poetry와 pyenv를 사용해서 신규 프로젝트 생성하기

1. `poetry new <프로젝트명>`
	1. `poetry init`으로도 생성 가능합니다. 
	2. `poetry new`으로 프로젝트를 생성하면 디렉터리를 포함해서 `pyproject.toml`을 생성해줍니다.
2. 현재 경로를 프로젝트 디렉터리로 변경 : `cd <프로젝트명>`
3. (옵션) 만약 python 개발 버전이 pyenv에 설치 안되었다면 `pyenv install <python version>`로 설치하기
4. `pyenv local <python version>` : 프로젝트의 python version을 설정
5. `poetry install` : `pyproject.toml`에 정의된 모든 의존성을 설치
	1. 의존성 설치와 함께 가상 환경도 설치됩니다.
	2. `poetry install`를 한 후에 프로젝트에 특정 패키지가 필요하다면 `poetry add <패키지명>` 명령어를 사용해서 `pyproject.toml`과 `poetry.lock` 파일을 업데이트 합니다.
	3. 제거하는 명령어는 `poetry remove <패키지명>` 입니다.
	4. 결국 `pip install <패키지명>`와 같은 명령어라고 생각하면 된다.
6. `poetry shell` : 설정된 가상 환경에 들어가는 명령어입니다. 

# 관련 문서
[[pyenv]]