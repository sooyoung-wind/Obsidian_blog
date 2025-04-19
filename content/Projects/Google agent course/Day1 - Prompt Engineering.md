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

#### Top-P 샘플링
- 누적 확률이 P 이하가 될 때까지 확률이 높은 토큰들을 유동적으로 선택

예:
- P = 0.9 -> 상위 도큰들의 누적 확률이 90%에 도달할 때까지 후보군 생성
- 이 중 무작위로 1개 선택

Top-P 값
- P=0 : Greedy decoding
- P 작을수록 : 보수적, 단정적인 결과
- P 클수록 : 유연하고 창의적, 다양한 후보 고려(P = 1이면 전체 토큰 중 선택 가능)

#### Top-K, Top-P 무엇을 써야 할까?
- Top-K는 정해진 수(k개)만 고려함
- Top-P는 누적 확률(P) 기준으로 상황에 따라 후보 수가 달라짐 -> Top-P가 더 유연하고 자연스러운 결과를 내는 경우가 많음

**Tip**
- 두 기법은 함께 사용해도 좋다. -> 예 : Top-K : 50 and Top-P : 0.95

### ✅ 요약 비교표

| 항목         | Top-K                             | Top-P (Nucleus Sampling) |
| ---------- | --------------------------------- | ------------------------ |
| 기준         | 확률 상위 K개의 토큰                      | 누적 확률이 P 이하인 토큰들         |
| 고정/유동      | **고정된 개수**                        | **유동적인 개수**              |
| K/P 작을 때   | 더 정확하고 보수적인 출력                    | 더 정제된 예측                 |
| K/P 클 때    | 더 창의적이고 다양한 출력                    | 더 유연하고 풍부한 언어 생성 가능      |
| K=1 or P=0 | Greedy decoding (가장 확률 높은 토큰만 사용) |                          |

## 🧾 LLM 샘플링 설정 요약 카드

|설정 항목|역할|값이 낮을 때|값이 높을 때|특징 요약|
|---|---|---|---|---|
|🌡️ **Temperature**|무작위성 조절|더 결정적이고 예측 가능한 결과  <br>(정확, 일관)|더 창의적이고 다양성 있는 결과  <br>(예측 불가, 실험적)|확률 분포를 날카롭게/부드럽게 만듦|
|🔢 **Top-K**|상위 K개 중 선택|상위 몇 개만 선택 → 보수적|선택 폭 넓음 → 창의적|고정된 개수만 후보로 사용|
|🎯 **Top-P**  <br>(Nucleus Sampling)|누적 확률 P 이내에서 선택|상위 확률 토큰만 선택 → 안정적|다양한 후보 포함 → 풍부한 표현|누적 확률 기준, 동적 후보 수|

---

### ✅ Greedy Decoding 조건

|방식|설정|
|---|---|
|Temperature = 0|무조건 확률 1위 선택|
|Top-K = 1|1개만 후보|
|Top-P = 0|누적 확률이 0 넘으면 컷 →|

**모두 결정적(deterministic) 결과 생성**

---

### 🧠 사용 팁

| 사용 목적                    | 추천 설정                                                          |
| ------------------------ | -------------------------------------------------------------- |
| 정답이 있는 작업 (분류, 요약, QA 등) | Temperature = 0~0.3<br>Top-K = 10~20  <br>Top-P = 0.8~0.9      |
| 자연스러운 대화                 | Temperature = 0.7~0.9<br>Top-K = 40~50  <br>Top-P = 0.9~0.95   |
| 창의적인 글쓰기                 | Temperature = 1.0 이상  <br>Top-K = 100 이상  <br>Top-P = 0.95~1.0 |

### Putting it all together

Temperature, Top-K, Top-P그리고 생성할 토큰 수를 어떻게 설정할지는 사용 목적과 워하는 출력 결과에 따라 달라집니다. 이 설정들은 서로 영향을 주기 때문에, 선택한 모델이 이 샘프링 설정들을 어떻게 함께 처리하는지 이해하는 것도 중요하다.

#### 설정들이 함께 작동하는 방식

- Temperature, Top-K, Top-P가 모두 사용 가능한 경우
	- 모델은 Top-K 및 Top-P 기준을 모두 통과한 토큰들을 후보로 설정한 뒤, Temperature 값을 적용해 그 후보들 중 하나를 샘플링한다.
- Top-K 또는 Top-P만 사용 가능한 경우
	- 마찬가지로 해당 조건만 적용해 토큰을 선택한다.
- Temperature가 없는 경우
	- Top-K 및/또는 Top-P 기준을 만족하는 토큰들 중 무작위로 하나를 선택해 다음 토큰을 생성한다.

