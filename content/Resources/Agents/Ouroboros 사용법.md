---
title: Ouroboros(소크라테스식 대화법 사용하기)
date: 2026-04-20 21:13
tags:
---

Created at : 2026-04-20 21:13  
Auther: Soo.Y  

----
### 📝메모 


# Ouroboros + Hermes Agent 입문 튜토리얼

> Beginner report for first-time users of `Q00/ouroboros`, focused on the Hermes runtime.

이 문서는 GitHub 레포 `Q00/ouroboros`를 처음 쓰는 사용자를 위해 만든 입문용 리포트입니다.  
설치부터 첫 실행, 기본 명령, 추천 실습, 다른 에이전트 지원 범위, 자주 막히는 지점까지 한 번에 따라갈 수 있게 정리했습니다.

## 대상

- Hermes Agent를 이미 쓰거나 앞으로 메인 에이전트로 쓰고 싶은 초보자
- Linux / macOS / WSL2 환경 사용자

## 작성 기준

- 확인 기준일: `2026-04-20`

---

## 목차

1. [Ouroboros가 하는 일](#ouroboros가-하는-일)
2. [먼저 이해할 흐름](#먼저-이해할-흐름)
3. [설치 전 준비](#설치-전-준비)
4. [1. Hermes 설치](#1-hermes-설치)
5. [2. Ouroboros 설치](#2-ouroboros-설치)
6. [3. Hermes용 설정 연결](#3-hermes용-설정-연결)
7. [4. 첫 실습](#4-첫-실습)
8. [5. 다른 에이전트에서도 가능한가?](#5-다른-에이전트에서도-가능한가)
9. [6. 추천 작업 순서](#6-초보자에게-추천하는-작업-순서)
10. [7. 문제 해결](#7-자주-막히는-지점)
11. [참고 자료](#참고-자료)

---

## Ouroboros가 하는 일

Ouroboros는 일반적인 "한 줄 프롬프트로 바로 코딩" 방식 대신, 먼저 요구사항을 질문으로 정리하고, 그것을 명세로 굳힌 다음, 실행과 평가까지 이어 주는 워크플로 엔진입니다.

> 핵심 아이디어는 간단합니다. "바로 만들어"가 아니라 "먼저 정확히 정의하고, 그 다음 만들자"입니다.

| 단계 | 무슨 일? | 초보자 관점 |
|---|---|---|
| `interview` | 질문을 통해 목표, 제약, 성공 기준을 드러냄 | 생각이 덜 정리된 상태에서 시작해도 됨 |
| `seed` | 대화를 명세 문서로 고정 | 중간에 방향이 흔들리는 문제를 줄여줌 |
| `run` | 실제 구현 흐름 실행 | Hermes가 작업 에이전트 역할을 맡음 |
| `evaluate` | 결과를 검증 | "대충 된 것 같음" 대신 확인 단계를 둠 |

---

## 먼저 이해할 흐름

Hermes와 같이 쓸 때는 아래 순서로 이해하면 가장 편합니다.

```text
Hermes 설치
-> Hermes 기본 설정
-> Ouroboros 설치
-> ouroboros setup --runtime hermes
-> Hermes 안에서 ooo 명령 사용
-> interview -> seed -> run 순서로 작업
```

> README에는 자동 감지 설명이 있지만, 초보자 기준으로는 자동 감지를 믿기보다 `ouroboros setup --runtime hermes`를 직접 실행하는 편이 더 안전합니다.

---

## 설치 전 준비

### 체크리스트

- **Git**이 설치되어 있어야 합니다. Hermes 설치 문서도 Git을 전제합니다.
- **Hermes Agent**는 Linux, macOS, WSL2를 공식 설치 경로로 안내합니다.
- **Ouroboros**는 `Python >= 3.12`를 요구합니다.
- Hermes 설치 스크립트는 자체적으로 `uv`, Python 3.11, Node.js 22, `ripgrep`, `ffmpeg` 등을 챙기려 합니다.

### 먼저 해볼 확인 명령

```bash
git --version
hermes version
python3 --version
uv --version
```

아직 설치 전이라면 `hermes version`이나 `uv --version`은 실패해도 정상입니다.

---

## 1. Hermes 설치

가장 쉬운 방법은 공식 설치 스크립트를 사용하는 것입니다.

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

Hermes 공식 문서는 설치 후 셸을 다시 불러오고, 필요하면 `hermes setup`을 실행한 뒤 `hermes` 명령으로 대화를 시작하라고 안내합니다.

### 설치 후 바로 할 일

```bash
source ~/.bashrc
hermes setup
hermes version
hermes
```

### 여기서 기대하는 상태

- `hermes version`이 정상 출력되어야 합니다.
- Ouroboros 문서는 Hermes CLI `v0.8.0 이상`을 권장합니다.
- `~/.hermes/config.yaml`과 `~/.hermes/.env`가 생성될 수 있습니다.

---

## 2. Ouroboros 설치

초보자에게는 이것도 공식 설치 스크립트가 가장 간단합니다.

```bash
curl -fsSL https://raw.githubusercontent.com/Q00/ouroboros/main/scripts/install.sh | bash
```

이 스크립트는 환경에 따라 `uv`, `pipx`, `pip` 중 하나를 사용해 설치를 시도합니다. 다만 스크립트를 직접 보면 Hermes 전용 자동 설정보다는 Claude/Codex 쪽 분기 로직이 더 뚜렷하게 보이므로, Hermes 사용자는 다음 단계의 수동 설정을 꼭 해주는 편이 좋습니다.

### 대안 설치법

```bash
pip install ouroboros-ai
pip install "ouroboros-ai[mcp]"
pip install "ouroboros-ai[all]"
```

> Ouroboros의 `pyproject.toml` 기준 요구사항은 `Python >= 3.12`입니다. Hermes가 내부적으로 Python 3.11을 다루더라도, Ouroboros 설치에는 별도로 3.12 이상이 필요할 수 있습니다.

### 설치 확인

```bash
ouroboros --help
ouroboros version
```

버전 명령은 배포 상태에 따라 다를 수 있으니, `ouroboros --help`가 먼저 성공하는지만 봐도 충분합니다.

---

## 3. Hermes용 설정 연결

이 단계가 가장 중요합니다. Hermes와 Ouroboros를 실제로 연결합니다.

```bash
ouroboros setup --runtime hermes
```

공식 Hermes 런타임 가이드에 따르면 이 명령은 보통 아래 작업을 수행합니다.

- `~/.ouroboros/config.yaml`에서 런타임 백엔드를 `hermes`로 설정
- Ouroboros 스킬을 `~/.hermes/skills/autonomous-ai-agents/ouroboros/`에 설치
- Ouroboros MCP 서버를 `~/.hermes/config.yaml`에 등록

### 설정이 끝났는지 확인하는 방법

```bash
cat ~/.ouroboros/config.yaml
cat ~/.hermes/config.yaml
```

특히 아래 개념이 반영되어 있으면 좋습니다.

```yaml
orchestrator:
  runtime_backend: hermes
  hermes_cli_path: ~/.local/bin/hermes
```

> Hermes 위치가 기본 경로가 아니면 `hermes_cli_path`를 직접 맞춰 주세요.

---

## 4. 첫 실습

처음에는 작고 명확한 예제로 연습하는 게 좋습니다.

### 방법 A. Hermes 안으로 들어가서 시작

```bash
hermes

ooo interview "간단한 할 일 관리 CLI를 만들고 싶다"
```

### 방법 B. Hermes 채팅을 한 줄 명령으로 실행

```bash
hermes chat -q "ooo interview '간단한 할 일 관리 CLI를 만들고 싶다'"
```

### 다음 단계

```bash
hermes chat -q "ooo run seed.yaml"
```

### 터미널에서 직접 실행하고 싶다면

```bash
ouroboros init start "간단한 할 일 관리 CLI를 만들고 싶다"
ouroboros run seed.yaml --runtime hermes
```

> 가장 무난한 첫 경험은 `ooo interview`부터 시작하는 것입니다. 처음부터 큰 프로젝트를 던지기보다, 요구사항 질문을 받아보는 경험을 먼저 해보는 편이 좋습니다.

---

## 5. 다른 에이전트에서도 가능한가?

가능합니다. 다만 `2026-04-20` 기준 공개 README를 보면 지원 수준이 동일하지는 않습니다. Ouroboros는 `Claude Code`, `Codex CLI`, `OpenCode`를 명시적으로 안내하고, Gemini CLI는 공식 런타임 가이드가 확인되지 않습니다.

| 에이전트 | 문서상 상태 | 설치/설정 메모 | 초보자 추천도 |
|---|---|---|---|
| `Claude Code` | 공식 지원 | README와 플러그인 설치 경로가 별도로 안내됨 | 매우 높음 |
| `Codex CLI` | 공식 지원 | README에서 자동 감지 대상으로 설명됨 | 높음 |
| `OpenCode` | 공식 지원 | 설치 후 `ouroboros setup --runtime opencode`를 수동 실행 | 중간 이상 |
| `Hermes Agent` | 별도 런타임 가이드 존재 | `ouroboros setup --runtime hermes` 사용 | 높음 |
| `Gemini CLI` | 공식 문서상 불명확 | Quick Start나 런타임 가이드에 직접 지원 안내가 보이지 않음 | 낮음 |

### 한 줄 결론

- **안정적으로 쓰기 좋음:** `Claude Code`, `Codex CLI`
- **사용 가능:** `OpenCode`, `Hermes Agent`
- **지금 문서 기준으로는 보류 권장:** `Gemini CLI`

### 왜 Gemini CLI는 애매한가?

README에는 Ouroboros가 `Claude Code`, `Codex CLI`, `OpenCode`와 동작한다고 직접 적혀 있고, 아키텍처 설명에서도 특히 Claude Code와 Codex CLI를 1급 런타임으로 표현합니다. 반면 Gemini CLI는 같은 수준으로 문서화된 설치/설정 가이드가 보이지 않습니다.

> 따라서 "이론상 연결 가능할 수도 있다"와 "공식적으로 초보자에게 권할 수 있다"는 다릅니다. 현재 공개 문서 기준으로는 Gemini CLI를 공식 지원 런타임이라고 단정하기 어렵습니다.

### 에이전트별 시작 명령 예시

```bash
# Claude Code
claude plugin marketplace add Q00/ouroboros
claude plugin install ouroboros@ouroboros

# Codex CLI
curl -fsSL https://raw.githubusercontent.com/Q00/ouroboros/main/scripts/install.sh | bash

# OpenCode
curl -fsSL https://raw.githubusercontent.com/Q00/ouroboros/main/scripts/install.sh | bash
ouroboros setup --runtime opencode

# Hermes Agent
curl -fsSL https://raw.githubusercontent.com/Q00/ouroboros/main/scripts/install.sh | bash
ouroboros setup --runtime hermes
```

> 처음 입문한다면 가장 안전한 선택은 `Claude Code` 또는 `Codex CLI`입니다. 이미 Hermes를 쓰고 있다면 이 문서의 Hermes 경로를 그대로 따라가면 됩니다.

---

## 6. 초보자에게 추천하는 작업 순서

1. 작은 목표를 정합니다. 예: "로컬에서 쓰는 TODO CLI 만들기"
2. `ooo interview`를 실행합니다. 질문에 구체적으로 답합니다.
3. 생성된 seed를 확인합니다. 목표, 제약, 성공 기준이 맞는지 봅니다.
4. `ooo run` 또는 `ouroboros run ... --runtime hermes`로 실행합니다.
5. 필요하면 `ooo evaluate`나 상태 명령으로 점검합니다.

### 처음에 써보기 좋은 명령들

| 명령 | 추천도 | 왜 좋은가 |
|---|---|---|
| `ooo tutorial` | 매우 높음 | 공식 README에서 대화형 학습용으로 소개됩니다. |
| `ooo interview` | 매우 높음 | Ouroboros의 핵심 가치가 가장 잘 드러납니다. |
| `ooo help` | 높음 | 명령 구조를 빠르게 익히기 좋습니다. |
| `ooo status` | 중간 | 실행 추적을 볼 때 유용합니다. |

### 처음에는 이렇게 프롬프트하세요

```text
ooo interview "로컬 파일에 저장되는 간단한 TODO CLI를 만들고 싶다.
Python으로 만들고 싶고,
우선 기능은 추가/목록/완료 표시만 있으면 된다.
테스트도 함께 있었으면 좋겠다."
```

---

## 7. 자주 막히는 지점

### 1. `hermes version`이 안 됩니다

- 셸 재로딩이 안 되었을 수 있습니다: `source ~/.bashrc`
- 설치가 중간에 멈췄을 수 있습니다. Hermes 설치 스크립트를 다시 실행해 보세요.

### 2. `ouroboros setup --runtime hermes`가 실패합니다

- `hermes` 명령이 PATH에 잡히는지 먼저 확인합니다.
- Ouroboros가 정말 설치되었는지 `ouroboros --help`로 봅니다.
- Python 버전이 3.12 미만이면 Ouroboros 설치 자체가 꼬일 수 있습니다.

### 3. Hermes 안에서 `ooo` 명령이 안 보입니다

- 보통 setup 단계가 충분히 끝나지 않았다는 뜻입니다.
- `ouroboros setup --runtime hermes`를 다시 실행해 보세요.
- `~/.hermes/config.yaml`와 스킬 설치 경로를 확인하세요.

### 4. 뭘 먼저 해야 할지 감이 안 옵니다

- 처음부터 큰 앱을 주지 마세요.
- `ooo tutorial` 또는 아주 작은 `ooo interview`로 시작하세요.
- 목표, 제약, 성공 기준을 3문장으로 적고 들어가면 훨씬 수월합니다.


----
### 📜출처(참고 문헌)  


## 참고 자료

- [Q00/ouroboros GitHub 레포](https://github.com/Q00/ouroboros)
- [Ouroboros README](https://raw.githubusercontent.com/Q00/ouroboros/main/README.md)
- [Ouroboros Hermes 런타임 가이드](https://raw.githubusercontent.com/Q00/ouroboros/main/docs/runtime-guides/hermes.md)
- [Ouroboros 설치 스크립트](https://raw.githubusercontent.com/Q00/ouroboros/main/scripts/install.sh)
- [Ouroboros pyproject.toml](https://raw.githubusercontent.com/Q00/ouroboros/main/pyproject.toml)
- [NousResearch/hermes-agent GitHub 레포](https://github.com/nousresearch/hermes-agent)
- [Hermes 공식 설치 문서](https://hermes-agent.nousresearch.com/docs/getting-started/installation/)
- [Hermes 설치 스크립트](https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh)
- [Hermes 릴리스 페이지](https://github.com/NousResearch/hermes-agent/releases)

이 문서는 `2026-04-20` 기준으로 공개 문서를 확인해 작성했습니다. 실제 설치 과정은 운영체제, 셸 설정, PATH, Python 버전에 따라 조금 달라질 수 있습니다.


----
### 🔗연결 문서


