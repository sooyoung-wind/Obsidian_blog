# 1. Prompt 기본 개념
- Prompt란? -> AI 모델에 주는 명령어 + 맥락
- 좋은 Prompt 특징
	- 명확성 : 구체적이고 모호하지 않음
	- 맥락 제공 : 배경 정보, 제약 조건 포함
	- 예시 제공 : Few-shot, Zero-shot, Chain-of-Thought

# 2. Prompt 설계 기법
- Zero-shot Prompting : 예시 없이 질문
- Few-shot Prompting : 예시 몇 개 제공
- Chain-of-Thought (CoT) : 단계별 사고 유도
- Role Prompting : 모델에게 역할 부여

# 3. Prompt 관리 전략
- 버전 관리 : GitHub, PromptLayer
- 템플릿화 : 반복 작업용 Prompt 템플릿
- Prompt 라이브러리 : 팀 단위 공유

# 4. 실습 예제

#### 예제 1: Zero-shot vs Few-shot

**Zero-shot Prompt**

```
"스마트워치에서 심박수 데이터를 분석하는 방법을 설명해줘."
```

**Few-shot Prompt**

```
"아래 예시를 참고해 스마트워치 심박수 분석 방법을 설명해줘.
예시:
- 데이터: 심박수 측정값
- 정보: 평균 대비 변화율
- 지식: 건강 상태 평가
- 지혜: 행동 권장사항
이제, 혈압 데이터를 같은 방식으로 설명해줘."
```

#### **예제 2: Chain-of-Thought**

```
"스마트워치 심박수 데이터가 평균보다 50% 높습니다. 단계별로:
1. 데이터 → 정보 → 지식 → 지혜로 변환
2. 각 단계에서 어떤 분석이 필요한지 설명
3. 최종적으로 어떤 행동을 권장할지 제안"
```

#### **예제 3: Role Prompting**

```
"너는 헬스케어 AI 전문가야. 스마트워치 데이터를 기반으로 건강 리포트를 작성해줘. 리포트는:
- 데이터 요약
- 위험도 평가
- 행동 권장사항
형식: Markdown"
```

# 5. Prompt 관리 도구
- PromptLayer : Prompt 버전 관리
- LangChain : Prompt 체인 구성
- Weight & Biases : 실험 추적

## Prompt 관리 도우의 핵심 기능
1. 프롬프트 버전 관리
	- 변경 이력 추적, 롤백 가능
	- Git 스타일 관리 또는 시각적 UI 제공
2. 프롬프트 실험 및 평가
	- A/B 테스트, 자동화된 평가(Evals)
	- 모델별 성능 비교, 비용 분석
3. 협업 및 접근 제어
	- 팀 단위 편집, 코멘트, 권한 관리
	- 비기술자도 참여 가능한 시각적 편집기
4. 통합 및 확장성
	- OpenAI, LangChain, HuggingFace 등과 연동
	- API 기반 자동화 지원

## Prompttools

Github : 
https://github.com/hegelai/prompttools?utm_source=pytorchkr&ref=pytorchkr

- 오픈소스, 무료
- 데이터 연결 및 Prompt 기반 검색 강화
- 실험 결과를 저장/재현/시각화(탭/그래프)하는 워크플로로 프롬프트/매개변수 비교
- 로컬/호스티드 플레이그라운드 제공(Streamlit UI)
- 오픈소스/자체 호스팅으로 LLM/VectorDB/프롬프트를 체계적으로 비교, 평가, 시각화하고 싶은 연구/엔지니어 팀
- 운영 및 유지보수를 스스로 해야하며, 팀 내 플랫폼화는 추가 작업(인증/권한/배포)이 필요


