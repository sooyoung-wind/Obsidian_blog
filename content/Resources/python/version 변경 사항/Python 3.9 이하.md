---
title: Python 3.9 이하
date: 2024-11-02 15:53
tags:
  - python
---

Created at : 2024-11-02 15:53  
Auther: Soo.Y  

----
### 📝메모 

# python 3.6

1. 딕셔너리에 순서가 있다. (실제로는 3.7부터 적용이라고 알려짐)
2. f-sting 변수 포함 가능 : `{}`안에 변수 명을 지정해서 문자열을 작성할 수 있음
3. Type hint 도입
```python
def my_function(name: str) -> str:
	return f"Hello, my name is {name}"
```

# python 3.7
1. dataclass 데코레이더 : `@dataclass`를 사용해서 클래스를 간결하게 정의할 수 있습니다. 특히 id, name, email 처럼 변수 명을 나열해서 선언할 필요가 없습니다. 또한 `print`문을 사용해서 출력해야 할 `return` 형식을 `__repr__` 매직 메소드에 선언을 해야 하는데 `dataclass`는 자동으로 선언됩니다.
## Basic class
```python
# Basic class
class User:
    def __init__(self, id, name, email):
        self.id = id
        self.name = name
        self.email = email

    def __repr__(self):
        return (f'{self.__class__.__qualname__}{self.id, self.name, self.email}')

user = User(123, 'hojun', 'hojun@gmail')
print(user)
# User(123, 'hojun', 'hojun@gmail')
```

## dataclass
```python
# using dataclass
from dataclasses import dataclass

@dataclass
class User:
    id: int
    name: str
    email : str

user = User(123, 'hojun', 'hojun@gmail')
print(user)
```

# python 3.8
## 1. 할당 표현식( := 연산자, 바다코끼리 연산자)
할당 표현식을 사용하면 표현식 내에서 변수를 할당할 수 있습니다. 이를 통해 코드를 더 간격하게 작성할 수 있습니다.

- 기존 방식에서는 len(my_list)의 결과를 별도로 변수 n에 할당한 후 조건문에서 사용했으나, 할당 표현식을 사용하면 조건문에 내에서 직접 변수를 할당하고 사용할 수 있어 코드가 간결해집니다.

```python
# 기존 방식
n = len(my_list)
if n > 10:
    print(f"리스트 길이: {n}")

# 할당 표현식 사용
if (n := len(my_list)) > 10:
    print(f"리스트 길이: {n}")

```

## 2. 위치 전용 매개변수
함수 정의 시 `/`기호를 사용하여 특정 매개변수를 위치 전용으로 지정할 수 있습니다. 이를 통해 인수가 반드시 위치로만 전달되도록 강제할 수 있습니다.

- `/` 앞의 매개변수 a와 b는 위치 전용입니다. 뒤의 c와 d는 위치, 이름 둘 다 가능하지만 a와 b는 오직 위치 매개변수로만 받을 수 있습니다.
```python
def func(a, b, /, c, d):
    print(a, b, c, d)

# 올바른 호출
func(1, 2, c=3, d=4)

# 오류 발생
func(a=1, b=2, c=3, d=4)  # TypeError: func() got some positional-only arguments passed as keyword arguments: 'a, b'
```

## 3. f-문자열 향상 ( `=` 지원)
f-문자열 내에서 `=`를 사용하여 변수명과 값을 함께 출력할 수 있습니다. 이는 디버깅 시 유용하게 사용됩니다.
- f"{x=}"는 변수 x의 이름과 값을 함께 출력합니다.
- 디버깅 시 변수의 상태를 쉽게 확인할 수 있습니다.

```python
x = 10
y = 20

print(f"{x=}, {y=}")
# 출력: x=10, y=20
```

## 4. 새로운 수학 함수
- math.prod() : 시퀀스의 모든 요소의 곱을 계산합니다.
- math.isqrt() : 정수의 정수 제곱근을 계산합니다.

```python
import math

# math.prod 예제
numbers = [1, 2, 3, 4]
product = math.prod(numbers)
print(product)  # 출력: 24

# math.isqrt 예제
number = 16
sqrt = math.isqrt(number)
print(sqrt)  # 출력: 4

# math.isqrt 예제
number = 18 # 18이지만 16과 같은 결과가 나옴
sqrt = math.isqrt(number)
print(sqrt)  # 출력: 4
```


# python 3.9