#### 극단적인 설정 값의 영향

샘플링 설정 값이 극단적으로 설정되면, 그 설정이 다른 설정을 무력화하거나 의미 없게 만들 수 있다.

**Temperature 관련**
- Temperature = 0일 경우
	- Top-K와 Top-P는 무의미해진다.
	- 가장 확률이 높은 토큰이 무조건 선택된다.
- Temperature가 매우 높은 값(예: 1이상, 10대 수치)일 경우
	- Temperature 자체가 무의미해지고, Top-K/Top-P 조건만 만족하면 완전히 무작위로 선택된다.

**Top-K 관련**
- Top-K = 1일 경우
	- Temperature와 Top-P는 무의미해진다.
	- 가장 확률 높은 1개 토큰만 후보가 되므로, 항상 그 토큰이 선택된다.
- Top-K가 매우 큰 값(예: 모델 전체 어휘 수)일 경우:
	- 확률이 0이 아닌 모든 토큰이 후보가 되며, 실질적으로 선택에서 제외되는 토큰이 없음

**Top-P 관련**
- Top-P = 0일 경우
	- 대부분의 구현에서 가장 확률 높은 단 하나의 토큰만 후보가 됨
	- Temperature 및 Top-K는 무의미해짐
- Top-P = 1일 경우
	- 확률이 0이 아닌 모든 토큰이 후보가 되며, 실질적으로 제거되는 토큰 없음

#### 🎯 추천 시작점 (설정 예시)

|목적|추천 설정|
|---|---|
|**균형 잡힌 결과 (적당히 창의적이고 논리적인 응답)**|Temperature = 0.2  <br>Top-P = 0.95  <br>Top-K = 30|
|**창의성 강조**|Temperature = 0.9  <br>Top-P = 0.99  <br>Top-K = 40|
|**정확성 강조 (논리적 문제 해결 등)**|Temperature = 0  <br>(Top-K, Top-P는 무의미해짐)|
|**덜 창의적인 응답 희망 시**|Temperature = 0.1  <br>Top-P = 0.9  <br>Top-K = 20|

> 주위! 설정을 더 자유롭게 할수록 모델이 덜 관련성 있는 문장을 생성할 위험도 커진다.

#### 반복 루프 현상(Repetition Loop Bug)

LLM 응답이 같은 단어 또는 문장을 반복하며 끝나는 현상, 즉 채움말(Filler word)이 길게 이어지는 버그를 경험한 적 있나요?
이것이 바로 Repetition Loop Bug 즉 모델이 반복적인 구조에 갇히는 일반적인 현상이다. 이 현상은 다음과 같은 설정에서 발생할 수 있다.

**Temperature가 낮을 때(과도한 결정성)**
- 모델이 항상 가장 높은 확률인 경로만 고집하게 되고 이전 출력과 반복되는 경로로 빠지게 된다.

**Temperature가 높을 때(과도한 무작위성)**
- 무작위로 선택된 단어가 우연히 이전 문장을 다시 유도할 수 있음
- 후보 토큰 수가 많아질수록, 이전 상태로 돌아갈 가능성도 커짐 -> 순환 루프에 빠지게 됨

**해결방법**
- Temperature, Top-K, Top-P 값을 세심하게 조정하여 결정성과 무작위성 사이의 균형점을 찾아야 한다.


# Prompting techniques

LLM은 지시를 따르도록 튜닝되어 있으며, 방대한 데이터로 학습되어 있기 때문에, 프롬프트를 이해하고 그에 따른 응답을 생성할 수 있다. 하지만 LLM은 완벽한 존재는 아니다. 따라서 프롬프트가 명확하고 구체적일수록 LLM이 적절한 다음 텍스트를 예측하는 데 더 도움이 된다.

또한, LLM이 어떻게 학습되고 작동하는지를 이해하고 그에 맞춰 프롬프트를 설계하는 특정 기술들을 사용하면 훨씬 더 정확하고 원하는 결과를 얻을 수 있다.
이제 우리는 프롬프트 엔지니어링이 무엇인지, 그리고 어떤 요소들이 필요한지를 이해했으니, 지금부터는 가장 핵심적인 프롬프팅 기법들에 대해 알아보겠다.

## General prompting / zero shot

제로샷(Zero-shot) 프롬프트는 가장 간단한 형태의 프롬프트이다. 이 방식은 단순히 작업에 대한 설명과 시작할 텍스트만 LLM에게 제공한다. 이 입력은 질문, 이야기의 시작, 지시문 등 어떤 형태든 가능하다. 제로샷이라는 이름은 예시가 전혀 없다는 뜻이다.

