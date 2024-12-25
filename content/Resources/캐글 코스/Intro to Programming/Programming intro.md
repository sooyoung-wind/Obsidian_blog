---
title: Programming intro
date: 2024-12-25 15:29
tags:
  - python
---

Created at : 2024-12-25 15:29  
Auther: Soo.Y  

----
### 📝메모 

#### 연산과 변수

```python
print("안녕") # 문자 출력

1 + 3 # 연산
```

#### 함수

```python
def get_cost(num_coins: int, values: int) -> int:
    cost = num_coins * values
    print(f"{cost}입니다.")
    return cost

# 선언한 함수 사용하기
get_cost(3, 100)
```

#### Data Types

정수형
```python
x = 10
print(x) # 10
print(type(x)) # <class 'int'>
```

실수형
```python
y = 12.46789378972
print(y) # 12.46789378972
print(type(y)) # <class 'float'>
```

Booleans
```python
z_one = True
print(z_one) # True
print(type(z_one)) # <class 'bool'>

z_two = False
print(z_two) # False
print(type(z_tow)) # <class 'bool'>

z_three = (1 < 2)
print(z_three) # True
print(type(z_three))  # <class 'bool'>

z_four = (5 < 3)
print(z_four) # False
print(type(z_four)) # <class 'bool'>

z_five = not z_four
print(z_five) # True
print(type(z_five)) # <class 'bool'>
```

#### 문자열
```python
word = "안녕"
print(word) # 안녕
print(type(word)) # <class 'str'>

my_number = "1.2345"
print(my_number) # "1.2345"
print(type(my_number)) # <class 'str'>

float_my_number = float(my_number)
print(float_my_number) # 1.2345
print(type(float_my_number)) # <class 'float'>

new_string = "안" + "녕"
print(new_string) # 안녕
print(type(new_string)) 

there_sting = "안녕" * 3
print(there_sting) # 안녕안녕안녕
print(type(there_sting))

print(False + False) # 0
print(True + False) # 1
print(False + True) # 1
print(True + True) # 2
print(False + True + True + True) # 3
```

#### 조건문

| Symbol | 의미      |
| ------ | ------- |
| ==     | 같다      |
| !=     | 같지 않다.  |
| <      | 작다      |
| <=     | 작거나 같다. |
| >      | 크다      |
| >=     | 크거나 같다. |

```python
if 조건:
    실행할 코드

x = 10
if x > 5:
    print("x는 5보다 큽니다.")

# if-else 문
x = 3
if x > 5:
    print("x는 5보다 큽니다.")
else:
    print("x는 5보다 크지 않습니다.")

# if-elif-else문
x = 7
if x > 10:
    print("x는 10보다 큽니다.")
elif x > 5:
    print("x는 5보다 크지만 10보다 작거나 같습니다.")
else:
    print("x는 5보다 작거나 같습니다.")
```

#### 리스트(List)

```python
# 리스트 만들기
fruits = ["사과", "바나나", "체리"]
print(fruits)  # ["사과", "바나나", "체리"]

# 리스트 길이
print(len(fruits))  # 3

# 리스트 요소 접근
print(fruits[0])  # "사과"
print(fruits[-1])  # "체리" (마지막 요소)

# 리스트 요소 변경
fruits[1] = "귤"
print(fruits)  # ["사과", "귤", "체리"]

# 리스트 요소 제거
fruits.remove("체리")
print(fruits)  # ["사과", "바나나"]

# 리스트 요소 추가
fruits.append("체리")
print(fruits)  # ["사과", "귤", "체리"]

# 리스트 정렬하기
numbers = [3, 1, 4, 7, 2]
number.sort()
print(number) # [1, 2, 3, 4, 7]
```

----
### 📜출처(참고 문헌)  


----
### 🔗연결 문서


