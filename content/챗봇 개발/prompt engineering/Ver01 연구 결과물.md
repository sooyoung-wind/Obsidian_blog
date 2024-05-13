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
    
    Total tokens: 847 Input tokens: 289 Output tokens: 558 LLM Requests: 1 Total Cost (USD): $0.01963
    
#### GPT3.5(ours)
    
    Total tokens: 881 Input tokens: 692 Output tokens: 189 LLM Requests: 3 Total Cost (USD): $0.004572
    
#### GPT3.5(ref)
    
    Total tokens: 484 Input tokens: 289 Output tokens: 195 LLM Requests: 1 Total Cost (USD): $0.000437
    
#### Opus(ref)
    
    Total tokens: 915 Input tokens: 314 Output tokens: 601 LLM Requests: 1 Total Cost (USD): $0.049784999999999996
    
#### Haiku(ours)
    
    Total tokens: 1427 Input tokens: 989 Output tokens: 438 LLM Requests: 3 Total Cost (USD): $0.011488499999999999
    
#### Haiku(ref)
    
    Total tokens: 742 Input tokens: 314 Output tokens: 428 LLM Requests: 1 Total Cost (USD): $0.0006135

# 관련 문서


