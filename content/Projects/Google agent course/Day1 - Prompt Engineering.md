---
title: Day1 - Prompt Engineering
date: 2025-04-11 18:23
tags:
  - Google
  - LLM
  - prompt
---

Created at : 2025-04-11 18:23  
Auther: Soo.Y  

----
### 📝메모 

# Day1 자료
[Prompt Engineering | Kaggle](https://www.kaggle.com/whitepaper-prompt-engineering)
[Day 1 - Prompting](https://www.kaggle.com/code/markishere/day-1-prompting)
[Day 1 - Evaluation and structured output](https://www.kaggle.com/code/markishere/day-1-evaluation-and-structured-output)
 

# Prompt engineering

LLM은 일종의 예측 엔진이다. 입력되는 연속된 텍스트를 바탕으로 다음에 오는 단어(토큰)을 하나씩 예측한다. 예측된 토큰은 입력 뒤에 추가되어 다음 토큰을 예측하는데 사용된다. 이 모든 예측은 모델이 훈련 중에 본 데이터를 기반으로 이루어진다.

**프롬프트란?**

프롬프트(prompt) - 모델에게 작업을 지시하는 입력 문장
- 프롬프트는 LLM이 어떤 응답ㄷ을 생성할지 방향을 제시한다.
- 프롬프트가 잘 설계될수록 더 정확하고 유용한 출력을 얻을 수 있다.

**프롬프트 엔지니어링이란?**

프롬프트 엔지니어링 = LLM이 원하는 결과를 잘 생성하도록프롬프트를 설계 및 최적화하는 과정
주요 작업
- 고품질의 프롬프트 설계
- 프롬프트 길이 최적화
- 문체 및 구조 조정
- 다양한 시도와 실험을 통해 가장 적합한 형태 찾기

**프롬프트로 가능한 작업들**

프롬프트를 통해 LLM은 아래와 같은 다양한 작업 수행이 가능하다.

| 작업 종류       | 설명                        |
| ----------- | ------------------------- |
| 텍스트 요약      | 긴 문장을 간단하게 요약             |
| 정보 추출       | 문장에서 특정 정보 뽑아내기           |
| 질의응답 (QA)   | 질문에 답변 생성                 |
| 텍스트 분류      | 감정 분류, 주제 분류 등            |
| 언어/코드 번역    | 영어 → 한국어, Python → Java 등 |
| 코드 생성/설명/추론 | 코드 작성, 주석 추가, 동작 설명 등     |

**프롬프트 작성 시 유의사항**

- 사용하는 모델이 따라 최적화 전략이 다름
	- Gemini, GPT, Claude, Gemma, LLaMA 등
- 모델 설정값(온도, 토큰 수, Top-p 등)도 함께 조절하면 효과적

# LLM output configuration

**모델을 선택한 후엔?**
모델을 선택했다면, 이제 모델 설정을 조정해야 한다. 대부분의 LLM은 출력에 영향을 주는 다양한 설정 옵션을 제공한다. 효과적인 프롬프트 엔저니어링을 위해서는 이 설정들을 과엽(task)에 맞게 조정해야 한다.

## Output length

출력 길이(Output length)은 생성할 토큰의 최대 수를 정하는 설정이다.

**왜 중요한가?**
출력 길이가 길어질수록
- LLM의 계산량이 많아지고
- 에너지 소비 증가
- 응답 시간 지연
- 운영 비용 상승
반대로 출력 길이가 줄인다고 해서 모델이 더 간결하게 글을 쓰는 것은 아니다. -> 단지, 정해진 토큰 수에 도달하면 멈출 뿐이다.

**프롬프트와의 관계**
- 만약 짧은 응답이 필요한 경우, 단순히 출력 길이를 제한하는 것만으로는 부족할 수 있다.
- 이럴 때는 프롬프트 자체도 간결하게 구성해야 원하는 길이의 응답을 유도할 수 있다.

**ReAct 등의 기법에서는?**
- 일부 프롬프트 전략에서는 원하는 응답 이후에도 LLM이 불필요한 토큰을 계속 생성하는 문제가 발생했다.
- 이때는 출력 길이 제한 설정이 매우 중요하다.

## Sampling controls

**LLM은 어떻게 토큰을 생성할까?**
LLM은 다음 토큰을 하나만 정확히 예측하지 않는다. 대신, 모든 토큰에 대해 확률 분포를 예측한다.
- 각 토큰은 다음에 나올 수 있는 확률을 가지고 있음
- 그 확률 분포에서 하나의 토큰을 샘플링해서 출력한다. -> 즉, 무작위성이 반영된 예측이다.

LLM의 샘플링 방식은 주로 다음 세 가지 설정으로 조정할 수 있다.
1. Temperature(온도)
2. Top-K
3. Top-P

### Temperature

온도(Temperature)는 다음 토큰을 선택할 때 무작위성(randomness)의 정도를 조절하는 설정이다. LLM은 각 토큰에 대해 예측 확률을 계산한다. 온도는 이 확률 분포를 날까롭게 또는 부드럽게 조정해서, 결과가 더 결정적이거나 창의적이 되도록 유도한다.

**온도 값에 따른 특징**
- 0(zero) : 완전히 결정적(deterministic)으로 항상 가장 높은 확률의 토큰을 선택함. 단, 두 토큰이 동일한 최고 예측 확률을 가질 경우, 동점 해결 방식에 의해 온도 0일 때도 항상 동일한 출력을 얻지 못할 수 있다.
- 최댓값에 가까운 온도는 더 많은 무작위 출력을 생성하는 경향이 있다. 그리고 온도가 높아질수록 모든 토큰이 다음에 예측될 토큰으로 동일한 가능성을 갖게 된다.

**Gemini에서의 온도는 Softmax의 T와 유사함**

**언제 어떤 온도를 쓰면 좋을까?**

| 사용 목적                 | 추천 온도       |
| --------------------- | ----------- |
| 정답이 정해진 과업 (QA, 분류 등) | `0 ~ 0.3`   |
| 자연스러운 대화, 일반 응답       | `0.7 ~ 0.9` |
| 창의적인 글쓰기, 스토리 생성      | `0.9 ~ 1.3` |


### Top-K and top-P

LLM이 다음 토큰을 예측할 때 확률이 높은 후보들 중에서만 선택하도록 제한하는 기법들이다. 

#### Top-K 샘플링
- 가장 확률이 높은 K개의 토큰만 후보로 사용
- 그 안에서 무작위로 1개 선택

Top-K 값
K = 1 : Greedy decoding (무조건 확률 1위 토큰 선택)
K 작을수록 : 덜 창의적, 더 정확하고 안정적인 응답
K 클수록 : 더 다양한 표현, 창의성 증가

### Putting it all together

# Prompting techniques

## General prompting / zero shot

## One-shot & few-shot

## System, contextual and role prompting

### System prompting

### Role prompting

### Contextual prompting

## Step-back prompting

## Chain of Thought(CoT)

## Self-consistency

## Tree of Thoughts(ToT)

## ReAct(reason & act)

## Automatic Prompt Engineering

## Code prompting

### Prompts for writing code

### Prompts for explaining code

### Prompts for translating code

### Prompts for debugging and reviewing code

### What about multimodal prompting?

# Best Practices

## Provide examples

## Design with simplicity

## Be specific about the output

## Use Instructions over Constraints

## Control the max token length

## Use variables in prompts

## Experiment with input formats and writing styles

## For few-shot prompting with classification taks, mix up the classes

## Adapt to model updates

## Experiment with output formats

## JSON Repair

## Working with Schemas

## Experiment together with other prompt engineers

## CoT Best practices

## Document the various prompt attempts



----
### 📜출처(참고 문헌)  


----
### 🔗연결 문서


