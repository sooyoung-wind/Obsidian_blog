---
title: Ver01 연구 결과물
date: 2024-05-13 11:40
tags:
  - LLM
  - Report
---

Created at : 2024-05-13 11:40  
Auther: Soo.Y  


# Ver 01 연구 결과물

Ver 01에 대한 전체 프로세스는 아래 그림과 같이 구성되었습니다.

- prompt 유출을 방지하기 위해서 고성능 LLM 모델을 채택하고 있음
- 약어를 풀네임으로 변경하여 LLM 모델이 약어에 대한 의미를 정확하게 알 수 있도록 구성함
- 답변이 적절한지 판단해서 부족하다면 RAG를 동작하도록 구성함

![[Pasted image 20240513114149.png]]

# Cast study

각 모델별 ref는 기존 프롬프트(feat. 연빈, 재민, 지원)만 적용한 경우를 의미하고 ours는 개선된 프롬프트 및 프로세스를 의미함

예)  GPT4.0(ref) : 기존 프롬프트만 적용하여 질문에 답변
	GPT3.5(ours) : 개선된 프로세스를 적용하여 질문에 답변

## 1. 질문 : ReLU에 대해서 알려줘.

### 답변 결과

#### GPT4.0(ref)
ReLU(Rectified Linear Unit)는 인공 신경망에서 사용되는 활성화 함수 중 하나입니다. 이 함수는 입력이 0보다 클 경우 그 입력을 그대로 출력하고, 0 이하일 경우 0을 출력합니다. 수학적으로는 ReLU 함수는 f(x) = max(0, x)로 표현됩니다.

ReLU 함수는 다음과 같은 특징을 가지고 있습니다:

1. **비선형성**: ReLU는 비선형 함수이기 때문에 신경망이 선형 문제뿐만 아니라 비선형 문제도 해결할 수 있게 해줍니다.
2. **계산 효율성**: ReLU의 계산이 매우 간단하기 때문에, 다른 활성화 함수에 비해 계산 비용이 낮습니다. 이는 신경망의 학습 속도를 높여줍니다.
3. **기울기 소실 문제 완화**: 심층 신경망에서는 기울기가 네트워크를 거슬러 올라갈 때 점점 작아지는 기울기 소실 문제가 발생할 수 있습니다. ReLU를 사용하면 이 문제를 어느 정도 완화할 수 있습니다. 그러나 ReLU는 입력이 음수일 때 기울기가 0이 되므로, 이러한 경우에는 기울기가 전혀 전파되지 않는 "죽은 ReLU" 문제가 발생할 수 있습니다.

ReLU 활성화 함수는 다음과 같은 Python 코드로 구현할 수 있습니다:

import numpy as np

def relu(x):
	return np.maximum(0, x)

이 코드는 `numpy` 라이브러리의 `maximum` 함수를 사용하여 입력 `x`와 0 중에서 더 큰 값을 반환합니다. 이는 ReLU 함수의 정의에 따른 것입니다.

ReLU는 그 간단함과 효율성 때문에 많은 신경망 구조에서 기본적으로 사용되는 활성화 함수 중 하나입니다.

#### GPT3.5(ours)
ReLU(Recitified Linear Unit)은 인공신경망에서 사용되는 활성화 함수 중 하나입니다. ReLU 함수는 입력값이 0보다 작을 때는 0을 출력하고, 0보다 큰 값에 대해서는 그 값을 그대로 출력합니다. 이 함수는 비선형성을 가지고 있으며, 기존의 시그모이드 함수나 하이퍼볼릭 탄젠트 함수와 비교하여 학습 속도가 빠르고 효율적으로 학습할 수 있는 장점이 있습니다. 따라서 현재 많은 인공신경망 모델에서 ReLU 함수가 주로 사용되고 있습니다.