## 1. 딕셔너리 병합 및 업데이트 연산자 (`|` 및 `|=`)
딕셔너리를 병합하거나 업데이트하기 위한 새로운 연산자 `|`와 `|=`가 추가되었습니다. 이는 딕셔너리의 병합을 더 간결하게 직관적으로 수행할 수 있게 도와줍니다.
- `|` 연산자는 두 딕셔너리를 병합한 새로운 딕셔너리를 생성합니다.
- `|=` 연산자는 기존 딕셔너리를 다른 딕셔너리로 업데이트합니다.
- 키가 종복될 경우, 우측 딕셔너리의 값이 우선합니다.

```python
# 기존 방식
dict1 = {'a': 1, 'b': 2}
dict2 = {'b': 3, 'c': 4}

merged_dict = {**dict1, **dict2}
print(merged_dict)  # 출력: {'a': 1, 'b': 3, 'c': 4}

# 새로운 방식 (| 연산자 사용)
merged_dict = dict1 | dict2
print(merged_dict)  # 출력: {'a': 1, 'b': 3, 'c': 4}

# 기존 딕셔너리 업데이트
dict1 |= dict2
print(dict1)  # 출력: {'a': 1, 'b': 3, 'c': 4}

```

## 2. 타입 힌팅 개선(내장 컬렉션에 대한 제네릭 지원)
이제 `list, dict, tupe` 등 내장 컬렉션 타입에서 직접 제네릭 타입 힌트를 사용할 수 있습니다. 이전에는 typing 모듈의 제네릭 타입을 사용해야 했습니다.
- 이전에는 `typing.List`나 `typing.Dict`를 사용해야 했지만, 이제는 `list[int], dict[str, int]`와 같이 내장 타입에 직접 타입 인수를 전달할 수 있습니다.
- 이는 코드의 간결성과 가독성을 향상시킵니다.

```python
from typing import List, Dict

# 기존 방식
def process_items(items: List[int]) -> Dict[str, int]:
    return {str(item): item for item in items}

# 새로운 방식
def process_items(items: list[int]) -> dict[str, int]:
    return {str(item): item for item in items}
```

## 3. 새로운 문자열 메소드
문자열에서 특정 접두사나 접미사를 제거하는 메소드가 추가되었습니다.
- `removeprefix(prefix)`는 문자열이 지정된 접두사로 시작하면 그 접두사를 제거한 새로운 문자열을 반환합니다.
- `removesuffix(suffix)`는 문자열이 지정된 접미사로 끝나면 그 접미사를 제거한 새로운 문자열을 반환합니다.
- 문자열이 지정된 접두사나 접미사로 시작하지 않거나 끝나지 않으면 원본 문자열을 그대로 반환합니다.

```python
text = "python_rocks"

# 기존 방식
if text.startswith("python_"):
    result = text[len("python_"):]
else:
    result = text
print(result)  # 출력: rocks

# 새로운 방식 (removeprefix 사용)
result = text.removeprefix("python_")
print(result)  # 출력: rocks

# removesuffix 사용
filename = "report.pdf"
name = filename.removesuffix(".pdf")
print(name)  # 출력: report
```

## 4. `zoneinfo` 모듈 추가
표준 시간대 데이터베이스를 지원하는 `zoneinfo` 모듈이 추가되었습니다. 이를 통해 타임존 처리가 더욱 간편해졌습니다.
- `ZoneInfo` 클래스를 사용하여 타임존 정보를 가져올 수 있습니다.
- `datetime` 객체와 함께 사용하여 타임존 간의 시간 변환이 가능합니다.
- 시스템에 설치됨 IANA 시간대 데이터베이스를 사용합니다.

```python
from zoneinfo import ZoneInfo
from datetime import datetime, timedelta

# 특정 타임존의 현재 시간 가져오기
seoul_time = datetime.now(ZoneInfo("Asia/Seoul"))
print("서울 시간:", seoul_time)

# 타임존 간 시간 계산
new_york_time = seoul_time.astimezone(ZoneInfo("America/New_York"))
print("뉴욕 시간:", new_york_time)
```

## 5. 유클리드 거리 계산 모듈
- `math.dist()` : 다차원 공간에서 두 점 사이의 유클리드 거리를 계산합니다.
- `math.hypot()` : 여러 좌표의 유클리드 놈을 계산합니다.

```python
import math

# math.dist 예제
point1 = [0, 0, 0]
point2 = [3, 4, 5]
distance = math.dist(point1, point2)
print(distance)  # 출력: 7.0710678118654755

# math.hypot 예제
norm = math.hypot(*point2)
print(norm)  # 출력: 7.0710678118654755
```



----
### 📜출처(참고 문헌)  


----
### 🔗연결 문서

[[Python 3.10]]
