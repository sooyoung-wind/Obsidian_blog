---
title: Python Class 사용에 대해서
date: 2024-03-29 12:31
tags:
  - python
---

Created at : 2024-03-29 12:31  
Auther: Soo.Y  


# Class 데코레이션

클래스에서 사용하는 데코레이터은 총 3가지로 classmethod, staticmethod, property

## 데코레이터란?
데코레이터는 함수나 메서드의 변환을 위해서 사용되는 특별한 유형의 함수를 말합니다. 데코레이터를 사용하면 기존의 코드를 수정하지 않고 함수의 기능을 추가적으로 확장할 수 있습니다. 이를 통해 코드의 재사용성과 유지 보수성을 높일 수 있다고 합니다.

```python
def my_decorator(func):
    def wrapper(text):
        print("함수를 호출하기 전")
        func(text)
        print("함수를 호출한 후")
    return wrapper

@my_decorator
def say_hello(text):
    print(f"Hello! {text}")

say_hello('안녕')
```

위의 코드는 데코레이션의 예제이고 이를 풀어서 작성하면 아래와 같습니다.

```python
a = my_decorator(say_heelo)
a()
```

결국 위의 코드를 `@my_decorator`를 통해서 간단하게 구현한 결과입니다.

### args 사용 적용

데코레이터의 예시를 arg를 설명하겠습니다. 만약 `say_hello`의 함수가 많은 파라미터를 받게 된다면 일일이 작성을 해줘야 하는데 `arg`를 사용해서 한번에 전달이 가능합니다.

```python
def my_decorator(func):
    def wrapper(*arg):
        print("함수를 호출하기 전")
        func(*arg)
        print("함수를 호출한 후")
    return wrapper

@my_decorator
def say_hello(text, text1, text2):
    print(f"Hello! {text} {text1} {text2}")

say_hello('안녕', "반가워", "오늘은 어때?")
```

### kwargs

같은 예시를 두고 설명하겠습니다. kwarg는 arg는 튜플 형태로 함수에 위치 기반으로 파라미터를 전달하고 kwarg는 딕셔너리 형태로 함수에 키워드 기반으로 파라미터를 전달합니다. 결국 args는 매개변수의 이름을 명시하지 않고 kwargs는 매개변수의 이름을 명시하여 사용하는 점이 다릅니다.

```python
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("함수를 호출하기 전")
        func(*args, **kwargs)  # func 함수에 위치 인자와 키워드 인자 모두 전달
        print("함수를 호출한 후")
    return wrapper

@my_decorator
def say_hello(greeting, name, question):
    print(f"{greeting}! {name}, {question}")

say_hello(greeting='안녕', name="반가워", question="오늘은 어때?")

```

또 다른 예시로 class에서 사용하는 kwargs입니다. 이 예시는 kwargs의 내부에 어떤 딕셔너리 구조로 되어 있는지 확인이 힘들기 때문에 `setattr`를 사용해서 각 key, value를 유연하게 할당될 수 있도록 구현된 예시입니다.

```python
class Person:
    def __init__(self, name, **kwargs):
        self.name = name
        for key in kwargs:
            setattr(self, key, kwargs[key])

class Employee(Person):
    def __init__(self, name, id, **kwargs):
        super().__init__(name, **kwargs)
        self.id = id

emp = Employee(name="Bob", id="1234", department="HR")
print(emp.name, emp.id, emp.department)
```

## classmethod
classmethod 데코레이터는 클래스 메서드를 정의하는데 사용됩니다. classmethod를 사용하면 class의 인스턴스를 만들지 않고 클래스 자체에서 바로 메서드를 사용할 수 있게 해줍니다. 클래스 메서드는 첫 번째 인자로 class 자신을 의미하는 `cls`를 받습니다. 이를 통해 class의 method는 인스턴스 변수가 아닌 class 변수에 접근하고, class 변수를 변경하는 등의 작업을 수행할 수 있습니다.

아래는 classmethod를 사용한 예시입니다.

```python
class Employee:
    raise_amount = 1.04  # 연봉 인상률 클래스 변수

    def __init__(self, first, last, pay):
        self.first = first
        self.last = last
        self.pay = pay

    @classmethod
    def set_raise_amount(cls, amount):
        cls.raise_amount = amount

# 클래스 메서드를 사용하여 클래스 변수 수정
Employee.set_raise_amount(1.05)

emp_1 = Employee('John', 'Doe', 50000)
emp_2 = Employee('Jane', 'Doe', 60000)

# 클래스 변수가 변경됨
print(Employee.raise_amount)  # 출력: 1.05
print(emp_1.raise_amount)  # 출력: 1.05
print(emp_2.raise_amount)  # 출력: 1.05
```

결국 `@classmethod`는 class 수준의 데이터를 수정하거나, class 변수에 접근해야 할 때 주로 사용한다고 합니다.

#### `classmethod`의 주요 특징
- 클래스 메서드는 첫 번째 매개변수로 클래스(`cls`)를 자동으로 받습니다.
- 클래스 메서드는 클래스 변수나 다른 클래스 메서드에 접근할 수 있습니다.
- 클래스 메서드는 해당 클래스의 인스턴스가 생성되지 않아도 호출될 수 있습니다.
- 클래스 메서드는 상속 시에도 자식 클래스의 `cls`를 참조하게 되므로, 상속 구조에서 유연하게 사용될 수 있습니다.


## staticmethod

`@staticmethod`는 메서드가 class 및 class의 인스턴스에 대한 어떠한 정보도 필요하지 않음을 의미합니다. 즉, 이 메서드 내에서는 `self`나 `cls`를 사용하지 않습니다. 정적 메서드(static method)는 클래스 이름을 통해 호출할 수 있으며, class나 class의 인스턴스를 통해서도 호출할 수 있습니다. 하지만 class의 상태나 인스턴스의 상태를 변경할 수 없습니다.

```python
class Math:
    @staticmethod
    def add(x, y):
        return x + y

# 클래스를 통해 직접 호출
print(Math.add(5, 3))  # 출력: 8

# 인스턴스를 통해 호출할 수도 있지만, 일반적인 사용법은 아님
math_instance = Math()
print(math_instance.add(10, 20))  # 출력: 30

```


## @property
property 데코레이터을 사용해서 class의 인스턴스 속성을 보호하거나 관리를 체계적으로 할 수 있습니다.  property는 class의 속성과 같이 접근이 가능하여 괄호를 사용하지 않을 수 있습니다. (예 `sooyong.age`) 구현은 class의 메서드로 작성됩니다. 

```python
class Person:
  def __init__(self, first_name, last_name, age):
    self.first_name = first_name
    self.last_name = last_name
    self._age = age

  @property
  def age(self):
    return self._age

  @age.setter
  def age(self, value):
    if value > 0:
      self._age = value
    else:
      raise ValueError("Age must be a positive number")
```

`@property`는 게터(getter) 메서드에서 사용되며, `@property_name.setter`는 세터(setter) 메서드 정의에 사용됩니다. 이를 통해 캡슐화를 구현할 수 있다고 하는데 저는 아직 캡슐화에 대한 개념을 잘 모르겠습니다. 다만, **속성에 대한 유효한 입력 값이 들어왔는지 검증할 수 있다고 볼 수 있습니다.**


# 관련 문서


