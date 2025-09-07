---
title: Ollama 사용하기
date: 2024-03-12 22:23
tags:
  - environment
  - platform
  - "#LLM"
---

Created at : 2024-03-12 22:23  
Auther: Soo.Y  

# Ollama❓
Ollama는 거대 언어 모델을 로컬 컴퓨터에서 실행하고 관리할 수 있도록 도와주는 오픈소스 플랫폼입니다. Ollama는 인터페이스(CLI)를 제공하여 사용자가 쉽게 모델을 생성하고 실행하며 공유도 할 수 있도록 지원해준다고 합니다.

## Ollama 주요 특징
- 다양한 모델 지원 : Llama 2, Mistral, Gemma 등과 같은 여러 유명한 LLM을 지원합니다.
- 사용자 친화적 : macOS, Windows, Linux 운영체제에 사용할 수 있으며 설치 및 사용이 간편합니다.

# Ollama install
Ollama 사이트에서 제공하고 있는 다운로드 페이지에서 해당 운영체제에 맞는 설치파일을 다운받아서 설치하면 된다. [Ollama download](https://ollama.com/download)

# Ollama 사용법
Ollama를 설치하면 (windows 유저는 파워쉘에서) `ollama --version` 명령어를 입력해서 ollama의 버전과 함께 확인할 수 있습니다. 

- `ollama list` : 설치된 모델들을 조회하기 (기본적으로 llama2가 내장되어 있습니다.)
- `ollama pull <llm model name>` : 모델 다운 받기 (모델 이름은 ollama 홈페이지에서 확인할 수 있음)
- `ollama rm <llm model name>` : 모델 삭제하기
- `ollama run <llm model name>` : 모델 실행하기

# 관련 문서