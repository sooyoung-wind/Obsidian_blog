---
title: Langchain basic
date: 2024-12-24 17:28
tags:
  - langchain
---

Created at : 2024-12-24 17:28  
Auther: Soo.Y  

----
### 📝메모 

### Prompt template 사용하기

`PromptTemplate`를 사용해서 prompt의 template를 구성할 수 있다. 중괄호를 사용하여 변수명을 지정할 수 있고 지정된 변수명을 활용하여 키워드가 변경되는 prompt를 완성할 수 있다.

```python
from langchain_core.prompts import PromptTemplate

template = "Hi my name is {name}."

prompt_template = PromptTemplate.from_template(template)
prompt_template

# PromptTemplate(input_variables=['name'], input_types={}, partial_variables={}, template='my name is {name}')
```

```python
prompt = prompt_template.format(name="Sooyoung")
prompt
# my name is Sooyoung
```

2개 이상의 변수로 구성된 프롬프트 만들기
```python
from langchain_core.prompts import PromptTemplate

template = """
다음은 {topic}에 대한 내용입니다. {question}에 대해 상세히 설명해 주세요.
"""
prompt = PromptTemplate(
	input_variables=['topic', 'question'],
	template=template
)

filled_prompt = prompt.format(topic="인공지능", question="딥러닝")
filled_prompt
```

----
### 📜출처(참고 문헌)  


----
### 🔗연결 문서