#### GPT3.5(ref)
  ReLU(Recitified Linear Unit)은 인공신경망에서 사용되는 활성화 함수 중 하나입니다. ReLU 함수는 입력값이 0보다 작을 때는 0을 출력하고, 0보다 큰 값에 대해서는 입력값을 그대로 출력합니다. 이 함수는 비선형성을 가지고 있으며, 기존의 시그모이드 함수나 하이퍼볼릭 탄젠트 함수와 비교하여 학습 속도를 향상시키고, 그래디언트 소실 문제를 완화시키는 효과가 있습니다. 따라서 ReLU 함수는 인공신경망에서 주로 사용되는 활성화 함수 중 하나입니다.


#### Opus(ref)

안녕하세요 학생 여러분! ReLU에 대해 설명 드리겠습니다.

ReLU는 Rectified Linear Unit의 약자로, 인공신경망(Artificial Neural Network)에서 활성화 함수(Activation Function)로 자주 사용됩니다. ReLU 함수는 입력값이 0보다 작으면 0을, 0보다 크거나 같으면 입력값 그대로를 출력합니다. 수식으로 표현하면 다음과 같습니다:

ReLU(x) = max(0, x)

Python에서는 다음과 같이 구현할 수 있습니다:

def relu(x):
	return max(0, x)

ReLU의 장점은 다음과 같습니다:

1. 계산이 빠르고 효율적입니다.
2. Gradient Vanishing 문제를 완화시킵니다.
3. Sparsity를 증가시켜 네트워크의 일반화 성능을 향상시킵니다.

하지만 ReLU의 단점도 있습니다:

1. 입력값이 음수일 때 기울기가 0이 되어 뉴런이 비활성화될 수 있습니다. 이를 "Dying ReLU" 문제라고 합니다.
2. 출력값이 무한대로 발산할 수 있습니다.

이러한 단점을 보완하기 위해 Leaky ReLU, ELU(Exponential Linear Unit) 등의 변형된 활성화 함수들이 제안되었습니다.

ReLU는 심층 신경망(Deep Neural Network)에서 많이 사용되며, 특히 컨볼루션 신경망(Convolutional Neural Network, CNN)에서 좋은 성능을 보입니다.

이상으로 ReLU에 대한 설명을 마치겠습니다. 질문이 있다면 언제든 물어보세요!


#### Haiku(ours)
    
네, ReLU(Rectified Linear Unit)에 대해 설명드리겠습니다.

ReLU는 딥러닝 모델에서 많이 사용되는 활성화 함수 중 하나입니다. 이 함수는 입력값이 0보다 크면 그대로 출력하고, 0보다 작으면 0을 출력합니다. 수식으로 표현하면 다음과 같습니다:

f(x) = max(0, x)

ReLU의 장점은 다음과 같습니다:

1. 계산이 간단하여 효율적입니다.
2. 그래디언트 소실 문제를 해결할 수 있습니다.
3. 희소성(sparsity)을 유도하여 모델의 일반화 성능을 높일 수 있습니다.

이러한 장점으로 인해 ReLU는 합성곱 신경망(CNN), 순환 신경망(RNN) 등 다양한 딥러닝 모델에서 널리 사용되고 있습니다. 다만 0보다 작은 값을 모두 0으로 만드는 특성 때문에 Dead ReLU 문제가 발생할 수 있다는 단점도 있습니다.

이해가 되셨나요? 더 궁금한 점이 있으시면 언제든 말씀해 주세요.


#### Haiku(ref)
    
네, ReLU(Rectified Linear Unit)에 대해 설명드리겠습니다.

ReLU는 딥러닝 모델에서 많이 사용되는 활성화 함수 중 하나입니다. 이 함수는 입력값이 0보다 크면 그대로 출력하고, 0보다 작으면 0을 출력합니다. 수식으로 표현하면 다음과 같습니다:

f(x) = max(0, x)

ReLU의 장점은 다음과 같습니다:

1. 계산이 간단하여 효율적입니다.
2. 그래디언트 소실 문제를 해결할 수 있습니다.
3. 희소성(sparsity)을 유도하여 모델의 일반화 성능을 높일 수 있습니다.

