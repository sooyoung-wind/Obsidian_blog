---
title: PyCaret OPP방식으로 사용법(Quickstart)
date: 2024-10-31 13:02
tags:
  - AutoML
---

Created at : 2024-10-31 13:02  
Auther: Soo.Y  

----
### 📝메모 

# Classification

pycaet은 클래스의 인스턴스를 만들어서 사용하는 OOP방식과 함수를 호출해서 사용하는 functional API, 2가지 방식을 제공하고 있다. 여기서는 OOP방식으로 클래스 구현체를 사용하는 방법에 대해서 다루고자 합니다.

pycaret은 데이터를 설정하는 setup 단계, model 단계, 예측 단계로 나눌 수 있다. 
1. `setup` : 데이터 설정
2. model  : `compare_model()`, `create_model('rf')`와 같은 무엇을 할지 수행하면 됩니다.
3. 예측 : 훈련된 모델 예측, `finalize_model`와 `predict_model` 를 사용

## Setup

setup 메서드를 사용하여 train data와 target을 설정할 수 있다. 만약 data안에 target 컬럼이 포함되어 있다면 target에 해당 컬럼 이름만 넘겨주면 됩니다. 
예) `target="Target_Columns_Name"`

```python
from pycaret.classification import ClassificationExperiment
seed_num = 9234
s= ClassificationExperiment()
s.setup(
    data=X_train,
    target=y_train,
    session_id=seed_num,
    log_experiment=True,
    experiment_name='cold_disease',
    log_plots=True,
    verbose=True,
)
```


## Model

### compare_models
`compare_models`은 다양한 모델을 훈련한 후에 성능을 비교해서 best model를 선정해 줍니다.
```python
best = s.compare_models()
print(best)
```

### create_model
`create_model`은 하나의 모델에 대해서 찾는 함수입니다.
```python
rf = create_model('rf')
```

#### Tunning
`tune_model`은 모델의 하이퍼 파라미터를 튜닝하는 함수입니다.
```python
tuned_rf = tune_model(rf)
```

#### Blending
`blend_models` 함수를 사용하면 여러 모델들을 혼합하여 새로운 모델을 생성합니다. 모델을 개별로 생성해서 blend(혼합)해도 되고 compare_model을 사용하여 생성한 모델을 사용해도 blend가 가능합니다.
```python
# 방법(1)
nb = create_model('nb')
xgb = create_model('xgboost')

blender_1 = blend_models(estimator_list = [nb, xgb])

# 방법(2)
best_model_top_5 = compare_models(n_select=5)
blender_5 = blend_models(best_model_top_5)
```

# 모델 성능 그래프
```python
s.plot_model(xgb, plot='confusion_matrix')
s.plot_model(xgb, plot='class_report')
s.plot_model(xgb, plot='feature')
```

# 예측
`finalize_model` 함수를 사용해서 cross_validation을 적용하여 전체 데이터에 대해서 최종적으로 학습을 합니다. 마지막 모델을 설정한 후에 `predict_model` 함수를 사용해서 예측을 합니다. 예측 결과는 classification model이라서 `Label` 컬럼에 저장됩니다.
`predict_model`에서 파라미터로 `raw_score=True`을 설정하면 예측 값에 대한 확률을 같이 출력합니다.(모델에서 확률 값이 없으면 무시됩니다.)
```python
final_model = finalize_model(blender_5)
prediction = predict_model(final_model, data = test, raw_score=True)
```

# 저장하기
```python
s.save_model(final_model, 'project_name')
```

----
### 📜출처(참고 문헌)  

https://pycaret.gitbook.io/docs/get-started/quickstart

----
### 🔗연결 문서


