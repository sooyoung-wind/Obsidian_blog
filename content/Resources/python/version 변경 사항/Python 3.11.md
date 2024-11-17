---
title: Python 3.11
date: 2024-11-18 01:45
tags:
---

Created at : 2024-11-18 01:45  
Auther: Soo.Y  

----
### 📝메모 

# Python 3.11
## 1. 예외 그룹과 `except*` 구문 (PEP 654)
비동기 프로그래밍이나 병렬 처리에서 여러 예외가 동시에 발생할 수 있습니다. Python 3.11에서는 이러한 여러 예외를 하나의 예외 그룹으로 묶을 수 있는 `ExceptionGroup`이 도입되었습니다.

```python
# 여러 예외를 포함한 예외 그룹 생성
exc_group = ExceptionGroup("여러 에러 발생", [
    ValueError("잘못된 값입니다."),
    TypeError("타입이 맞지 않습니다."),
    ZeroDivisionError("0으로 나눌 수 없습니다.")
])

try:
    raise exc_group
except* ValueError as e:
    print(f"ValueError 처리: {e}")
except* TypeError as e:
    print(f"TypeError 처리: {e}")
except* Exception as e:
    print(f"기타 예외 처리: {e}")
```

- `except*`구문은 예외 그룹에서 해당 예외 타입에 매칭되는 예외들을 처리합니다.
- `e.exceptions`는 처리된 예외들의 리스트를 제공합니다.
- 처리되지 않은 예외는 다시 예외 그룹으로 묶여 전파됩니다.
- 이 기능은 복잡한 예외 처리를 단순화하고, 비동기 코드에서의 예외 관리를 더욱 효율적으로 만들어줍니다.

## 2. 성능 향상
Python 3.11은 내부 최적화를 통해 전반적으로 실행 속도를 크게 향상시켰습니다. 대부분의 코드에서 10~60%의 성능 개선을 기대할 수 있습니다.

```python
import time

def compute():
    total = 0
    for i in range(1_000_000):
        total += i
    return total

start_time = time.time()
result = compute()
end_time = time.time()

print(f"결과: {result}")
print(f"실행 시간: {end_time - start_time} 초")
```

## 3. `asyncio` 모듈의 개선: `TaskGroup` 클래스
비동기 작업을 그룹화하고 관리하기 위한 `TaskGroup` 클래스가 추가되었습니다.
```python
import asyncio

async def task(name, delay):
    await asyncio.sleep(delay)
    print(f"작업 {name} 완료")

async def main():
    async with asyncio.TaskGroup() as tg:
        tg.create_task(task("A", 2))
        tg.create_task(task("B", 1))
    print("모든 작업 완료")

asyncio.run(main())
```

출력:
```text
작업 B 완료
작업 A 완료
모든 작업 완료
```

- `asyncio.TaskGroup()`을 사용하면 여러 비동기 작업을 한 그룹으로 묶어 관리할 수 있습니다.
- `async with` 블록이 종료될 때까지 그룹 내의 모든 작업이 완료될 때까지 기다립니다.
- 작업 중 하나에서 예외가 발생하면 그룹 내의 다른 작업들도 취소됩니다.

## 4. 타입 힌팅 개선
### 4.1 `Self`타입 (PEP 673)
클래스 메서드의 반환 타입을 정의할 때 `Self` 타입을 사용할 수 있게 되었습니다. 이는 메서드 체이닝이나 서브클래싱에서 타입 힌딩을 더욱 정확하게 만들어줍니다.

```python
from typing import Self

class Shape:
    def set_color(self, color: str) -> Self:
        self.color = color
        return self

class Circle(Shape):
    def set_radius(self, radius: float) -> Self:
        self.radius = radius
        return self

circle = Circle().set_color("red").set_radius(5.0)
```

- `set_color`와 `set_radius`메서드는 `Self`타입을 반환하여 메서드 체이닝이 가능하게 합니다.
- `Self`는 현재 인스턴스의 타입을 의미하므로, 서브클래싱 시에도 정확한 타입 정보를 제공합니다.

### 4.2 typing.LiteralString (PEP 675)
보안과 관련된 함수에 리터럴 문자열만 허용하도록 LiteralString 타입이 추가되었습니다.

```python
from typing import LiteralString

def safe_format(template: LiteralString, /, **kwargs):
    return template.format_map(kwargs)

# 올바른 사용
result = safe_format("안녕하세요, {name}님!", name="홍길동")
print(result)  # 출력: 안녕하세요, 홍길동님!

# 잘못된 사용
user_input = "{name}님이 로그인했습니다."
# 다음 줄은 타입 검사기에서 오류를 발생시킵니다.
# result = safe_format(user_input, name="홍길동")
```

- `LiteralString`타입은 함수 인자로 리터럴 문자열만 받도록 제한합니다.
- 외부 입력이나 변수에 저장된 문자열을 인자로 전달하면 타입 검사기에서 오류를 발생시킵니다.
- 이는 포맷 문자열 공격과 같은 보안 취약점을 방지하는 데 도움이 됩니다.

## 5. TOML 파서 (`tomllib`) 추가 (PEP 680)
Python 표준 라이브러리에 TOML 파일을 파싱할 수 있는 `tomllib` 모듈이 추가되었습니다.

```python
import tomllib

with open('config.toml', 'rb') as f:
    config = tomllib.load(f)

print(config)
```

`config.toml`파일
```toml
[database]
user = "admin"
password = "secret"
host = "localhost"
port = 3306
```

출력
```python
{
'database':
 {
  'user': 'admin',
  'password': 'secret',
  'host': 'localhost',
  'port': 3306
  }
}
```

- `tomllib.load()`를 사용하여 TOML 형식의 파일을 딕셔너리로 파싱할 수 있습니다.
- 이제 별도의 외부 라이브러리 없이도 TOML 파일을 손쉽게 처리할 수 있습니다.

## 7 `dataclasses`모듈의 `slots` 지원 (PEP 681)
`dataclasses.dataclass` 데코레이더에 `slots=True`옵션을 추가하여 자동으로 `__slots__`를 생성할 수 있습니다.

`slots`을 사용하지 않을 경우
```python
from dataclasses import dataclass

@dataclass
class Person:
    name: str
    age: int

p = Person(name="John", age=30)
p.new_attr = "Oops!"  # 새로운 속성 추가 가능
```

`slots`을 사용한 경우
```python
from dataclasses import dataclass

@dataclass(slots=True)
class Person:
    name: str
    age: int

p = Person(name="John", age=30)
# p.new_attr = "Oops!"  # AttributeError 발생: 'Person' 객체에 'new_attr' 속성을 추가할 수 없습니다.
```

##### **slots를 사용하는 이유**
- **성능 최적화**: 많은 인스턴스를 생성하거나 속성을 자주 접근하는 경우 성능이 향상됩니다.
- **메모리 절약**: 메모리 소비가 감소하여 메모리 효율이 높아집니다.

##### **제한사항**
- **유연성 감소**: `slots`를 사용하면 선언된 속성 외에 새로운 속성을 추가할 수 없기 때문에 유연성이 다소 감소합니다.
- **다중 상속 제한**: `slots`를 사용한 클래스는 다중 상속에서 제한이 있을 수 있습니다.

----
### 📜출처(참고 문헌)  

[Python 3.11 공식문서](https://docs.python.org/3.11/whatsnew/3.11.html)

----
### 🔗연결 문서

[[Python 3.10]]