이러한 장점으로 인해 ReLU는 합성곱 신경망(CNN), 순환 신경망(RNN) 등 다양한 딥러닝 모델에서 널리 사용되고 있습니다. 다만 0보다 작은 값을 모두 0으로 만드는 특성 때문에 Dead ReLU 문제가 발생할 수 있다는 단점도 있습니다.

이해가 되셨나요? 더 궁금한 점이 있으시면 언제든 말씀해 주세요.


### Cost 결과

#### GPT4.0(ref)
    
- Total tokens: 847
- Input tokens: 289
- Output tokens: 558
- \LLM Requests: 1
- Total Cost (USD): $0.01963
    
#### GPT3.5(ours)
    
- Total tokens: 881
- Input tokens: 692
- Output tokens: 189
- LLM Requests: 3
- Total Cost (USD): $0.004572
    
#### GPT3.5(ref)
    
- Total tokens: 484
- Input tokens: 289
- Output tokens: 195
- LLM Requests: 1
- Total Cost (USD): $0.000437
    
#### Opus(ref)
    
- Total tokens: 915
- Input tokens: 314
- Output tokens: 601
- LLM Requests: 1
- Total Cost (USD): $0.049784999999999996
    
#### Haiku(ours)
    
- Total tokens: 1427
- Input tokens: 989
- Output tokens: 438
- LLM Requests: 3
- Total Cost (USD): $0.011488499999999999

#### Haiku(ref)
    
- Total tokens: 742
- Input tokens: 314
- Output tokens: 428
- LLM Requests: 1
- Total Cost (USD): $0.0006135

### 응답 시간

GPT4.0(ref) : 20.0s
Opus(ref) : 26.2s
GPT3.5(ours) : 7.0s
GPT3.5(ref) : 4.3s
Haiku(ours) : 8.8s
Haiku(ref) : 4.0s
![[Pasted image 20240513115916.png]]

### 결론

- Ver 01에 적용된 추가적인 프로세스로 인해 답변의 품질 변화는 없음
    - 추가적인 prompt engineering이 필요함
- prompt 보안을 통해서 prompt 유출 가능성을 확보
    - request가 단일일 경우이므로 request가 중첩되는 경우에 prompt 보안 없이도 유출 여부 확인이 필요함
- 저성능 LLM 모델을 사용하면 요금이 절약이 약 4배정도 절약이 가능함
- 응답 시간(생성 토큰 기준)은 Opus(ref)가 오래 걸렸고 단일 request로 구성된 Haiku(ref)가 가장 빨랐음
    - 제안된 구조로 인해 추가적인 응답 시간이 요구되었지만 상위 LLM 모델에 비해 상대적으로 적은 시간이 요구됨을 확인함
- 답변의 품질은 ReLU의 기본적인 정보는 모든 모델이 보유하고 있어서 할루시네이션은 없었으나, 답변의 양은 저성능 모델이 다소 적었음
    - 추가적인 prompt engineering으로 해결 가능하다고 보임


## 2. 질문 : DoRA에 대해서 알려줘.

### 답변 결과

#### GPT4.0(ref)
    
DoRA에 대해 질문해주셨군요. DoRA는 특정한 기술이나 개념을 지칭하는 것이 아니라, 다양한 분야에서 사용될 수 있는 약어입니다. 예를 들어, IT 분야에서는 특정 기술이나 프로토콜을 의미할 수도 있고, 다른 분야에서는 완전히 다른 의미를 가질 수 있습니다. AI 분야와 관련하여 DoRA라는 용어에 대한 구체적인 정보가 없기 때문에, 더 구체적인 맥락이나 분야를 제공해주시면 해당 분야에 맞는 답변을 드릴 수 있을 것 같습니다. 혹시 AI와 관련된 다른 질문이 있으시다면 언제든지 물어보세요.

#### GPT3.5(ours)
    
