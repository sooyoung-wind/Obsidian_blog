---
title: PyCaret 프로세스
date: 2024-10-31 17:55
tags:
  - AutoML
---

Created at : 2024-10-31 17:55  
Auther: Soo.Y  

----
### 📝메모 

# Setup
X_train와 y_train은 판다스 데이터프레임 타입으로 입력하면 됩니다.
experiment_name에 실험 이름을 지정할 수 있습니다.

```python
from pycaret.classification import ClassificationExperiment

s= ClassificationExperiment()

s.setup(
    data=X_train,
    target=y_train,
    experiment_name='cold_disease',
    verbose=True,
    normalize=True,
)
```

# compare_models
`compare_models`로 다양한 모델(각자 개별 모델 결과임) 성능을 비교하여 best 모델을 만듭니다. best model은 `n_select`로 랭킹 순위에 해당하는 모델을 선택할 수 있습니다. `exclude`에서 제외하고 싶은 모델을 선택할 수 있습니다.
```python
best = s.compare_models(
    sort='F1',
    fold=10,
    n_select=3,
    exclude=['lightgbm'],
)
print(best)```

# tune_model
`tune_model`로 best model에서 튜닝을 수행합니다.
```python
tuned_models = [s.tune_model(model) for model in best]
print(tuned_models)
```

# blend_models
`blend_models`를 사용해서 조합된 모델(Voting)을 만듭니다. `optimize`를 사용해서 어떤 평가 지표로 튜닝할지 선택합니다. 기본 값은 Accuracy로 되어 있어서 만약 정확도가 중요한 상황이 아니면 변경해야 합니다.
```python
blended_model = s.blend_models(estimator_list=tuned_models, optimize='F1')
print(blended_model)
```

# finalize_model
`finalize_model`을 사용해서 최종 결정된 모델에 대해서 모든 데이터를 사용하여 학습을 합니다.
```python
final_model = s.finalize_model(blended_model)
print(final_model)
```

# predict_model
`predict_model`을 사용해서 예측 결과를 계산합니다. `raw_score=True`을 설정하면 label에 대한 확률 값을 같이 만듭니다. (단, 모델에서 확률 값이 없으면 생성이 안됩니다.)
```python
predictions = s.predict_model(final_model, data=X_valid, raw_score=True)
predictions
```

# save_model
`save_model`을 사용해서 모델을 저장합니다. pkl 파일로 저장됩니다.
```python
s.save_model(final_model, 'model_name')
```

# load_model
`load_model`을 사용해서 저장된 모델을 불러옵니다.
```python
s.load_model('model_name)
```

----
### 📜출처(참고 문헌)  


----
### 🔗연결 문서


