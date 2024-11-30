---
title: pyenv와 Poetry로 Python 개발 환경 구축하기
date: 2024-11-30 22:01
tags:
---

Created at : 2024-11-30 22:01  
Auther: Soo.Y  

----
### 📝메모 

# pyenv와 Poetry로 Python 개발 환경 구축하기

Python 개발을 하면서 다양한 버전의 Python을 관리하고, 패키지 의존성을 체계적으로 관리하는 것은 매우 중요합니다. **pyenv**와 **Poetry**는 이러한 요구 사항을 충족시키는 강력한 도구입니다. 이 블로그에서는 pyenv와 Poetry를 사용하여 Python 개발 환경을 구축하는 방법을 단계별로 상세하게 설명하겠습니다.

---

## 1. 소개

Python은 버전에 따라 문법과 기능이 달라질 수 있으며, 프로젝트마다 요구하는 패키지와 Python 버전이 다를 수 있습니다. 따라서 여러 프로젝트를 관리할 때는 각 프로젝트에 맞는 Python 버전과 패키지를 관리하는 것이 중요합니다. pyenv와 Poetry를 사용하면 이러한 작업을 쉽게 수행할 수 있습니다.
> 아나콘다의 버그에서 벗어나자!

---

## 2. pyenv란 무엇인가?

**pyenv**는 여러 버전의 Python 인터프리터를 관리하고 전환할 수 있는 도구입니다. 이를 통해 시스템에 설치된 Python 버전을 변경하지 않고도 다양한 버전의 Python을 사용할 수 있습니다.

### pyenv의 주요 기능

- 여러 Python 버전 설치 및 관리
- 프로젝트별로 Python 버전 지정
- 글로벌 Python 버전 설정

---

## 3. Poetry란 무엇인가?

**Poetry**는 Python 패키지 관리와 프로젝트 종속성을 관리하는 도구로, 가상 환경 생성, 의존성 관리, 배포 등을 간편하게 해줍니다.

### Poetry의 주요 기능

- 의존성 관리 및 패키지 설치
- 가상 환경 자동 생성 및 관리
- 프로젝트 빌드 및 배포 지원
- 직관적인 `pyproject.toml` 파일을 통한 설정 관리

---

## 4. 사전 준비 사항

- Unix 계열 운영 체제 (macOS, Linux) 또는 Windows 10 이상
- 터미널 사용에 익숙함
- Git이 설치되어 있어야 함

---

## 5. pyenv 설치

### 1. 종속성 설치

pyenv를 설치하기 전에 필요한 라이브러리를 설치해야 합니다.

#### Windows
작성된 내용 참조 : [[pyenv]]

#### macOS

```bash
brew update
brew install openssl readline sqlite3 xz zlib
```

#### Ubuntu/Debian

```bash
sudo apt update
sudo apt install -y build-essential libssl-dev zlib1g-dev \
libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm \
libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev
```

### 2. pyenv 설치

#### 설치 스크립트 사용

```bash
curl https://pyenv.run | bash
```

#### Git을 통한 수동 설치

```bash
git clone https://github.com/pyenv/pyenv.git ~/.pyenv
```

### 3. 쉘 환경 설정

쉘 프로파일 파일에 pyenv 경로를 추가해야 합니다.

#### Bash를 사용하는 경우 (`~/.bashrc` 또는 `~/.bash_profile`)

```bash
# pyenv 설정 추가
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init --path)"
eval "$(pyenv init -)"
```

#### Zsh를 사용하는 경우 (`~/.zshrc`)

```bash
# pyenv 설정 추가
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init --path)"
eval "$(pyenv init -)"
```

쉘을 다시 시작하거나 프로파일을 로드합니다.

```bash
source ~/.bashrc  # 또는 source ~/.zshrc
```

### 4. pyenv 확인

```bash
pyenv --version
```

정상적으로 설치되었다면 pyenv의 버전이 표시됩니다.

---

## 6. Python 버전 관리

### 1. 설치 가능한 Python 버전 목록 확인

```bash
pyenv install --list
```

### 2. Python 버전 설치

예를 들어, Python 3.10.9를 설치하려면:

```bash
pyenv install 3.10.9
```

### 3. 글로벌 Python 버전 설정

```bash
pyenv global 3.10.9
```

### 4. 로컬(프로젝트별) Python 버전 설정

프로젝트 디렉토리에서:

```bash
pyenv local 3.10.9
```

이렇게 하면 해당 디렉토리와 하위 디렉토리에서 지정한 Python 버전이 사용됩니다.

### 5. 현재 사용 중인 Python 버전 확인

