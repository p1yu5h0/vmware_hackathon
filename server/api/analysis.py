from flask import Blueprint, render_template, request, flash, redirect, url_for, jsonify,make_response
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
    new = data["OEM"].str.split("-", n=1, expand=True)
    data["OEM"] = new[0]
    data.dropna()
    return data


def mapping():
    data = readFile()
    product = data['Product Name'].unique().tolist()
    category = data['Category'].unique().tolist()
    region = data['Region'].unique().tolist()
    country = data['Shipping Country'].unique().tolist()
    om=data['OEM'].unique().tolist()
    data['Product Name'] = encoder.fit_transform(data['Product Name'])
    data['OEM'] = encoder.fit_transform(data['OEM'])
    data['Shipping Country'] = encoder.fit_transform(data['Shipping Country'])
    data['Region'] = encoder.fit_transform(data['Region'])
    data['Category'] = encoder.fit_transform(data['Category'])
    product2 = data['Product Name'].unique().tolist()
    category2 = data['Category'].unique().tolist()
    region2 = data['Region'].unique().tolist()
    country2 = data['Shipping Country'].unique().tolist()
    om2=data['OEM'].unique().tolist()
    pro = dict(zip(product, product2))
    reg = dict(zip(region, region2))
    cat = dict(zip(category, category2))
    cont = dict(zip(country, country2))
    oem = dict(zip(om, om2))
    return {"Product Name": pro, "Region": reg, "Category": cat, "Country": cont,"OEM":oem}


def Encoding():
    data = readFile()
    data['Product Name'] = encoder.fit_transform(data['Product Name'])
    data['OEM'] = encoder.fit_transform(data['OEM'])
    data['Shipping Country'] = encoder.fit_transform(data['Shipping Country'])
    data['Region'] = encoder.fit_transform(data['Region'])
    data['Category'] = encoder.fit_transform(data['Category'])
    return data


def Prediction():
    data = Encoding()
    x = data.drop(columns=['Ordered Qty', 'Purchase Date'], axis=1)
    prd = model.predict(x).tolist()
    data['Ordered Qty'] = prd
    data['Total Sales'] = data['Ordered Qty'] * data['Item Price USD']
    return data.to_dict()


def monthvsSales():
    data = Prediction()
    data = pd.DataFrame(data)
    data['Purchase Date'] = pd.to_datetime(data['Purchase Date'])
    month_sales = data.groupby(data['Purchase Date'].dt.strftime('%B'))['Total Sales'].sum().sort_values()
    msale = pd.DataFrame(month_sales)
    cats = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
            'November', 'December']
    msale.index = pd.CategoricalIndex(msale.index, categories=cats, ordered=True)
    msale = msale.sort_index()
    return msale.to_dict()


def topTenAssetSales():
    data = Prediction()
    data = pd.DataFrame(data)
    prod_sales = pd.DataFrame(data.groupby('Product Name').sum()['Total Sales'])
    prod_sales.sort_values(by=['Total Sales'], inplace=True, ascending=False)
    top_ten_prod = prod_sales[:]
    return top_ten_prod.to_dict()


def topTenAssetQunatity():
    data = Prediction()
    data = pd.DataFrame(data)
    prod_sales = pd.DataFrame(data.groupby('Product Name').sum()['Ordered Qty'])
    prod_sales.sort_values(by=['Ordered Qty'], inplace=True, ascending=False)
    top_ten_prod = prod_sales[:]
    return top_ten_prod.to_dict()


def RegionWiseQuantiy():
    data = Prediction()
    data = pd.DataFrame(data)
    asset = pd.DataFrame(data.groupby('Region').sum()['Ordered Qty'])
    return {"Region Asset Quantity": asset.to_dict()}


def assetQuantity21():
    data = Prediction()
    data = pd.DataFrame(data)
    asset = pd.DataFrame(data.groupby('Category').sum()['Ordered Qty'])
    # ab = data.groupby(data['Category'])['Ordered Qty'].sum()
    # asset.sort_values(by=['Ordered Qty'], inplace=True, ascending=False)
    # asset = asset[:10]
    return {"Asset Quantity": asset.to_dict()}


