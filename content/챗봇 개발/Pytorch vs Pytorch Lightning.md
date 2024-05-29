---
title: Pytorch와 Pytorch Lightning 차이에 대해서
date: 2024-05-29 14:54
tags:
  - environment
  - platform
  - python
---

Created at : 2024-05-29 14:54  
Auther: Soo.Y  

# Pytorch vs. Pytorch Lightning

### 1. PyTorch와 PyTorch Lightning이란?

- **PyTorch**는 AI 모델을 만들고 훈련시키는 데 사용되는 도구입니다. 레고 블록처럼 필요한 것들을 하나하나 조립해서 모델을 만들 수 있습니다.
- **PyTorch Lightning**은 PyTorch를 더 사용하기 쉽게 만들어주는 도구입니. PyTorch로 만든 레고 모델을 더 깔끔하고 정리된 방법으로 조립하는 것을 도와준다고 생각하면 됩니다.

### 2. PyTorch와 PyTorch Lightning의 차이점

#### PyTorch: 모든 걸 내가 직접 할 수 있어요!

PyTorch는 AI 모델을 만드는 데 필요한 모든 것을 세부적으로 조절할 수 있게 해줘요. 하지만 이 모든 걸 직접 관리해야 해서 조금 복잡할 수 있어요.

예를 들어, 요리 수업에서 선생님이 재료를 주고 "네가 원하는 대로 요리해봐!"라고 한다면, PyTorch는 바로 그런 느낌이에요.

#### PyTorch Lightning: 도와주는 친구가 있어요!

PyTorch Lightning은 PyTorch로 모델을 만들 때 필요한 많은 작업을 자동으로 해줘요. 요리 수업에서 선생님이 단계별로 요리법을 알려주고, 필요한 도구도 챙겨주며, 더 쉽게 요리할 수 있게 도와주는 것과 같아요.

### 3. 단계별로 알아보기

이제 PyTorch와 PyTorch Lightning으로 같은 모델을 만드는 과정을 단계별로 비교해 볼게요.

#### 데이터 준비하기

**PyTorch**에서는 데이터셋을 불러오고, 훈련용과 검증용으로 나누는 작업을 직접 해야 해요.

```python
import torch
from torch.utils.data import DataLoader, random_split
from torchvision.datasets import MNIST
from torchvision import transforms

# 데이터셋 불러오기
transform = transforms.Compose([transforms.ToTensor(), transforms.Normalize((0.5,), (0.5,))])
dataset = MNIST(root='./data', train=True, download=True, transform=transform)
train_dataset, val_dataset = random_split(dataset, [55000, 5000])

train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=32, shuffle=False)
```


**PyTorch Lightning**에서는 데이터 준비 과정을 간단하게 처리할 수 있어요.

```python error:1, info:6-7, warn:10,14,17
import pytorch_lightning as pl
from torch.utils.data import DataLoader, random_split
from torchvision.datasets import MNIST
from torchvision import transforms

class LitMNIST(pl.LightningModule):
    def prepare_data(self):
        MNIST(root='./data', train=True, download=True, transform=transform)

    def setup(self, stage=None):
        dataset = MNIST(root='./data', train=True, download=False, transform=transform)
        self.train_dataset, self.val_dataset = random_split(dataset, [55000, 5000])

    def train_dataloader(self):
        return DataLoader(self.train_dataset, batch_size=32, shuffle=True)

    def val_dataloader(self):
        return DataLoader(self.val_dataset, batch_size=32, shuffle=False)
```

#### 모델 만들기

**PyTorch**에서 모델을 만들 때는 모든 레이어(층)와 동작을 직접 정의해야 해요.

```python
import torch.nn as nn
import torch.nn.functional as F

class SimpleNN(nn.Module):
    def __init__(self):
        super(SimpleNN, self).__init__()
        self.fc1 = nn.Linear(28 * 28, 128)
        self.fc2 = nn.Linear(128, 64)
        self.fc3 = nn.Linear(64, 10)

    def forward(self, x):
        x = x.view(-1, 28 * 28)
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.fc3(x)
        return x

model = SimpleNN()
```

**PyTorch Lightning**에서는 비슷한 방식으로 모델을 정의하지만, 더 구조화된 방식으로 쉽게 정의할 수 있어요.

```python
class LitSimpleNN(pl.LightningModule):
    def __init__(self):
        super(LitSimpleNN, self).__init__()
        self.fc1 = nn.Linear(28 * 28, 128)
        self.fc2 = nn.Linear(128, 64)
        self.fc3 = nn.Linear(64, 10)

    def forward(self, x):
        x = x.view(-1, 28 * 28)
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.fc3(x)
        return x
```

#### 모델 훈련하기

**PyTorch**에서는 훈련 과정을 직접 작성해야 해요.

```python
import torch.optim as optim

criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

for epoch in range(5):
    model.train()
    for batch in train_loader:
        inputs, labels = batch
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

    model.eval()
    val_loss = 0
    correct = 0
    with torch.no_grad():
        for batch in val_loader:
            inputs, labels = batch
            outputs = model(inputs)
            val_loss += criterion(outputs, labels).item()
            pred = outputs.argmax(dim=1, keepdim=True)
            correct += pred.eq(labels.view_as(pred)).sum().item()
    
    print(f"Epoch {epoch+1}, Validation loss: {val_loss/len(val_loader)}, Accuracy: {correct/len(val_loader.dataset)}")
```

**PyTorch Lightning**에서는 훈련 과정을 쉽게 정의할 수 있어요.

```python
class LitSimpleNN(pl.LightningModule):
    # ... 이전 코드 생략 ...

    def training_step(self, batch, batch_idx):
        inputs, labels = batch
        outputs = self(inputs)
        loss = F.cross_entropy(outputs, labels)
        self.log('train_loss', loss)
        return loss

    def validation_step(self, batch, batch_idx):
        inputs, labels = batch
        outputs = self(inputs)
        loss = F.cross_entropy(outputs, labels)
        acc = accuracy(outputs, labels)
        self.log('val_loss', loss, prog_bar=True)
        self.log('val_acc', acc, prog_bar=True)
        return loss

    def configure_optimizers(self):
        optimizer = optim.Adam(self.parameters(), lr=0.001)
        return optimizer
```

#### 훈련 실행하기

**PyTorch**에서는 훈련을 직접 실행해야 해요.

```python
# 이미 훈련 루프 코드에 포함되어 있음
```

**PyTorch Lightning**에서는 간단하게 훈련을 실행할 수 있어요.

```python
from pytorch_lightning import Trainer

model = LitSimpleNN()
trainer = Trainer(max_epochs=5)
trainer.fit(model)
```

### 정리

- **PyTorch**는 모든 것을 직접 관리해야 하지만, 더 많은 자유도를 제공해요.
- **PyTorch Lightning**은 코드 구조를 더 깔끔하고 관리하기 쉽게 만들어줘요.

두 도구 모두 AI 모델을 만드는 데 매우 유용하며, 여러분이 어떤 도구를 선택할지는 필요에 따라 다를 거예요. PyTorch Lightning을 사용하면 더 쉽게 모델을 만들고 관리할 수 있어요!

여러분도 한 번 PyTorch와 PyTorch Lightning을 사용해 보세요. 재미있는 AI 모델을 만들 수 있을 거예요!


# 관련 문서