DoRA(Weight-Decomposed Low-Rank Adaptation)은 모델의 가중치를 저랭크 형태로 분해하여 모델의 일반화 성능을 향상시키는 기술입니다. 이는 모델의 복잡도를 줄이고, 학습 속도를 향상시키며, 과적합을 방지하는 데 도움이 됩니다. DoRA는 사전 훈련된 가중치를 크기와 방향으로 분해하여 세밀한 조정을 가능하게 합니다. 이를 통해 LoRA에 초점을 맞추어 방향성 업데이트를 통해 PEFT 방법과 관련된 학습 능력을 향상시키고, LoRA의 성능을 향상시키며 추가적인 추론 오버헤드를 피하면서 학습 능력과 훈련 안정성을 향상시킵니다. DoRA를 통해 모델의 학습 능력을 향상시키고 매개 변수의 수를 현저히 줄일 수 있습니다.
    
#### GPT3.5(ref)
    
DoRA는 데이터 분석 및 예측을 위한 AI 플랫폼입니다. 이를 사용하여 데이터를 수집, 분석하고 예측 모델을 구축할 수 있습니다. DoRA를 통해 데이터 기반의 의사 결정을 내릴 수 있고, 비즈니스나 연구 분야에서 유용하게 활용할 수 있습니다.

#### Opus(ref)
    
안녕하세요! DoRA에 대해 알려드리겠습니다.

DoRA는 "Domain Randomization Adaptation"의 약자로, 도메인 랜덤화를 통해 모델을 다양한 도메인에 적응시키는 기술입니다. 주로 컴퓨터 비전 분야에서 사용되는 기법이에요.

DoRA의 핵심 아이디어는 다음과 같습니다:

1. 학습 데이터에 다양한 변형(augmentation)을 가하여 도메인을 랜덤화합니다. 예를 들어 이미지의 밝기, 대비, 색상 등을 무작위로 변경하는 것이죠.
2. 이렇게 랜덤화된 도메인으로 모델을 학습시키면, 모델이 다양한 도메인에 강인해집니다. 즉, 도메인 간 차이에 덜 민감해지는 거예요.
3. 테스트 시에는 학습 때 보지 못한 새로운 도메인의 데이터에도 잘 일반화될 수 있습니다.

DoRA는 합성 데이터(synthetic data)를 활용하는 경우가 많아요. 시뮬레이션 환경에서 랜덤화된 도메인의 데이터를 대량으로 생성할 수 있기 때문이죠. 이를 통해 실제 환경에서 잘 동작하는 강인한 모델을 학습시킬 수 있습니다.

대표적인 DoRA 연구로는 자율주행 자동차의 객체 탐지, 로봇 제어 등이 있어요. 랜덤화된 가상 환경에서 학습한 모델이 실제 환경에서도 잘 동작하도록 하는 것이 목표입니다.

DoRA 기술은 아직 발전 중이지만, 적은 양의 실제 데이터만으로도 강인한 모델을 학습시킬 수 있다는 점에서 주목받고 있어요. 앞으로도 다양한 분야에서 DoRA가 활용될 것으로 기대됩니다.
    
#### Haiku(ours)
    
네, DoRA(Weight-Decomposed Low-Rank Adaptation)에 대해 설명해 드리겠습니다.

DoRA는 기계 학습 모델의 성능을 향상시키기 위한 기법입니다. 이 기법은 모델의 가중치를 저차원 공간으로 분해하여 적응시키는 방법입니다.

구체적으로 DoRA는 다음과 같은 과정을 거칩니다:

1. 사전 학습된 모델의 가중치를 저차원 공간으로 분해합니다.
2. 분해된 저차원 가중치 공간에서 새로운 데이터에 맞게 가중치를 적응시킵니다.
3. 적응된 저차원 가중치를 다시 원래의 고차원 공간으로 복원합니다.

이를 통해 모델의 성능을 크게 향상시킬 수 있습니다. 특히 데이터가 부족한 상황에서도 효과적으로 모델을 적응시킬 수 있습니다.

DoRA는 컴퓨터 비전, 자연어 처리 등 다양한 분야에서 활용되고 있습니다. 모델의 일반화 성능을 높이는데 도움이 될 수 있는 중요한 기법입니다.
    
#### Haiku(ref)
    
안녕하세요. 저는 AI 전문가 김용담 선생님입니다.

