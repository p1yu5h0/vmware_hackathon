from flask import Blueprint, render_template, request, flash, redirect, url_for, jsonify
from sklearn.preprocessing import LabelEncoder
import pandas as pd
import pickle
import matplotlib.pyplot as plt
import numpy as np
import joblib

analysis = Blueprint('analysis', __name__)

model = pickle.load(open('./asset/model.pkl', 'rb'))

encoder = LabelEncoder()
encoder = joblib.load('./asset/labelEncoder.joblib')

def readFile():
    data = pd.read_json('./asset/FinalData.json')
    # data = pd.read_csv('blob:http://localhost:3000/a4497676-d729-43c4-8d23-4378bbeff1e4')
    # Encoding(data)
    return data


def Encoding():
    data = readFile()
    data['Product Name'] = encoder.fit_transform(data['Product Name'])
    data['OEM'] = encoder.fit_transform(data['OEM'])
    data['Shipping Country'] = encoder.fit_transform(data['Shipping Country'])
    data['Region'] = encoder.fit_transform(data['Region'])
    data['Category'] = encoder.fit_transform(data['Category'])
    return data


def Prediction():
    data=Encoding()
    X1 = data.drop(columns=['Ordered Qty', 'Purchase Date'], axis=1)
    prd = model.predict(X1).tolist()
    return {"Predicted Quantity": prd}

def datevSales():
    data = Encoding()
    df_temp = data.groupby('Purchase Date').sum()['Row Total'].reset_index()
    plt.figure(figsize=(45, 5))
    curve, = plt.plot(df_temp['Purchase Date'], df_temp['Row Total'], color='#b80045')
    plt.xticks(rotation='vertical', size=8)
    xdata = curve.get_xdata().tolist()
    ydata = curve.get_ydata().tolist()
    return {"Dates": xdata, "Sales": ydata}


def topTenAssetSales():
    data=readFile()
    prod_sales = pd.DataFrame(data.groupby('Product Name').sum()['Row Total'])
    prod_sales.sort_values(by=['Row Total'], inplace=True, ascending=False)
    top_ten_prod = prod_sales[:10]
    return top_ten_prod.to_dict()

def topTenAssetQunatity():

    prod_sales = pd.DataFrame(data.groupby('Product Name').sum()['Ordered Qty'])
    prod_sales.sort_values(by=['Ordered Qty'], inplace=True, ascending=False)
    top_ten_prod = prod_sales[:10]
    top_ten_prod

@analysis.route('/predictQuantity', methods=['GET', 'POST'])
def handler():
    if request.method == 'GET':
        prd = Prediction()
        return jsonify({'data': prd})


@analysis.route('/file', methods=['GET', 'POST'])
def json_example():
    try :
        d = json.loads(request.form['data'])
        # print(d[0])
        return 'Recieved'
    except :
        print('ERROR')
        return 'Error'

@analysis.route('/datevsale', methods=['GET', 'POST'])
def datevsale():
    if request.method == 'GET':
        data = datevSales()    #Returns Date vs Sales
        return jsonify({'data': data})


@analysis.route('/toptenprod', methods=['GET', 'POST'])
def toptenproSales():
    if request.method == 'GET':
        data = topTenAssetSales()    #Returns Date vs Sales
        return jsonify({'data': data})



# @analysis.route('/toptenprod', methods=['GET', 'POST'])
# def toptenproQuantity():
#     if request.method == 'GET':
#         data = topTenAssetQunatity()    #Returns Date vs Sales
#         return jsonify({'data': data})

