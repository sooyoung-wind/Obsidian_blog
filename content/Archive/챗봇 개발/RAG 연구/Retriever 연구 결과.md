---
title: Retriever 연구
date: 2024-05-13 14:45
tags:
  - LLM
  - Report
---

Created at : 2024-05-13 14:45  
Auther: Soo.Y  

### 유사성 검색 결과

#### 단순 similarity search

질문 : what is CRAG in this document?

검색 조건 : k = 2

CRAG에 대해 자세히 알아보겠습니다. CRAG는 Contextual Retrieval-Augmented Generation의 약자로, RAG(Retrieval-Augmented Generation) 기반 접근법에 적응할 수 있는 모델의 적응성과 단문 및 장문 생성 작업에 걸쳐 일반화될 수 있음을 광범위하게 입증하기 위한 실험을 수행했습니다. CRAG는 다음과 같은 4가지 데이터셋에서 평가되었습니다:
1. PopQA (Mallen et al., 2023): 단문 생성 작업으로, 각 질문에 대해 하나의 사실적 지식 엔티티만 답변하면 됩니다. 정확도를 평가 지표로 사용했습니다.
2. Biography (Min et al., 2023): 장문 생성 작업으로, 특정 엔티티에 대한 자세한 전기를 생성해야 합니다. FactScore (Min et al., 2023)를 평가 지표로 사용했습니다.
3. PubHealth (Zhang et al., 2023a): 건강 관련 진실 또는 거짓 질문 작업으로, 주장의 진위 여부를 판단해야 합니다. 정확도를 평가 지표로 사용했습니다.
4. Arc-Challenge (Bhakthavatsalam et al., 2021): 일상 생활의 과학 현상에 대한 다중 선택 질문 작업으로, 3개 또는 4개의 선택지 중 올바른 설명을 선택해야 합니다. 정확도를 평가 지표로 사용했습니다. 이 실험들을 통해 CRAG가 RAG 기반 접근법에 적응할 수 있고, 단문 및 장문 생성 작업 모두에서 일반화될 수 있음을 입증했습니다.

#### 앙상블(Ensemble) Retriever + Long Context Reorder

질문 : what is CRAG in this document?

검색 조건 : k = 2

이 문서에 따르면 CRAG는 다음과 같은 특징을 가지고 있습니다:
1. CRAG는 RAG(Retrieval-Augmented Generation) 기반 접근법에 적응할 수 있는 능력을 광범위하게 입증했습니다. 즉, CRAG는 RAG 기반 모델과 잘 작동한다는 것을 보여주었습니다.
2. CRAG는 단문 생성 과제(PopQA)와 장문 생성 과제(Biography) 모두에서 일반화될 수 있는 능력을 보였습니다. 이는 CRAG가 다양한 유형의 생성 과제에 적용될 수 있음을 의미합니다.
3. CRAG는 PubHealth(참/거짓 질문) 및 Arc-Challenge(선다형 질문) 데이터셋에서도 평가되었습니다. 이를 통해 CRAG가 다양한 유형의 질문 생성 과제에서 효과적으로 작동할 수 있음을 확인할 수 있습니다. 
4. 실험 결과에 따르면, CRAG는 다른 모델들(LLaMA2, Alpaca, ChatGPT 등)과 비교했을 때 대부분의 과제에서 우수한 성능을 보였습니다. 특히 PopQA, Biography, PubHealth 데이터셋에서 CRAG의 성능이 두드러졌습니다. 
5. 다만 LLaMA2-hf-7b 모델의 경우 PubHealth 및 Arc-Challenge 데이터셋에서 상대적으로 약한 성능을 보였는데, 이는 해당 모델의 지시 이해 능력이 부족했기 때문인 것으로 분석되었습니다.
종합적으로 CRAG는 RAG 기반 접근법에 잘 적응하며, 다양한 유형의 생성 과제에서 우수한 성능을 보이는 모델이라고 할 수 있습니다. 특히 단문 및 장문 생성, 참/거짓 질문, 선다형 질문 등 다양한 과제에서 효과적으로 작동하는 것으로 나타났습니다.


#### 앙상블(Ensemble) Retriever + Long Context Reorder(k=3)

질문 : what is CRAG in this document?

검색 조건 : k = 3

CRAG(Corrective Retrieval-Augmented Generation)는 대규모 언어 모델(LLM)의 한계를 극복하기 위해 제안된 방법입니다. LLM은 지식을 인코딩하고 있지만, 때때로 사실적 오류와 허구적 내용을 생성할 수 있습니다. 이를 해결하기 위해 CRAG는 다음과 같은 특징을 가지고 있습니다:
1. 검색 결과의 관련성과 신뢰성을 평가하는 경량 검색 평가기를 포함하고 있습니다. 이를 통해 검색 결과가 부정확할 경우 이를 감지하고 보정할 수 있습니다.
2. 검색 결과가 부정확할 경우 웹 검색을 통해 추가적인 정보를 수집하여 보완합니다. 이를 통해 제한된 코퍼스에서 얻을 수 있는 정보의 한계를 극복할 수 있습니다.
3. 검색 결과에서 핵심적인 정보만을 추출하고 불필요한 정보를 제거하는 알고리즘을 사용합니다. 이를 통해 검색 결과의 활용도를 높일 수 있습니다. CRAG는 기존의 검색 기반 생성 모델(RAG)에 플러그인 형태로 적용될 수 있으며, 다양한 데이터셋에서 성능 향상을 보여주었습니다. 특히 질문-답변, 요약, 질문 분류 등의 다양한 태스크에서 우수한 성능을 보였습니다. 이를 통해 CRAG가 검색 기반 생성 모델의 강건성과 일반화 성능을 향상시킬 수 있음을 확인할 수 있습니다.



# 관련 문서