DoRA는 Deep Reinforcement Learning 알고리즘의 한 종류입니다. DoRA는 Distributed Recurrent Actor-Critic (DRAC) 모델을 기반으로 하며, 분산 환경에서 효율적으로 학습할 수 있는 강화학습 알고리즘입니다.

DoRA는 다음과 같은 특징을 가지고 있습니다:

1. 분산 환경에서 병렬 학습이 가능합니다. 이를 통해 학습 속도를 높일 수 있습니다.
2. 다양한 환경에서 안정적으로 학습할 수 있습니다.
3. 기존 DRAC 모델에 비해 더 효율적인 학습이 가능합니다.

DoRA는 강화학습 분야에서 주목받는 알고리즘 중 하나입니다. 복잡한 문제를 효과적으로 해결할 수 있는 강력한 기법입니다.

### Cost 결과

#### GPT4.0(ref)
    
- Total tokens: 528
- Input tokens: 289
- Output tokens: 239
- LLM Requests: 1
- Total Cost (USD): $0.01006
    
#### GPT3.5(ours)
    
- Total tokens: 3453
- Input tokens: 2692
- Output tokens: 761
- LLM Requests: 6
- Total Cost (USD): $0.006316
    
#### GPT3.5(ref)
    
- Total tokens: 398
- Input tokens: 289
- Output tokens: 109
- LLM Requests: 1
- Total Cost (USD): $0.000308
    
#### Opus(ref)
    
- Total tokens: 1003
- Input tokens: 313
- Output tokens: 690
- LLM Requests: 1
- Total Cost (USD): $0.056444999999999995
    
#### Haiku(ours)
    
- Total tokens: 1419
- Input tokens: 990
- Output tokens: 429
- LLM Requests: 3
- Total Cost (USD): $0.011315249999999999
    
#### Haiku(ref)
    
- Total tokens: 652
- Input tokens: 313
- Output tokens: 339
- LLM Requests: 1
- Total Cost (USD): $0.000502

### 응답 시간

GPT4.0(ref) : 10.3s
Opus(ref) : 30.1s
GPT3.5(ours) : 20.9s
GPT3.5(ref) : 3.4s
Haiku(ref) : 9.0s
Haiku(ref) : 3.7s

![[Pasted image 20240513120327.png]]

### 결론

- 질문이 LLM 모델의 학습 기간을 벗어난 경우에는 잘못된 정보를 도출하는 경우가 발생함
    - 단, 약어를 풀네임으로 변경해서 질문하면 답변을 함
    - 다양한 약어에 때문에 LLM 모델이 유저가 의도한 질문에 적절한 답변을 하지 못하는 상황임
- GPT3.5(ours)만 RAG를 사용했으나, 답변 내용을 살펴보면 일부 잘못된 정보가 내포되어 있음
    - Duckduckgo의 특성상 검색된 내용의 전체를 context로 보내는 경우가 아니므로 불명확한 정보로 인해 발생된 할루시네이션이라고 판단됨
- 저성능 LLM 모델을 사용하면 요금이 절약이 약 5배정도 절약이 가능함
    - 질문에 따라 요금의 차이가 발생함으로 변동성은 존재함
    - GPT3.5(ours)는 RAG를 사용하여 약 2배정도 차이가 발생함
- 응답 시간은 GPT3.5(ours)가 RAG 사용으로 인해 약 20초까지 증가했으나, 생성된 토큰 대비를 따져보면 GPT4.0(ref)에 비해서 빠르다고 할 수 있음
- RAG 사용 유무를 LLM 모델에게 맡기다 보니 요금 증가가 발생하고 판단 유무에 대한 통제가 현재로써는 명확하지 않음


# 관련 문서

작성된 코드
[https://github.com/coding-is-coffee/yongdambot/blob/test_develop/examples/Test_Code_gpt3p5_haiku_1단계.ipynb](https://github.com/coding-is-coffee/yongdambot/blob/test_develop/examples/Test_Code_gpt3p5_haiku_1%EB%8B%A8%EA%B3%84.ipynb)
