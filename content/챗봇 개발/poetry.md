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
(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | py -
```

