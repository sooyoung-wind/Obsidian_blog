
# 1. 대화형 AI에서의 싱글턴과 멀티턴

LLM(Large Language Model)을 활용한 시스템을 설계할 때 가장 먼저 고려해야 할 것은 **대화의 구조**입니다.

- **싱글턴(Single-turn)**: 한 번의 질문과 응답으로 끝나는 구조. 문맥을 고려하지 않음.
- **멀티턴(Multi-turn)**: 여러 발화가 이어지는 구조. 이전 대화 내용을 기억하고 문맥을 유지함.

멀티턴 대화를 구현하려면 **메모리 시스템**이 필요합니다. 여기서 등장하는 것이 **short-term memory**와 **long-term memory**입니다.

# 2. 메모리 구조: Short-term vs. Long-term

- **Short-term memory**는 세션이 종료되면 사라지는 임시 기억입니다.
- **Long-term memory**는 사용자별로 지속적으로 저장되어 개인화된 응답을 가능하게 합니다.

| 메모리 종류                | 설명                | 기술 스택                                     |
| --------------------- | ----------------- | ----------------------------------------- |
| **Short-term memory** | 현재 세션 내 문맥 유지     | Redis, ConversationBufferMemory           |
| **Long-term memory**  | 사용자 정보 및 과거 대화 기억 | Vector DB (Pinecone, FAISS), Embedding 모델 |

# 3. 기술 스택으로 구현하기

## 🔹 Redis로 Short-term Memory 구현

```python
from langchain.memory.chat_message_histories import RedisChatMessageHistory
from langchain.memory import ConversationBufferMemory

chat_history = RedisChatMessageHistory(
    session_id="user_session_001",
    url="redis://localhost:6379"
)

memory = ConversationBufferMemory(
    chat_memory=chat_history,
    return_messages=True
)
```

## 🔹 Vector DB로 Long-term Memory 구현
- Vector DB는 텍스트를 벡터로 변환해 저장하고, 유사한 문장을 검색할 수 있게 해줍니다.
- 사용자 관심사, 과거 대화 등을 장기 기억으로 저장할 수 있습니다.

```python
import pinecone
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')
pinecone.init(api_key="YOUR_API_KEY", environment="us-west1-gcp")
index = pinecone.Index("user-memory")

text = "사용자는 CFD에 관심이 많다"
vector = model.encode(text).tolist()
index.upsert([("user_1234", vector)])
```


# 4. LangChain으로 통합 메모리 시스템 구성

`CombinedMemory`를 사용하면 short-term과 long-term memory를 통합하여 LLM이 문맥과 사용자 정보를 동시에 활용할 수 있습니다.

```python
from langchain.memory import CombinedMemory
from langchain.memory import ConversationBufferMemory, VectorStoreRetrieverMemory
from langchain.vectorstores import Pinecone
from langchain.embeddings import OpenAIEmbeddings

short_term = ConversationBufferMemory()
long_term = VectorStoreRetrieverMemory(
    retriever=Pinecone(index_name="user-memory", embedding=OpenAIEmbeddings())
)

combined_memory = CombinedMemory(memories=[short_term, long_term])
```


# 5. 마무리: 왜 중요한가?

대화형 AI 시스템에서 **문맥 유지**와 **개인화된 응답**은 사용자 경험의 핵심입니다.  
이를 위해서는 다음이 필요합니다:

- **멀티턴 대화 구조**
- **단기 및 장기 기억 시스템**
- **Redis와 Vector DB의 적절한 활용**

LangChain은 이러한 구조를 쉽게 구현할 수 있도록 도와주는 강력한 프레임워크입니다.

