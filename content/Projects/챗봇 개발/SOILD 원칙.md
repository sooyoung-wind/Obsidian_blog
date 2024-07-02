---
title: SOILD 원칙
date: 2024-04-11 03:35
tags:
  - python
---

Created at : 2024-04-11 03:35  
Auther: Soo.Y  

# SOLID 원칙이란

SOLID 원칙은 객체 지향 프로그래밍과 디자인에서 중요한 5가지 원칙을 나타낸 원칙입니다. 이 원칙들은 소프트웨어를 더 이해하기 쉽고, 유지보수하기 쉽고 확장 가능하게 만드는데 도움이 됩니다. SOILD는 다음과 같은 원칙들의 약자입니다.

1. **S**ingle Responsibility Principle (단일 책임 원칙)
2. **O**pen/Closed Principle (개방/폐쇄 원칙)
3. **L**iskov Substitution Principle (리스코프 치환 원칙)
4. **I**nterface Segregation Principle (인터페이스 분리 원칙)
5. **D**ependency Inversion Principle (의존성 역전 원칙)

# S (Single Responsibility Principle)
단일 책임 원칙은 클래스가 하나의 책임만을 가져야 한다는 원칙입니다. 여기서 말하는 책임은 '변경되어야 하는 이유' 라고 하는데 어떻게 보면 기능이라고 이해하면 쉽다고 생각했다.

Logger는 로그를 출력하는 기능만 가지고 있고 EmailSender는 이메일을 전송하는 기능만 보유하고 있다. Order는 주문을 처리하는 기능만 보유하고 있다. 여기서 `__init__`에서 Logger와 EmailSender 클래스의 인스턴스를 생성해서 기능을 사용할 뿐 Logger 및 EmailSender의 기능을 문제를 담당하지 않는다. 그래서 Logger에 기능이 문제가 발생하면 Logger 클래스에서만 오류를 수정하면 된다.
```python
class Logger:
    """로그 기록 책임만을 가짐"""
    def log(self, message: str):
        print(f"Log: {message}")

class EmailSender:
    """이메일 전송 책임만을 가짐"""
    def send_email(self, to: str, content: str):
        print(f"Sending email to {to}: {content}")

class Order:
    """주문 관련 책임을 가짐. 로깅과 이메일 전송은 외부 서비스를 이용"""
    def __init__(self):
        self.logger = Logger()
        self.email_sender = EmailSender()

    def process_order(self, user_email: str):
        # 주문 처리 로직
        self.logger.log("Order processed.")
        self.email_sender.send_email(user_email, "Your order has been processed.")

# 사용 예시
order = Order()
order.process_order("user@example.com")
```

# O (Open-Closed Principle)
개방-폐쇄 원칙은 소프트웨어 개체(클래스, 모듈, 함수 등)는 확장에 대해서는 열려 있어야 하고 수정에 대해서는 닫혀 있어야 한다는 원칙입니다.

부모 클래스인 Report가 CSV를 처리하는 report 클래스, JSON을 처리하는 report 클래스로 다양하게 만들 수 있다.
```python
from abc import ABC, abstractmethod

class Report(ABC):
    @abstracmethod
    def generate(self):
        pass

class CSVReport(Report):
    def generate(self):
	    """csv report를 처리하는 로직"""
        return "CSV report data"

class JSONReport(Report):
    def generate(self):
	    """JSON report를 처리하는 로직"""
        return "JSON report data"
```

좀 더 복잡한 예시를 살펴보자.  🤔
Discount 추상 클래스를 선언하고 모든 할인의 기본을 정의하며 실제 할인 로직은 이를 상속받는 구체적인 클래스(NoDiscount, PercentageDiscount, FixedDiscount)에서 구현된 예시입니다. Product 클래스는 할인 객체를 받아서 할인된 가격을 계산합니다. 이 방식으로 새로운 할인 유형을 추가하고 싶을 때 Discount를 상속 받는 새로운 클래스를 만들기만 하면 되므로, 기존 코드를 변경할 필요 없이 확장할 수 있습니다.

```python
from abc import ABC, abstractmethod

class Discount(ABC):
    @abstractmethod
    def apply(self, price: float) -> float:
        pass

class NoDiscount(Discount):
    def apply(self, price: float) -> float:
        return price

class PercentageDiscount(Discount):
    def __init__(self, percentage: float):
        self.percentage = percentage

    def apply(self, price: float) -> float:
        return price - (price * self.percentage / 100)

class FixedDiscount(Discount):
    def __init__(self, discount: float):
        self.discount = discount

    def apply(self, price: float) -> float:
        return max(0, price - self.discount)

class Product:
    def __init__(self, name: str, price: float, discount: Discount):
        self.name = name
        self.price = price
        self.discount = discount

    def price_after_discount(self):
        return self.discount.apply(self.price)

# 사용 예시
no_discount_product = Product("Product with no discount", 100.0, NoDiscount())
percentage_discount_product = Product("Product with 10% discount", 100.0, PercentageDiscount(10))
fixed_discount_product = Product("Product with $20 discount", 100.0, FixedDiscount(20))

print(no_discount_product.price_after_discount())
print(percentage_discount_product.price_after_discount())
print(fixed_discount_product.price_after_discount())
```

# L (Liskov Substitution Principle)

리스코프 치환 원칙은 프로그램이 정확성을 잃지 않으면서 하위 타입의 인스턴스를 상위 타입 객체로 치환할 수 있어야 한다는 원칙입니다.



# I (Interface Segregation Principle)
인터페이스 분리 원칙은 클라이언트가 자신이 이용하지 않는 메서드에 의존하지 않아야 한다는 원칙입니다.

# D (Dependency Inversion Principle)
의존 역전 원칙은 상위 모듈이 하위 모듈에 의존하면 안 되며, 둘 다 추상화에 의존해야 한다는 원칙입니다.

# 관련 문서

https://wikidocs.net/168361
