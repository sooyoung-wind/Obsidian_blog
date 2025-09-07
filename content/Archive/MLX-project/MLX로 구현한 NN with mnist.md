---
title: MLX-project NN model with mnist
date: 2024-06-23 13:33
tags:
  - mlx
  - python
---

Created at : 2024-06-23 13:33  
Auther: Soo.Y  

코랩(Colab) 환경에서 MLX를 사용하여 MLP(Multi-Layer Perceptron)을 구현하는 내용입니다. 예제로 사용하는 데이터는 mnist입니다.

# MLX install
코랩에는 MLX를 설치하는 방법은 `pip install mlx`을 하면 됩니다.

# Mnist data set
예제 사용할 minist를 가져오기 위한 코드는 다음과 같습니다.
```python
import gzip
import os
import pickle
from urllib import request
import numpy as np

def mnist(
	save_dir="/tmp",
	base_url="https://raw.githubusercontent.com/fgnt/mnist/master/",
	filename="mnist.pkl",
):

	def download_and_save(save_file):
		filename = [
			["training_images",  "train-images-idx3-ubyte.gz"],
			["test_images",  "t10k-images-idx3-ubyte.gz"],
			["training_labels",  "train-labels-idx1-ubyte.gz"],
			["test_labels",  "t10k-labels-idx1-ubyte.gz"],
		]

		mnist = {}

		for name in filename:
			out_file = os.path.join("/tmp", name[1])
			request.urlretrieve(base_url + name[1], out_file)

		for name in filename[:2]:
			out_file = os.path.join("/tmp", name[1])
			with gzip.open(out_file,  "rb")  as f:
				mnist[name[0]] = np.frombuffer(f.read(), np.uint8, offset=16).reshape(
					-1,  28 * 28
				)

		for name in filename[-2:]:
			out_file = os.path.join("/tmp", name[1])

			with gzip.open(out_file,  "rb")  as f:
				mnist[name[0]] = np.frombuffer(f.read(), np.uint8, offset=8)
			with  open(save_file,  "wb")  as f:
				pickle.dump(mnist, f)

	def preproc(x):
		return x.astype(np.float32) / 255.0

	save_file = os.path.join(save_dir, filename)
	if not os.path.exists(save_file):
		download_and_save(save_file)
	with open(save_file,  "rb")  as f:
		mnist = pickle.load(f)
		
	mnist["training_images"] = preproc(mnist["training_images"])
	mnist["test_images"] = preproc(mnist["test_images"])

	return (
		mnist["training_images"],
		mnist["training_labels"].astype(np.uint32),
		mnist["test_images"],
		mnist["test_labels"].astype(np.uint32),
	)

train_x, train_y, test_x, test_y = mnist()
```
훈련 데이터는 60,000개, 테스트 데이터는 10,000개로 구성되어 있습니다.

`train_x.shape, train_x`
> ((60000, 784),  
 array([[0., 0., 0., ..., 0., 0., 0.],  
        [0., 0., 0., ..., 0., 0., 0.],  
        [0., 0., 0., ..., 0., 0., 0.],  
        ...,  
        [0., 0., 0., ..., 0., 0., 0.],  
        [0., 0., 0., ..., 0., 0., 0.],  
        [0., 0., 0., ..., 0., 0., 0.]], dtype=float32))

`train_y.shape, train_y`  
> ((60000,), array([5, 0, 4, ..., 5, 6, 8], dtype=uint32))

# MLP 만들기
## 모듈 불러오기
```python
import sys
import argparse
import time
from functools import partial
import mlx.core as mx
import mlx.nn as nn
import mlx.optimizers as optim
import numpy as np
```

## MLP class