```bash
pyenv version
```

---

## 7. Poetry 설치

> Windows 환경 기존 문서 참조 : [[poetry]]

### 1. Poetry 설치 스크립트 실행

```bash
curl -sSL https://install.python-poetry.org | python3 -
```

또는 pip를 사용하여 설치:

```bash
pip install poetry
```

### 2. 환경 변수 설정

Poetry의 실행 파일 경로를 PATH에 추가해야 합니다.

#### Bash (`~/.bashrc`)

```bash
export PATH="$HOME/.local/bin:$PATH"
```

#### Zsh (`~/.zshrc`)

```bash
export PATH="$HOME/.local/bin:$PATH"
```

쉘을 다시 시작하거나 프로파일을 로드합니다.

```bash
source ~/.bashrc  # 또는 source ~/.zshrc
```

### 3. Poetry 버전 확인

```bash
poetry --version
```

---

## 8. 프로젝트 생성 및 관리

> poetry의 기본적인 프로젝트 생성 및 관리를 위한 방법이다. 만약 프로젝트 폴더마다 패키지를 설치하는 방법으로 설정했다면 [[pyenv_poetry]] 문서에서 Quick start를 참고하길 바랍니다.
> 여기서 말하는 poetry 설정 내용은 `poetry config --list`를 실행하면 `virtualenvs.in-project`가 `ture`로 설정된 경우를 의미합니다.

### 1. 새로운 프로젝트 생성

```bash
mkdir my-project
cd my-project
poetry init
```

`poetry init` 명령어는 대화형으로 프로젝트 설정을 진행합니다.

- 패키지 이름, 버전, 설명 등을 입력합니다.
- 의존성을 추가할 것인지 묻는다면, 필요에 따라 패키지 이름을 입력하거나 Enter를 눌러 건너뜁니다.

### 2. 가상 환경 활성화

Poetry는 기본적으로 가상 환경을 자동으로 생성합니다. 가상 환경에 접근하려면:

```bash
poetry shell
```

가상 환경에서 벗어나려면:

```bash
exit
```

### 3. 의존성 추가

패키지를 설치하려면:

```bash
poetry add 패키지이름
```

예를 들어, `requests` 패키지를 추가하려면:

```bash
poetry add requests
```

### 4. 개발 의존성 추가

개발용 패키지는 `--dev` 옵션을 사용합니다.

```bash
poetry add --dev pytest
```

### 5. 의존성 설치

`pyproject.toml` 파일에 정의된 모든 의존성을 설치하려면:

```bash
poetry install
```

### 6. 스크립트 실행

가상 환경 내에서 스크립트를 실행하려면:

```bash
poetry run python script.py
```

---

## 종합 정리

pyenv와 Poetry를 사용하면 다양한 Python 버전과 패키지 의존성을 손쉽게 관리할 수 있습니다. pyenv는 여러 Python 버전을 설치하고 관리하는 데 유용하며, Poetry는 의존성 관리와 가상 환경 관리를 통합하여 제공합니다.

### 주요 장점

- **격리된 환경**: 프로젝트마다 독립적인 Python 버전과 패키지 의존성을 유지할 수 있습니다.
- **재현성**: `pyproject.toml`과 `poetry.lock` 파일을 통해 정확한 패키지 버전을 관리할 수 있습니다.
- **편의성**: 명령어를 통해 간편하게 환경 설정 및 관리를 할 수 있습니다.

---

## 추가 팁

- **Poetry 설정 확인**: Poetry의 설정을 변경하려면 `poetry config --list`를 사용합니다.
- **프로젝트 복제 및 설정**:
    - 저장소를 클론한 후, 프로젝트 디렉토리로 이동합니다.
    - `poetry install`을 실행하여 의존성을 설치합니다.
- **Docker와 함께 사용**: Docker 컨테이너 내에서 pyenv와 Poetry를 사용하여 일관된 개발 및 배포 환경을 구축할 수 있습니다.

---

## 마무리

이 글에서는 pyenv와 Poetry를 사용하여 Python 개발 환경을 구축하는 방법에 대해 자세히 알아보았습니다. 이 두 도구를 활용하면 더욱 효율적이고 체계적으로 프로젝트를 관리할 수 있습니다. 앞으로의 Python 개발에 많은 도움이 되길 바랍니다.

----
### 📜출처(참고 문헌)  

- [pyenv 공식 GitHub 저장소](https://github.com/pyenv/pyenv)
- [Poetry 공식 문서](https://python-poetry.org/docs/)
- [Python.org](https://www.python.org/)

----
### 🔗연결 문서