**실습 예시(Vertex AI Studio 사용)**

예를 들어 Vertext AI의 Vertex AI Studio(언어용)를 사용하면 프롬프트를 실험해볼 수 있는 플레이그라운드 환경이 제공된다. 아래 표에는 영화 리뷰를 분류하는 제로샷 프롬프트의 예시가 나와 있다.

![[Pasted image 20250417145535.png]]


**프롬프트 문서화 Tip**
위와 같은 표 형태로 프롬프트를 정리하는 것은 프롬프트를 기록하고 관리하는 데 매우 좋은 방법이다. 프롬프트는 코드베이스에 들어가기 전까지 여러 번 수정과 실험을 거치게 되므로, 구조화된 방식으로 프롬프트 엔지니어링 과정을 기록하는 것이 중요하다.

**예시 프롬프트의 포인트**
- 문장에 disturbing(불편한)과 masterpiece(걸작)라는 상반된 단어가 함께 포함되어 있어 모델에게는 조금 더 어려운 분류 작업이 된다.

**다음 단계: One-shot / Few-shot**
- 만약 제로샷 프롬프트가 제대로 작동하지 않는다면, 프롬프트에 예시를 한두 개 추가할 수 있다.
- 이런 방식이 바로 원샷(one-shot) 또는 퓨삿(few-shot) 프롬프팅으로 이어진다.

## One-shot & few-shot

AI 모델을 위한 프롬프트를 만들 때, 예시를 함께 제공하는 것이 매우 도움이 된다. 이러한 예시는 모델이 무엇을 요구하는지 이해하고 원하는 출력 구조나 패턴을 따르도록 유도하는 데 효과적이다.

**One-shot 프롬프팅**
- 예시 1개만 제공하는 방식
- 이름처럼 한 번의 샷으로 모델이 참고할 수 있는 패턴을 단 하나 보여주는 프롬프팅
- 모델은 그 예시를 모방(imitate)하여 작업을 수행

**Few-shot 프롬프팅**
- 2개 이상의 예시를 제공하여, 모델이 따라야 할 명확한 패턴을 학습한다.
- One-shot과 원리는 같지만, 예시가 여러 개이기 때문에 모델이 패턴을 더 잘 파악하고 일관성 있는 응답을 생성할 확률이 높아진다.

**Few-shot에서 필요한 예시 수는?**

예시 개수는 아래 조건에 따라 달라질 수 있습니다:

| 조건             | 설명                          |
| -------------- | --------------------------- |
| 🧩 작업의 복잡도     | 복잡할수록 더 많은 예시 필요            |
| ✨ 예시의 품질       | 고품질 예시일수록 적은 수로도 가능         |
| 🧠 사용하는 모델의 성능 | 고성능 모델일수록 적은 예시로도 학습 가능     |
| 🔠 입력 길이 제한    | 예시가 많아지면 전체 입력 길이를 초과할 수 있음 |

📌 일반적으로는 **3~5개의 예시**가 권장되지만, 작업에 따라 더 많거나 적게 조절할 수 있습니다.


```python
Parse a customer's pizza order into valid JSON:

EXAMPLE:
I want a small pizza with cheese, tomato sauce, and pepperoni.  
JSON Response:  
{
  "size": "small",
  "type": "normal",
  "ingredients": [["cheese", "tomato sauce", "peperoni"]]
}

EXAMPLE:
Can I get a large pizza with tomato sauce, basil and mozzarella  
JSON Response:  
{
  "size": "large",
  "type": "normal",
  "ingredients": [["tomato sauce", "bazel", "mozzarella"]]
}

Now, I would like a large pizza, with the first half cheese and mozzarella.  
And the other tomato sauce, ham and pineapple.  
JSON Response:
{
  "size": "large",
  "type": "half-half",
  "ingredients": [["cheese", "mozzarella"], ["tomato sauce", "ham", "pineapple"]]
}

```

**예시 선택 시 유의사항**
- 예시는 반드시 과업과 밀접하게 관련된 내용이어야 한다.
- 예시는 다양성 있게, 잘 작성된 문장으로, 명확하게 정확하게 구성되어야 한다.
- 예시 중 작은 실수 하나만 있어도, 모델이 혼란을 겪어 원하지 않는 출력을 생성할 수 있다.

**엣지 케이스 포함하기**
- 다양한 입력에 유연하게 대응하는 출력을 원한다면, 예시에 엣지 케이스를 포함시키는 것이 중요하다.
- 엣지 케이스란? 일반적이지 않거나 예상치 못한 입력이지만 모델이 여전히 올바르게 처리해야 하는 경우이다.

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


