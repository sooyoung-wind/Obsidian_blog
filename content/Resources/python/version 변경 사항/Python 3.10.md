---
title: Python 3.10
date: 2024-11-17 15:53
tags:
  - python
---

Created at : 2024-11-17 15:53  
Auther: Soo.Y  

----
### 📝메모 

# python 3.10

## 1. 구조적 패턴 매칭
python 3.10에서는 새로운 `match / case`문법을 도입하여 구조적 패턴 매칭을 지원합니다. 이는 값의 형태와 내용을 기반으로 분기 처리를 할 수 있게 해줍니다.

```python
def http_status(status):
    match status:
        case 400:
            return "Bad Request"
        case 404:
            return "Not Found"
        case 418:
            return "I'm a teapot"
        case _:
            return "Something's wrong with the internet"

print(http_status(404))  # 출력: Not Found
```

딕셔러니 형태 `match / case` 예제
```python
data = {"action": "move", "direction": "north"}

match data:
    case {"action": "move", "direction": direction}:
        print(f"Move towards {direction}")
    case {"action": "stop"}:
        print("Stop moving")
    case _:
        print("Unknown action")
```

## 2. 타입 힌팅 개선: 유니언 타입에 `|`연산자 사용
타입 힌팅에서 유니언 타입을 정의할 때 이제 `typing.Union` 대신 `|` 연산자를 사용할 수 있습니다.

- `int | str`은 `int` 또는 `str` 타입을 의미합니다.
```python
from typing import Union

# 기존 방식
def process(value: Union[int, str]) -> None:
    print(value)

# 새로운 방식
def process(value: int | str) -> None:
    print(value)
```

# 3. 에러 메시지 개선
python 3.10에서는 구문 오류 및 예외 발생 시 더 명확하고 상세한 에러 메시지를 제공합니다.

```python
# 잘못된 구문
def func():
    print("Hello"

# 이전 버전의 에러 메시지:
# SyntaxError: unexpected EOF while parsing

# Python 3.10의 에러 메시지:
# SyntaxError: '('로 열렸지만 일치하는 ')'가 없습니다.
```

## 4. 컨텍스트 관리자에서 괄호 사용 가능
이제 `with`문에서 여러 컨텍스트 관리자를 괄호로 묶어 여러 줄로 나눌 수 있습니다.

```python
# 기존 방식 (한 줄에 여러 컨텍스트 관리자)
with open("file1.txt") as f1, open("file2.txt") as f2:
    pass

# 새로운 방식 (괄호를 사용하여 여러 줄로 나누기)
with (
    open("file1.txt") as f1,
    open("file2.txt") as f2,
):
    pass
```

## 5. `typing` 모듈의 개선
### 5.1 매개변수 사양 변수 (ParamSpec)
`ParamSpec`을 사용하면 고차 함수의 매개변수 타입을 표현할 수 있습니다.
```python
from typing import Callable, TypeVar, ParamSpec

P = ParamSpec('P')
R = TypeVar('R')

def add_logging(f: Callable[P, R]) -> Callable[P, R]:
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
        print(f"Calling {f.__name__}")
        return f(*args, **kwargs)
    return wrapper

@add_logging
def add(a: int, b: int) -> int:
    return a + b

print(add(2, 3))  # 출력: Calling add\n5
```

### 5.2 타입 별칭(`TypeAlias`)
`TypeAlias`를 사용하여 타입 별칭을 명확하게 정의할 수 있습니다.

```python
from typing import TypeAlias

UserId: TypeAlias = int

def get_user_name(user_id: UserId) -> str:
    return "User Name"

print(get_user_name(123))  # 출력: User Name
```

## 6. `zip()` 함수의 엄격 모드 지원
`zip()` 함수에 새로운 `strict` 매개변수가 추가되어, 길이가 다른 이터러블을 전달할 때 오류를 발생시킬 수 있습니다.

- `strict=True`를 지정하면 전달된 모든 이터러블의 길이가 동일하지 않으면 `ValueError`가 발생합니다.
```python
# 기존 방식
list(zip([1, 2, 3], ['a', 'b']))  # 출력: [(1, 'a'), (2, 'b')]

# strict=True 사용
list(zip([1, 2, 3], ['a', 'b'], strict=True))  # ValueError 발생
```

## 7. `str` 타입의 `removeprefix()` 및 `removesuffix()` 메소드
python 3.9에서 도입된 `removeprefix()와 removesuffix()` 메소드를 사용할 수 있습니다.
```python
text = "unbelievable"

# 접두사 제거
print(text.removeprefix("un"))  # 출력: believable

# 접미사 제거
print(text.removesuffix("able"))  # 출력: unbeliev
```

## 8. statistics 모듈의 새로운 함수
`statistics.quantiles()` 데이터 집합의 분위수를 계산하는 함수가 추가되었습니다.

- `quantiles()`함수는 데이터의 분위수를 계산하여 리스트로 반환합니다.
- `n` 매개변수는 분위수의 수를 지정합니다.
```python
import statistics

data = [1, 2, 3, 4, 5, 6, 7, 8, 9]

quartiles = statistics.quantiles(data, n=4)
print(quartiles)  # 출력: [3.0, 5.0, 7.0]
```

----
### 📜출처(참고 문헌)  


----
### 🔗연결 문서


