from flask import Blueprint, render_template, request, flash, redirect, url_for, jsonify
from sklearn.preprocessing import LabelEncoder
import pandas as pd
import pickle
import matplotlib.pyplot as plt
import numpy as np
import joblib
import json

analysis = Blueprint('analysis', __name__)

model = pickle.load(open('./asset/model.pkl', 'rb'))

encoder = LabelEncoder()
encoder = joblib.load('./asset/labelEncoder.joblib')

def readFile():
    data = pd.read_json('./asset/FinalData.json')
    return data


def mapping():
    data = pd.read_json('./asset/FinalData.json')
    product = data['Product Name'].unique().tolist()
    category = data['Category'].unique().tolist()
    region = data['Region'].unique().tolist()
    country = data['Shipping Country'].unique().tolist()
    data['Product Name'] = encoder.fit_transform(data['Product Name'])
    data['OEM'] = encoder.fit_transform(data['OEM'])
    data['Shipping Country'] = encoder.fit_transform(data['Shipping Country'])
    data['Region'] = encoder.fit_transform(data['Region'])
    data['Category'] = encoder.fit_transform(data['Category'])
    product2 = data['Product Name'].unique().tolist()
    category2 = data['Category'].unique().tolist()
    region2 = data['Region'].unique().tolist()
    country2 = data['Shipping Country'].unique().tolist()
    pro = dict(zip(product,product2))
    reg = dict(zip(region,region2))
    cat = dict(zip(category,category2))
    cont =dict(zip(country,country2))
    return {"Product Name":pro,"Region":reg,"Category":cat,"Country":cont}

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
    data['Ordered Qty'] = prd
    return data.to_dict()

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
    top_ten_prod = prod_sales[:]
    return top_ten_prod.to_dict()

def topTenAssetQunatity():
    data = Prediction()
    data = pd.DataFrame(data)
    prod_sales = pd.DataFrame(data.groupby('Product Name').sum()['Ordered Qty'])
    prod_sales.sort_values(by=['Ordered Qty'], inplace=True, ascending=False)
    top_ten_prod = prod_sales[:]
    return top_ten_prod.to_dict()

def RegionWiseSale():
    data = Prediction()


def assetQuantity21():
    data = Prediction()
    data = pd.DataFrame(data)
    asset = pd.DataFrame(data.groupby('Category').sum()['Ordered Qty'])
    # ab = data.groupby(data['Category'])['Ordered Qty'].sum()
    # asset.sort_values(by=['Ordered Qty'], inplace=True, ascending=False)
    # asset = asset[:10]

    return {"Asset Quantity": asset.to_dict()}

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



@analysis.route('/toptenprodQuan', methods=['GET', 'POST'])
def toptenproQuantity():
    if request.method == 'GET':
        data = topTenAssetQunatity()
        return jsonify({'data': data})

@analysis.route('/decodedata', methods=['GET', 'POST'])
def decodedData():
    if request.method == 'GET':
        data = mapping()
        return jsonify({'data': data})

@analysis.route('/assetQuantity', methods=['GET', 'POST'])
def assetQuantity1():
    if request.method == 'GET':
        data = assetQuantity21()    #Returns Date vs Sales
        return jsonify({'data': data})