MLX에서는 모델을 구현할 때 매직메서드 `__init__`과 `__call__`을 사용하여 구현합니다. pytorch에서는 forward 함수를 정의하는 것과 유사한 방법으로 볼 수 있습니다.(실제로는 pytorch에서 forward를 작성하지만 `__call__`에서 이미 forward 함수를 호출하도록 구현되어 있습니다.

```python
class  MLP(nn.Module):

	def __init__(
		self,
		num_layers: int, # hidden layer의 수
		input_dim: int, hidden_dim: int, output_dim: int
	):

	super().__init__()
		layer_sizes = [input_dim] + [hidden_dim] * num_layers + [output_dim]
		self.layers = [
			nn.Linear(idim, odim)
			for idim, odim in  zip(layer_sizes[:-1], layer_sizes[1:])
		]

	def __call__(self, x):
		for l in  self.layers[:-1]:
			x = nn.relu(l(x))
		return  self.layers[-1](x)
```

## Batch 함수

배치 단위 마다 데이터를 불러오는 함수를 구현하고자 합니다.  함수에는  배치의 크기인 `batch_size`, 입력 데이터의 `X`와 출력 데이터의 정답인 `y`를 받도록 작성합니다.
데이터의 셔플을 구현하기 위해서 `np.random.permutation`을 사용하여 무작위로 데이터가 섞이도록 하였습니다.
마지막으로 `mx.array`을 사용하여 MLX의 array 구조로 변환합니다.

```python
def  batch_iterate(batch_size, X, y, suffle=True):
	if suffle:
		perm = mx.array(np.random.permutation(y.size))
	else:
		perm = mx.array(np.range(y.size))
	for s in  range(0, y.size, batch_size):
		ids = perm[s : s + batch_size]
		yield mx.array(X[ids]), mx.array(y[ids])
```

작성된 코드가 잘 작동하는지 아래 코드와 같이 실행해보면 `X, y`에 첫 번째와 두 번째 데이터가 들어가 있습니다. 
```python
X, y = next(batch_iterate(2, train_x, train_y,  False))
```
또한, `type(X)`를 실행해보면 mlx.core.array로 나옵니다.

## 손실함수

문제에 적합한 함수를 선택하여 불러오면 됩니다.  MLX에서도 [loss 함수](https://ml-explore.github.io/mlx/build/html/python/nn/losses.html)는 따로 구현된 함수들을 사용하면 됩니다.

```python
def  loss_fn(model, X, y):
	return nn.losses.cross_entropy(model(X), y, reduction="mean")
```
MLX에서는 `nn.value_and_grad`를 사용해서 wrapper함수로 만들어주고, 이 wrapper함수를 실행하면 loss 값과 gradient 값이 계산됩니다.  

> 주의! nn은 pytorch에서 사용하는 nn이 아닙니다. 

```python
loss_and_grad_fn = nn.value_and_grad(model, loss_fn)
loss, grad = loss_and_grad_fn(model, X, y)
```
## Optimizer 불러오기

사용하고자 하는 optimizer를 선택하여 불러옵니다. [Optimizer](https://ml-explore.github.io/mlx/build/html/python/optimizers/common_optimizers.html)도 MLX에서 구현된 함수들을 사용하면 됩니다.

optimizer마다 파라미터의 종류는 다르지만 공통 파라미터인 learning rate만 입력해주면 나머지는 기본 값으로 설정됩니다. 

```python
test_lr = 1
optimizer = optim.SGD(learning_rate=test_lr)
```

그 뒤에 앞에서 계산한 gradient 값과 함께 모델 객체를 넘겨주면 weight가 업데이트 됩니다.

```python
optimizer.update(model, grad)
```
## gradient update 직접 계산
아래 코드를 통해서 gradient의 update하는 계산할 수 있습니다. 이를 MLX에서 update한 계산 결과와 비교하여 검증해 봅시다.  

```python
weight_myself = init_parameters['layers'][1]['weight'] - grad['layers'][1]['weight'] * 1
weight_mlx = model.parameters()['layers'][1]['weight']

print(weight_myself)
print(weight_mlx)
```

## Validation 

훈련이 완료되었으면, test data set으로 모델을 검증하는 과정이 필요합니다. 이번 예제에서는 숫자 0부터 9까지의 레이블을 맞추는 문제이므로 `argmax`를 사용해서 가장 높은 확률이 계산된 레이블을 찾아줘서 정답과 비교하면 됩니다. 


```python
mlx_test_x = mx.array(test_x)
mlx_test_y = mx.array(test_y)
mx.mean(mx.argmax(model(mlx_test_x), axis=1) == mlx_test_y)
```

# MLP 전체 코드

링크 : 코드를 어디에서 공유해야 할까요?



# 관련 문서


