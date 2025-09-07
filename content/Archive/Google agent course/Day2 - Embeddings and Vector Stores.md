---
title:
date:  2025-04-18 07:52
tags:
---

Created at : 2025-04-18 07:52  
Auther: Soo.Y  

----
### 📝메모 

# Day2 자료
- PDF : [Embeddings & Vector Stores | Kaggle](https://www.kaggle.com/whitepaper-embeddings-and-vector-stores)
- Code : [Day 2 - Document Q&A with RAG](https://www.kaggle.com/code/markishere/day-2-document-q-a-with-rag)
- Code : [Day 2 - Embeddings and similarity scores](https://www.kaggle.com/code/markishere/day-2-embeddings-and-similarity-scores)
- Code : [Day 2 - Classifying embeddings with Keras](https://www.kaggle.com/code/markishere/day-2-classifying-embeddings-with-keras)

# Introduction

현대 머신러닝은 이미지, 텍스트, 오디오 등 다양한 형태의 데이터에 기반하여 발전하고 있다. 이 백서(whitepaper)에서는 이러한 이질적인 데이터를 하나의 벡터 표현으로 통합하여 다양한 응용 분야에서 원할히 사용할 수 있도록 도와주는 임베딩의 강력함을 소개하고 있다.

**이 백서에서 다루는 주요 내용**
1. **임베딩 이해하기** : 멀티모달 데이터를 처리하는 데 왜 임베딩이 중요한지, 그리고 임베딩이 활용되는 다양한 으용 사례를 설명한다.
2. **임베딩 기법** : 서로 다른 데이터 유형(예: 텍스트, 이미지 오디오 등)을 공통된 벡터 공간으로 매핑하는 다양한 기법을 소개한다.
3. **효율적인 입베딩 관리** : 대규모 임베딩 데이터를 저장, 검색, 탐색하는 방법에 대다룬다.
4. **벡터 데이터베이스(Vector Databases)** : 임베딩을 효율적으로 관리하고 쿼리할 수 있는 특화된 시스템들을 소개하며, 실제 운영 환경에서의 고려사항도 함께 설명한다.
5. **실제 활용 사례** : 임베딩과 벡터 데이터베이스가 대형 언어 모델과 결합되어 현실 문제를 해결하는 구체적인 예제를 살펴본다.

백서 전체를 통해, 핵심 개념을 체험할 수 있는 코드 예시도 함께 제공된다.

# Why embeddings are important

임베딩이란, 텍스트, 음성, 이미지, 영상과 같은 현실 세계의 데이터를 수치화한 표현이다. 임베딩이라는 이름은 한 공간을 다른 공간으로 매핑하거나 삽입하는 수학적 개념에서 유래되었다. 예를 들어 원래 BERT 모델은 텍스트를 768개의 숫자 벡터로 임베딩한다. 즉, 모든 문장의 고차원 공간에서 768차원의 저차원 공간으로 맵핑하는 것이다.

**임베딩의 핵심 개념**
임베딩은 저차원 벡터로 표현되며, 두 벡터 간의 기하학적 거리(유클리드 거리 등)는 실제 세계 객체 간의 의미적 유사성을 반영한다.
예를 들어 computer라는 단어는 컴퓨터 이미지와도 유사하고 laptop과도 비슷핮ㄷ디만 car와는 유사하지 않다. 즉, 서로 다른 유형의 데이터를 숫자 공간에서 비교하고 검색할 수 있게 해주는 것이 임베딩의 가장 큰 장점이다.

**임베딩은 일종의 정보 압축**
- 임베딩은 원본 데이터를 손실 있는 방식으로 압축하면서도 의지먹 특징을 유지한다.
- 이는 대규모 데이터 처리와 저장을 효율적으로 만들기 위한 핵심 도구이다.


![[Pasted image 20250418140412.png]]

**직관적인 예시: 위도와 경도**
- 지구상의 위치를 두 숫자로 표현하는 것도 하나의 임베딩이라고 볼 수 있다.
- 두 위치의 위경도를 비교하면 서리, 인접 위치, 유사성 등을 계산할 수 있다.
- 마찬가지로 텍스트 임베딩에서도 벡터 공간에서 가까운 위치에 있는 텍스트는 의미적으로 유사한 텍스트임을 나타낸다.

**검색과 추천에서의 중요성**
RAG, 검색, 추천 시스템, 광고, 이상 탐지 등 다양한 실무 영역에서 임베딩은 핵심 요소이다. 벡터 데이터베이스를 통해, 거대한 데이터셋 내에서 빠르게 유사 항목을 찾아낼 수 있는 것이 오늘날의 실시간 시스템 구현을 가능하게 한다.
- 단, 위도/경도는 지구의 구형 구조에 따라 설계된 것이지만, 텍스트 임베딩 공간은 신경망이 학습을 통해 자동으로 만들어낸 공간이다.

> **중요!** 
> 서로 다른 모델에서 생성한 임베딩은 직접 비교가 불가능하므로, 호환성과 일관성을 유지한 임베딩 버전을 사용하는 것이 매우 중요하다.


**임베딩 기반 검색 시스템의 3단계**
1. 검색 공간에 존재하는 수십억 개 아이템에 대해 사전 임베딩 수행
2. 쿼리를 동일한 임베딩 공간으로 맵핑
3. 쿼리 임베딩과 가장 가까운 이웃(Nearest Neighbors)을 찾아 빠르게 반환

**멀티모달 데이터에도 적합**
현대 애플리케이션은 텍스트, 음성, 이미지, 영상 등 다양한 데이터 유형을 함께 다루며, 이런 환경에서는 공통 임베딩 공간이 특히 유용합니다.

**임베딩의 핵심 특징 요약**
- 의미적으로 유사한 객체를 가까운 위치에 매핑
- 다운스트림 작업에서 유용한 요약된 의미 표현으로 사용 가능
- ML 모델 입력, 추천 시스템, 검색 엔진, 분류 모델 등에서 활용 가능
- 임베딩은 작업에 따라 최적화된 표현을 가질 수 있음 -> 같은 객체라도 목적에 따라 다른 임베딩 생성 가능
## Evaluating Embedding Quality

임베딩 모델의 품질은 사용하는 작업에 따라 서로 다른 방식으로 평가된다. 대부분의 일반적인 평가 지표는, 비슷한 항목은 잘 찾아내고, 관련 없는 항목은 제외하는 능력에 초점을 둔다. 이러한 평가는 보통 정답이 레이블링된 데이터셋이 필요하며, 예를 들어 Snippet 0에서는 NFCorpus 데이터셋을 사용하여 다양한 지표를 설명한다.

**검색 과제에서의 주요 평가 지표**
1. 정확도(Precision) : 검색된 문서 중에서 얼마나 많은 문서가 실제로 관련있는 문서인지 평가
	- 예: 10개 문서 중 7개가 관련 있다면 → `precision@10 = 7/10 = 0.7`
2. 재현율(Recall) : 전체 관련 문서 중에서 얼마나 많이 검색되었는지 평가
	- 예: 관련 문서가 총 6개인데 그 중 3개가 검색되었다면 → `recall@K = 3/6 = 0.5`

**이상적인 임베딩 모델이라면**
- 모든 관련 문서는 빠짐없이 검색하고
- 관련 없는 문서는 하나도 포함되지 않아야 한다.
하지만 현실에서는 일부 관련 문서를 놓치기도 하고, 관련 없는 문서가 포함되기도 하므로 정량적인 기준이 필요하다.

**순위 정보가 있는 경우의 평가**
- Precision/Recall은 관련성 여부가 이진(Binary)일 때 유용하지만, 실제 검색 환경에서는 더 관련성 높은 문서가 위에 나오는 것이 매우 중요하다.
- 이럴 때 사용하는 대표적인 지표가 바로 "정규화 할인 누적 이득"(nDCG)이다.

**nDCG(Normalized Discounted Cumulative Gain)**
- 각 문서의 관련성 점수(reli)를 기반으로 계산
- 하단에 위치한 문서는 패널티를 부여
- 이상적인 순서를 기준으로 정규화하여 0.0 ~ 1.0 사이의 값으로 표현하여 서로 다른 쿼리나 시스템 간 공정한 비교 가능

**수식 정리**

① DCG@p (정렬된 결과의 할인 누적 이득)

$$
\mathrm{DCG}@p = \sum_{i=1}^{p} \frac{2^{\mathrm{rel}_i} - 1}{\log_2(i + 1)}
$$

- $rel_i$​: 순위 iii에 있는 문서의 관련성 점수
    
- $i$: 검색 결과의 순위 (1부터 시작)
    
- $p$: 평가할 상위 문서 수 (ex: @10이면 상위 10개 문서만 사용)
    

---

② IDCG@p (이상적인 DCG)

$$
\mathrm{IDCG}@p = \sum_{i=1}^{p} \frac{2^{\mathrm{rel}^*_i} - 1}{\log_2(i + 1)}
$$

- $rel_{i}^{*}$​: 관련성 점수를 내림차순 정렬한 이상적 순위

---

③ nDCG@p (정규화된 점수)

$$
\mathrm{nDCG}@p = \frac{\mathrm{DCG}@p}{\mathrm{IDCG}@p}
$$

- **값 범위**: 0.0 ~ 1.0
    
- **1에 가까울수록** → **이상적인 순위에 가까움**

```python
import numpy as np

def dcg_at_k(relevance_scores, k):
    """
    relevance_scores: 관련성 점수 리스트 (예: [3, 2, 3, 0, 1])
    k: 상위 몇 개까지 평가할지 (예: k=5)
    """
    relevance_scores = np.asfarray(relevance_scores)[:k]
    if relevance_scores.size == 0:
        return 0.0
    return np.sum((2 ** relevance_scores - 1) / np.log2(np.arange(2, relevance_scores.size + 2)))

def ndcg_at_k(predicted_relevance, ideal_relevance, k):
    """
    predicted_relevance: 예측된 순서대로 정렬된 관련성 점수 리스트
    ideal_relevance: 이상적인 정렬 순서의 관련성 점수 리스트 (내림차순)
    """
    dcg = dcg_at_k(predicted_relevance, k)
    idcg = dcg_at_k(sorted(ideal_relevance, reverse=True), k)
    return dcg / idcg if idcg != 0 else 0.0

# 예측된 검색 결과의 관련성 점수 (예: 모델 출력 순서 기준)
pred = [3, 2, 0, 1, 0]

# 해당 쿼리에 대해 정답 문서의 이상적 관련성 점수 순서
ideal = [3, 3, 2, 1, 0]

# 평가할 k값 (예: 상위 5개 문서 기준)
k = 5

print(f"nDCG@{k}:", round(ndcg_at_k(pred, ideal, k), 4))

```


**공개 벤치마크**
- **BEIR**: 검색/질문응답 등 다양한 작업을 평가하는 대표 벤치마크
- **MTEB (Massive Text Embedding Benchmark)**: 대규모 임베딩 품질 비교를 위한 벤치마크
    
- **TREC (Text REtrieval Conference)**에서 제작한  
    `trec_eval`이나 Python 래퍼인 `pytrec_eval`을 통해  
    **Precision, Recall, nDCG** 등 다양한 지표를 일관되게 계산 가능

**응용 환경에서의 최적 평가**

- 어떤 임베딩 모델이 "최적"인지는 **적용 분야에 따라 달라질 수 있습니다**.  
    하지만 대부분의 경우 다음과 같은 직관이 좋은 출발점이 됩니다:

> **"서로 비슷한 객체는 임베딩 공간에서도 가까이 위치해야 한다."**

**그 외 고려 요소**
- 모델 크기 (Model Size)
- 임베딩 차원 수 (Embedding Dimension Size)
- 응답 지연 시간 (Latency)
- 전체 시스템 비용 (Total Cost)

**실제 제품 환경에서 임베딩 모델을 선택할 때 매우 중요한 요소**입니다.

## Search Example



## Types of embeddings

### Text embeddings

### Word embeddings

### Document embeddings

#### Shallow BoW models

#### Deeper pretrained large language models

### Images & multimodal embeddings

### Structured data embeddings

#### General structured data

#### User/item structured data

#### Graph embeddings

### Training Embeddings

# Vector search

## Important vector search algorithms

### Locality sensitive hashing & trees

### Hierarchical navigable small worlds

### ScaNN

# Vector databases

## Operational considerations

# Applications

## Q&A with sources(retrieval augmented generation)

RAG(Retrieval-Augmented Generation)은 정보 검색(Retrieval)과 텍스트 생성(Generation)의 장점을 결합한 Q&A방식이다.

**어떻게 작동하나요?**
1. 지식 베이스에서 관련 문서를 먼저 검색한다.
2. 검색된 정보를 프롬프트에 추가한다.
3. 확장된 프롬프트를 바탕으로 LLM이 응답을 생성한다.

**Prompt Expansion이란?**
- 프롬프트 확장(Prompt Expansion)은 데이터베이스 검색 결과(주로 의미 기반 검색 + 비지니스 규칙)을 원래 프롬프트에 덧붙이는 기술이다.

**RAG는 어떤 문제를 해결할까?**
LLM이 대표적인 두 가지 문제를 완화하는 데 유용하다.
1. 환각(hallucination)
	- LLM이 사실이 아닌 내용을 그럴듯하게 만들어내는 현상
	- RAG는 신뢰할 수 있는 문서 기반으로 답변을 생성하여 이를 줄여준다.
2. 자주 재학습해야 하는 문제
	- 최신 정보를 반영하려면 모델을 재훈련해야 하는 비용이 크다.
	- 하지만 RAG는 최신 정보를 프롬프트로 직접 전달할 수 있기 때문에, 재훈련 없어도 최신 응답 생성 가능

> 단, RAG가 환각을 **완전히 제거**하지 않는다.

해결책: 출처(source) 반환 + 정확성 검사
- 환각을 더 줄이기 위해서는 검색된 출처를 함께 반환하고 사람이나 LLM이 해당 출처와 응답의 일관성을 확인하는 것이 좋다.
- 이렇게 하면 LLM이 생성한 응답이 실제로 의미적으로 유사한 출처 정보와 일치하는지 검증할 수 있다.



```python
# Before you start run this command:
# pip install --upgrade --user --quiet google-cloud-aiplatform langchain_google_vertexai
# after running pip install make sure you restart your kernel

# TODO : Set values as per your requirements
# Project and Storage Constants
PROJECT_ID = "<my_project_id>"
REGION = "<my_region>"
BUCKET = "<my_gcs_bucket>"
BUCKET_URI = f"gs://{BUCKET}"

# The number of dimensions for the text-embedding-005 is 768
# If other embedder is used, the dimensions would probably need to change.
DIMENSIONS = 768

# Index Constants
DISPLAY_NAME = "<my_matching_engine_index_id>"
DEPLOYED_INDEX_ID = "yourname01" # you set this. Start with a letter.
from google.cloud import aiplatform
from langchain_google_vertexai import VertexAIEmbeddings
from langchain_google_vertexai import VertexAI
from langchain_google_vertexai import (
    VectorSearchVectorStore,
    VectorSearchVectorStoreDatastore,
)
from langchain.chains import RetrievalQA
from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
from IPython.display import display, Markdown

aiplatform.init(project=PROJECT_ID, location=REGION, staging_bucket=BUCKET_URI)
embedding_model = VertexAIEmbeddings(model_name="text-embedding-005")

# NOTE : This operation can take upto 30 seconds
my_index = aiplatform.MatchingEngineIndtex.create_tree_ah_index(
    display_name=DISPLAY_NAME,
    dimensions=DIMENSIONS,
    approximate_neighbors_count=150,
    distance_measure_type="DOT_PRODUCT_DISTANCE",
    index_update_method="STREAM_UPDATE", # allowed values BATCH_UPDATE , STREAM_UPDATE
)

# Create an endpoint
my_index_endpoint = aiplatform.MatchingEngineIndexEndpoint.create(
    display_name=f"{DISPLAY_NAME}-endpoint", public_endpoint_enabled=True
)

# NOTE : This operation can take upto 20 minutes
my_index_endpoint = my_index_endpoint.deploy_index(
    index=my_index, deployed_index_id=DEPLOYED_INDEX_ID
)

my_index_endpoint = my_index_endpoint.deploy_index(
    index=my_index, deployed_index_id=DEPLOYED_INDEX_ID
)

my_index_endpoint.deployed_indexes

# TODO : replace 1234567890123456789 with your acutial index ID
my_index = aiplatform.MatchingEngineIndex("1234567890123456789")

# TODO : replace 1234567890123456789 with your acutial endpoint ID
# Be aware that the Index ID differs from the endpoint ID
my_index_endpoint = aiplatform.MatchingEngineIndexEndpoint("1234567890123456789")
from langchain_google_vertexai import (
    VectorSearchVectorStore,
    VectorSearchVectorStoreDatastore,
)

# Input texts
texts = [
"The cat sat on",
"the mat.",
"I like to",
"eat pizza for",
"dinner.",
"The sun sets",
"in the west.",
]

# Create a Vector Store
vector_store = VectorSearchVectorStore.from_components(
    project_id=PROJECT_ID,
    region=REGION,
    gcs_bucket_name=BUCKET,
    index_id=my_index.name,
    endpoint_id=my_index_endpoint.name,
    embedding=embedding_model,
    stream_update=True,
)

# Add vectors and mapped text chunks to your vectore store
vector_store.add_texts(texts=texts)

# Initialize the vectore_store as retriever
retriever = vector_store.as_retriever()

# perform simple similarity search on retriever
retriever.invoke("What are my options in breathable fabric?")
```


----
### 📜출처(참고 문헌)  


----
### 🔗연결 문서