def countryWiseQuantity():
    data = Prediction()
    data = pd.DataFrame(data)
    asset = pd.DataFrame(data.groupby('Shipping Country').sum()['Ordered Qty'])
    return {"Country Asset Quantity": asset.to_dict()}


def assetWiseSale():
    data = Prediction()
    data = pd.DataFrame(data)
    asset = pd.DataFrame(data.groupby('Category').sum()['Total Sales'])
    return {"Asset Wise Sales": asset.to_dict()}


def regionWiseSale():
    data = Prediction()
    data = pd.DataFrame(data)
    asset = pd.DataFrame(data.groupby('Region').sum()['Total Sales'])
    return {"Region Wise Sales": asset.to_dict()}


def countryWiseSale():
    data = Prediction()
    data = pd.DataFrame(data)
    asset = pd.DataFrame(data.groupby('Shipping Country').sum()['Total Sales'])
    return {"Region Wise Sales": asset.to_dict()}


def OemWiseQuantity():
    data = Prediction()
    data = pd.DataFrame(data)
    asset = pd.DataFrame(data.groupby('OEM').sum()['Ordered Qty'])
    return {"OEM Wise Quantity": asset.to_dict()}

def OemWiseSale():
    data = Prediction()
    data = pd.DataFrame(data)
    asset = pd.DataFrame(data.groupby('OEM').sum()['Total Sales'])
    return {"OEM Wise Sale": asset.to_dict()}


@analysis.route('/file', methods=['GET', 'POST'])
def json_example():
    if request.method=='POST' :
        try:
            d = json.loads(request.form['data'])
            file_list.append(d)
            return 'Recieved'
        except:
            print('ERROR')
            return 'Error'


@analysis.route('/datevsale', methods=['GET', 'POST'])
def datevsale():
    if request.method == 'GET':
        data = monthvsSales()  # Returns Date vs Sales
        resp = make_response(jsonify({'data': data}))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


@analysis.route('/toptenprod', methods=['GET', 'POST'])
def toptenproSales():
    if request.method == 'GET':
        data = topTenAssetSales()  # Returns Date vs Sales
        resp = make_response(jsonify({'data': data}))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


@analysis.route('/toptenprodQuan', methods=['GET', 'POST'])
def toptenproQuantity():
    if request.method == 'GET':
        data = topTenAssetQunatity()
        resp = make_response(jsonify({'data': data}))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


@analysis.route('/decodedata', methods=['GET', 'POST'])
def decodedData():
    if request.method == 'GET':
        data = mapping()
        resp = make_response(jsonify({'data': data}))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


@analysis.route('/assetQuantity', methods=['GET', 'POST'])
def assetQuantity1():
    if request.method == 'GET':
        data = assetQuantity21()  # Returns Date vs Sales
        resp = make_response(jsonify({'data': data}))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


@analysis.route('/regionWiseAssetQuantity', methods=['GET', 'POST'])
def RegionassetQuantity():
    if request.method == 'GET':
        data = RegionWiseQuantiy()
        resp = make_response(jsonify({'data': data}))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


@analysis.route('/CountryWiseAssetQuantity', methods=['GET', 'POST'])
def CountryassetQuantity():
    if request.method == 'GET':
        data = countryWiseQuantity()
        resp = make_response(jsonify({'data': data}))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


@analysis.route('/assetWiseSales', methods=['GET', 'POST'])
def assetwiseSales():
    if request.method == 'GET':
        data = assetWiseSale()
        resp = make_response(jsonify({'data': data}))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


@analysis.route('/regionWiseSales', methods=['GET', 'POST'])
def regoionwiseSales():
    if request.method == 'GET':
        data = regionWiseSale()
        resp = make_response(jsonify({'data': data}))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


@analysis.route('/countryWiseSales', methods=['GET', 'POST'])
def countrywiseSales():
    if request.method == 'GET':
        data = countryWiseSale()
        resp = make_response(jsonify({'data': data}))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


@analysis.route('/oemWiseQuantity', methods=['GET', 'POST'])
def oemWiseQuantity():
    if request.method == 'GET':
        data = OemWiseQuantity()
        resp = make_response(jsonify({'data': data}))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


@analysis.route('/oemWiseSale', methods=['GET', 'POST'])
def oemWiseSale():
    if request.method == 'GET':
        data = OemWiseSale()
        resp = make_response(jsonify({'data': data}))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp

