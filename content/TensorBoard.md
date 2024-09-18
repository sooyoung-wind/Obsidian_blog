---
title: 
date: 2024-05-27 10:19
tags:
---

Created at : 2024-05-27 10:19  
Auther: Soo.Y  

# TensorBoard 

TensorBoard를 불러오는 코드
```python
# Load the TensorBoard notebook extension

%load_ext tensorboard
```


tensorboard의 callback 함수를 호출하고 훈련에 입력하는 방법
```python
model = create_model()

model.compile(optimizer='adam',

              loss='sparse_categorical_crossentropy',

              metrics=['accuracy'])

  

log_dir = "logs/fit/" + datetime.datetime.now().strftime("%Y%m%d-%H%M%S")

tensorboard_callback = tf.keras.callbacks.TensorBoard(log_dir=log_dir, histogram_freq=1)

  

model.fit(x=x_train,

          y=y_train,

          epochs=5,

          validation_data=(x_test, y_test),

          callbacks=[tensorboard_callback])
```

아래 그림와 같이 tensorboard의 logs 폴더가 생성된다.
![[Pasted image 20240527102319.png]]

아래 명령어를 사용해서 tensorboard를 육안으로 볼 수 있다.
```python
%tensorboard --logdir logs/fit
```



# 관련 문서

https://www.tensorflow.org/api_docs/python/tf/keras/callbacks/TensorBoard
