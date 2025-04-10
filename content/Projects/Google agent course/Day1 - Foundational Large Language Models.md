---
title: Day1-Foundational LLM
date: 2025-04-10 15:49
tags:
  - Google
  - LLM
---

Created at : 2025-04-10 15:49  
Auther: Soo.Y  

----
### 📝메모 

# Day1 자료
- [Whitepaper Companion Podcast - Foundational LLMs & Text Generation](https://www.youtube.com/watch?v=Na3O4Pkbp-U&list=PLqFaTIg4myu_yKJpvF8WE2JfaG5kGuvoE&index=1)
- [Foundational Large Language Models & Text Generation | Kaggle](https://www.kaggle.com/whitepaper-foundational-llm-and-text-generation)

# Large language models

거대언어모델은 단어 스퀀스의 확률을 예측한다. 일반적으로 텍스트의 접두사가 주어지면 언어 모델은 후속 단어에 확률을 계산한다. 예를 들어 "미국에서 가장 유명한 도시는..." 이라는 접두사가 주어진 언어 모델은 "뉴욕" 및 "로스앤젤레스"라는 단어에 높은 확률이 나타나고 "사과", "노트북"와 같은 단어네느 낮은 확률을 예측한다.
Transformer가 연구되기 전에는 순한 신경망(RNN)이 시퀀스 모델링에 대한 인기 있는 접근 방식이었습니다. RNN은 입력 및 출력 시퀀스를 순차적으로 처리한다. 이전 은닉 상태와 현재 입력에 따라 은닉 상태 시퀀스를 생성한다. RNN 단점으로 순차적인 계산으로 인해 병렬화하기 어렵다.
트랜스포머(Transformer)는 self-attention 메커니즘 덕분에 토큰 시퀀스를 병렬로 처리할 수 있는 신경망의 한 유형이다. 다만 트랜스포머는 컨텍스트 크기를 제한적으로 사용해야 하는 단점을 가지고 있다. 반면에 RNN은 이론적으로 무한한 컨텍스트 길이를 가질 수 있지만, 그래디언트 소실로 인해 활용하는데 어려움이 많다. 그래서 트랜스포머는 최근 몇 년 동안 거대언어모델에서 채택되고 있다.

## Transformer

Transformer architecture은 2017년에 번역 모델 사용을 위해 구글에서 개발되었다. 초기 트랜스포머 아키텍처는 인코더와 디코더의 2 부분으로 구성되었다. 인코더는 입력 텍스트(예 프랑스어 문장)를 변환하고 변환된 값이 디코더에 전달된다. 디코더는 이 표현을 사용하여 출력 텍스트(예: 번역된 문장)를 자기 회귀적으로 생성한다. 전체적인 구조는 아래 그림과 같다.

트랜스포머는 여러 계층으로 구성된다. 신경망의 계층은 데이터에 특정 변환을 수행하는 매개변수의 집합으로 구성된다. 그림에서 볼 수 있듯이 Multi-Head Attention, Add & Norm, Feed-Forward, Linear, Softmax 등 여러 계층이 포함되어 있다. 계층은 입력, 숨겨진 및 출력 계층으로 세분화할 수 있다.

![[Pasted image 20250410182125.png]]

### Input preparation and embedding

트랜스포머를 위한 언어 입력을 준비하기 위해서 입력 시퀀스를 토큰으로 변환한 다음 입력 임베딩으로 변환한다. 입력 입베딩을 생성하는 과정에는 다음과 같은 단계가 포함된다.

1. 정규화(선택사항) : 불필요한 공백, 악센트 등을 제거하여 텍스트를 표준화한다.
2. 토큰화 : 문장을 단어 또는 서브웓드로 나누고 어휘에서 정수 토큰 ID로 매팅한다.
3. 임베딩 : 각 토큰 ID를 해당 고차원 벡터로 변환하며, 일반적으로 룩업 데이터를 사용한다. 이러한 벡터는 훈련 과정에서 학습된다.
4. 위치 인코딩 : 스퀀스에서 각 토큰의 위치에 대한 정보를 추가한다.

### Multi-head attention

입력 토큰을 임베딩 벡터로 변환한 후, 이 임베딩을 다중 헤드 어텐션 모듈에 입력한다. self-attention은 트랜스포머에서 중요한 메커니즘이다. 입력 시퀀스의 특정 부분에 집중하고, 기존의 RNN보다 스퀀스 내의 장거리 의존성을 더 효과적으로 포착할 수 있다.

## Understanding self-attention

다음 문장을 예시로 사용해보자.
"The tiger jumped out of a tree to get a drink because it was thirsty."
self-attention은 문장에서 단어와 구절 간의 관계를 파악하는데 도움이 된다. 예를 들어 이 문장에서 "tiger"와 "it"은 동일한 객체이므로 이 두 단어는 강하게 연결되어 있을 것으로 예상된다. self-attention는 다음 단계를 통해 이를 달성한다.

1. 쿼리(Query), 키(Key), 값(Value)을 생성한다. 입력 임베딩 각각은 학습된 가중치 행렬 3개(Wq, Wk, Wv)에 곱하여 Q, K, V 벡터를 생성한다. 이들은 각 단어의 전문화된 표현과 유사하다.
	1. 쿼리 : 쿼리 벡터는 모델이 "어떤 다른 단어들이 저에게 관련이 있습니까?"라는 질문을 던지는데 도움이 된다.
	2. 키 : 키 벡터는 모델이 스퀀스에서 단어가 다른 단어와 어떻게 관련될 수 있는지 식별하는 데 도움이 되는 레이블과 같다.
	3. 값 : 값 벡터는 실제 단어 내용 정보를 보유 한다.

2. 점수 계산 : 점수는 각 단어가 다른 단어에 얼마나 '주의'해야 하는지를 결정하기 위해 계산된다. 이는 한 단어의 쿼리 벡터를 시퀀스의 모든 단어의 키 벡터와 내적함으로써 수행된다.
3. 정규화 : 안정성을 위해 키 벡터 차원(dk)의 제곱근으로 점수를 나눈 다음 소프트맥스 함수를 통해 attention 가중치를 얻는다. 이러한 가중치는 각 단어가 다른 단어와 얼마나 강하게 연결되어 있는지 의미한다.
4. 가중치 부여된 값 : 각 Value 벡터는 해당 어텐션 가중치와 곱해진다. 그 결과는 더해여 각 단어에 대한 문맥 인식 표현을 생성한다.

![[Pasted image 20250410184032.png]]

## Multi-head attention: power in diversity

### Layer normalization and residual connections

### Feedforward layer

### Encoder and decoder

### Mixture of Experts(MoE)

### Training the transformer

## Data preparation

## Training and loss function

# The evolution of transformers


# Fine-tuning large language models

# Using large language models

## Prompt engineering

## Sampling Techniques and Parameters

## Task-based Evaluation

# Accelerating inference




----
### 📜출처(참고 문헌)  


----
### 🔗연결 문서


