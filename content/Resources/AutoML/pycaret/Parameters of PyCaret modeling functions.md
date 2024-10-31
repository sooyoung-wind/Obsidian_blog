---
title: Parameters of PyCaret modeling functions
date: 2024-10-31 14:04
tags:
  - AutoML
---

Created at : 2024-10-31 14:04  
Auther: Soo.Y  

----
### 📝메모 

# compare_models
## 실행
`compare_models`은 다양한 모델을 훈련한 후에 성능을 비교해서 best model를 선정해 줍니다.
```python
s.compare_models(
    include=None,
    exclude=None,
    fold=None,
    round=4,
    cross_validation=True,
    sort="Accuracy",
    n_select=1,
    budget_time=None,
    turbo=True,
    errors="ignore",
    fit_kwargs=None,
    groups=None,
    experiment_custom_tags=None,
    probability_threshold=None,
    engine=None,
    verbose=True,
    parallel=None,
)
```

## 파라미터
- include
	- defalut = None
	- list of str
	- 사용하고자 하는 모델을 입력
	- 모델 라이브러리 사용 가능
- exclude
	- defalut = None
	- list of str
	- 제외하고자 하는 모델을 입력
	- 모델 라이브러리 사용 가능
- fold
	- defalut = None
	- int or scikit-learn CV generator
	- cross-validation의 수를 입력
- round : 자릿수, 기본 4
- sort : 정렬, deault = "Accuracy"
- n_select
	- defalut = 1
	- top model의 수

# create_model

## 실행
```python
s.create_model(
    estimator,
    fold=None,
    round=4,
    cross_validation=True,
    fit_kwargs=None,
    groups=None,
    experiment_custom_tags=None,
    probability_threshold=None,
    engine=None,
    verbose=True,
    return_train_score=False,
    **kwargs,
)
```

## 파라미터
- estimator(str or scikit-learn compatible object)
	- lr : Logistic Regression
	- knn : K Neighbors Classifier
	- nb : Naive Bayes
	- dt : Decision Tree Classifier
	- svm : SVM - Linear Kernel
	- rbfsvm : SVM - Radial Kernel
	- gpc : Gaussian Process Classifier
	- mlp : MLP Classifier
	- ridge : Ridge Classifier
	- rf : Random Forest Classifier
	- qda : Quadratic Discriminant Analysis
	- ada : Ada Boost Classifier
	- gbc : Gradient Boosting Classifier
	- lda : Linear Discriminant Analysis
	- et : Extra Trees Classifier
	- xgboost : Extreme Gradient Boosting
	- lightgbm : Light Gradient Boosting Machine
	- catboost : CatBoost Classifier
- fold
	- 교차 검증 수

# tune_model
## 실행
```python
s.tune_model(
    estimator,
    fold=None,
    round=4,
    n_iter=10,
    custom_grid=None,
    optimize="Accuracy",
    custom_scorer=None,
    search_library="scikit-learn",
    search_algorithm=None,
    early_stopping=False,
    early_stopping_max_iters=10,
    choose_better=True,
    fit_kwargs=None,
    groups=None,
    return_tuner=False,
    verbose=True,
    tuner_verbose=True,
    return_train_score=False,
    **kwargs,
)
```

#### 파라미터
- estimaotr : 훈련된 모델 오브젝트
- fold : 교차 검증 수
- n_iter : grid search의 반복 횟수
- custom_grid : custom search space for hyperparameters
- optimize : "Accuracy"
- search_library
	- str, default = "scikit-learn"
	- 'scikit-learn' - default, requires no further installation
             https://github.com/scikit-learn/scikit-learn
           'scikit-optimize' - ``pip install scikit-optimize``
             https://scikit-optimize.github.io/stable/
           'tune-sklearn' - ``pip install tune-sklearn ray[tune]``
             https://github.com/ray-project/tune-sklearn
           'optuna' - ``pip install optuna``
             https://optuna.org/
- search_algorithm
	- str, defalut = None
	- 종류
		- scikit-learn : 'random', 'grid'
		- scikit-optimize : 'bayesian'
		- tune-sklearn : 'random', 'grid', 'bayesian', 'hyperopt', 'optuna', 'bohb'
		- optuna : 'random', 'tpe'
- early_stopping
	- defalut = False
	- (주의) serach_library에서 scikit-learn을 사용하면 early_stopping 사용 불가
	- 'asha' : Asnchronous Succesive Halving Algorithm
	- 'hyperband' : Hyperband
	- 'median' : Median Stopping Rule
- early_stopping_max_iters : int, defalut = 10

# ensemble_model
## 실행
```python
s.ensemble_model(
        estimator=, # Trained model object
        method="Bagging",
        fold=None,
        n_estimators=10,
        round=4,
        choose_better=False,
        optimize="Accuracy",
        fit_kwargs=None,
        groups=None,
        probability_threshold=None,
        verbose=True,
        return_train_score=False,
    )
```

## 파라미터
- estimator : scikit-learn or Trained model object
- method
	-  'Bagging' or "Boosting"
- fold : 교차 검증 수
- n_estimators
	- default = 10
	- ensemble의 기본 estimator의 수
- optimize : 'Accuracy'

# blend_models

## 실행
```python
s.blend_models(
        estimator_list, # list,
        fold=None,
        round=4,
        choose_better=False,
        optimize="Accuracy",
        method="auto",
        weights=None,
        fit_kwargs=None,
        groups=None,
        probability_threshold=None,
        verbose=True,
        return_train_score=False,
    )
```

## 파라미터
- estimator_list : List of trained model objects
- fold : 교차 검증 수
- optimize : 'Accuracy'

# stack_models
## 실행
```python
s.stack_models(
    estimator_list: list,
    meta_model=None,
    meta_model_fold=5,
    fold=None,
    round=4,
    method="auto",
    restack=False,
    choose_better=False,
    optimize="Accuracy",
    fit_kwargs=None,
    groups=None,
    probability_threshold=None,
    verbose=True,
    return_train_score=False,
)
```

## 파라미터
- estimaotr_list
- meta_model
- fold : 교차 검증 수
- optimize : 'Accuracy'

----
### 📜출처(참고 문헌)  


----
### 🔗연결 문서


