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


def readFile(file_link):
    data = pd.read_csv(file_link)
    new = data["OEM"].str.split("-", n=1, expand=True)
    data["OEM"] = new[0]
    data.dropna()
    return data


def mapping(file_link):
    data = readFile(file_link)
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


def Encoding(file_link):
    data = readFile(file_link)
    data['Product Name'] = encoder.fit_transform(data['Product Name'])
    data['OEM'] = encoder.fit_transform(data['OEM'])
    data['Shipping Country'] = encoder.fit_transform(data['Shipping Country'])
    data['Region'] = encoder.fit_transform(data['Region'])
    data['Category'] = encoder.fit_transform(data['Category'])
    return data


def Prediction(file_link):
    data = Encoding(file_link)
    x = data.drop(columns=['Ordered Qty', 'Purchase Date'], axis=1)
    prd = model.predict(x).tolist()
    data['Ordered Qty'] = prd
    data['Total Sales'] = data['Ordered Qty'] * data['Item Price USD']
    return data.to_dict()


def monthvsSales(file_link):
    data = Prediction(file_link)
    data = pd.DataFrame(data)
    data['Purchase Date'] = pd.to_datetime(data['Purchase Date'])
    month_sales = data.groupby(data['Purchase Date'].dt.strftime('%B'))['Total Sales'].sum().sort_values()
    minimum_sales = data.groupby(data['Purchase Date'].dt.strftime('%B'))['Total Sales'].sum().min()
    maximum_sales = data.groupby(data['Purchase Date'].dt.strftime('%B'))['Total Sales'].sum().max()
    mean_sales = data.groupby(data['Purchase Date'].dt.strftime('%B'))['Total Sales'].sum().max()
    msale = pd.DataFrame(month_sales)
    cats = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
            'November', 'December']
    msale.index = pd.CategoricalIndex(msale.index, categories=cats, ordered=True)
    msale = msale.sort_index()
    return {"data":msale.to_dict(),"min":minimum_sales,"max":maximum_sales,"mean":mean_sales}


def topTenAssetSales(file_link):
    data = Prediction(file_link)
    data = pd.DataFrame(data)
    prod_sales = pd.DataFrame(data.groupby('Product Name').sum()['Total Sales'])
    # minimum_sales = data.groupby(data['Purchase Date'].dt.strftime('%B'))['Total Sales'].sum().min()
    # maximum_sales = data.groupby(data['Purchase Date'].dt.strftime('%B'))['Total Sales'].sum().max()
    # mean_sales = data.groupby(data['Purchase Date'].dt.strftime('%B'))['Total Sales'].sum().max()
    prod_sales.sort_values(by=['Total Sales'], inplace=True, ascending=False)
    top_ten_prod = prod_sales[:]
    return {"Asset Sales":top_ten_prod.to_dict()}


def topTenAssetQunatity(file_link):
    data = Prediction(file_link)
    data = pd.DataFrame(data)
    prod_sales = pd.DataFrame(data.groupby('Product Name').sum()['Ordered Qty'])
    max_asset = pd.DataFrame(data.groupby('Category').sum()['Ordered Qty']).max()
    min_asset = pd.DataFrame(data.groupby('Category').sum()['Ordered Qty']).min()
    mean_asset = pd.DataFrame(data.groupby('Category').sum()['Ordered Qty']).mean()
    prod_sales.sort_values(by=['Ordered Qty'], inplace=True, ascending=False)
    top_ten_prod = prod_sales[:]
    return {"Asset Quantity":top_ten_prod.to_dict(),"Max":max_asset.to_dict(),"Min":min_asset.to_dict(),"Mean":mean_asset.to_dict()}


def RegionWiseQuantiy(file_link):
    data = Prediction(file_link)
    data = pd.DataFrame(data)
    asset = pd.DataFrame(data.groupby('Region').sum()['Ordered Qty'])
    max_asset = pd.DataFrame(data.groupby('Category').sum()['Ordered Qty']).max()
    min_asset = pd.DataFrame(data.groupby('Category').sum()['Ordered Qty']).min()
    mean_asset = pd.DataFrame(data.groupby('Category').sum()['Ordered Qty']).mean()
    return {"Region Asset Quantity": asset.to_dict(),"Max":max_asset.to_dict(),"Min":min_asset.to_dict(),"Mean":mean_asset.to_dict()}


def assetQuantity21(file_link):
    data = Prediction(file_link)
    data = pd.DataFrame(data)
    asset = pd.DataFrame(data.groupby('Category').sum()['Ordered Qty'])
    max_asset = pd.DataFrame(data.groupby('Category').sum()['Ordered Qty']).max()
    min_asset = pd.DataFrame(data.groupby('Category').sum()['Ordered Qty']).min()
    mean_asset = pd.DataFrame(data.groupby('Category').sum()['Ordered Qty']).mean()
    # ab = data.groupby(data['Category'])['Ordered Qty'].sum()
    # asset.sort_values(by=['Ordered Qty'], inplace=True, ascending=False)
    # asset = asset[:10]
    return {"Asset Quantity": asset.to_dict(),"Max":max_asset.to_dict(),"Min":min_asset.to_dict(),"Mean":mean_asset.to_dict()}


def countryWiseQuantity(file_link):
    data = Prediction(file_link)
    data = pd.DataFrame(data)
    asset = pd.DataFrame(data.groupby('Shipping Country').sum()['Ordered Qty'])
    asset_max = pd.DataFrame(data.groupby('Shipping Country').sum()['Ordered Qty']).max()
    asset_min = pd.DataFrame(data.groupby('Shipping Country').sum()['Ordered Qty']).min()
    asset_mean = pd.DataFrame(data.groupby('Shipping Country').sum()['Ordered Qty']).mean()
    return {"Country Asset Quantity": asset.to_dict(),"Max":asset_max.to_dict(),"Min":asset_min.to_dict(),"Mean":asset_mean.to_dict()}


def assetWiseSale(file_link):
    data = Prediction(file_link)
    data = pd.DataFrame(data)
    asset = pd.DataFrame(data.groupby('Category').sum()['Total Sales'])
    asset_max = pd.DataFrame(data.groupby('Category').sum()['Total Sales']).max()
    asset_min = pd.DataFrame(data.groupby('Category').sum()['Total Sales']).min()
    asset_mean = pd.DataFrame(data.groupby('Category').sum()['Total Sales']).mean()

    return {"Asset Wise Sales": asset.to_dict(),"Max":asset_max.to_dict(),"Min":asset_min.to_dict(),"Mean":asset_mean.to_dict()}


def regionWiseSale(file_link):
    data = Prediction(file_link)
    data = pd.DataFrame(data)
    asset = pd.DataFrame(data.groupby('Region').sum()['Total Sales'])
    asset_max = pd.DataFrame(data.groupby('Region').sum()['Total Sales']).max()
    asset_min = pd.DataFrame(data.groupby('Region').sum()['Total Sales']).min()
    asset_mean = pd.DataFrame(data.groupby('Region').sum()['Total Sales']).mean()

    return {"Region Wise Sales": asset.to_dict(),"Max":asset_max.to_dict(),"Min":asset_min.to_dict(),"Mean":asset_mean.to_dict()}


def countryWiseSale(file_link):
    data = Prediction(file_link)
    data = pd.DataFrame(data)
    asset = pd.DataFrame(data.groupby('Shipping Country').sum()['Total Sales'])
    asset_max = pd.DataFrame(data.groupby('Region').sum()['Total Sales']).max()
    asset_min = pd.DataFrame(data.groupby('Region').sum()['Total Sales']).min()
    asset_mean = pd.DataFrame(data.groupby('Region').sum()['Total Sales']).mean()
    return {"Region Wise Sales": asset.to_dict(),"Max":asset_max.to_dict(),"Min":asset_min.to_dict(),"Mean":asset_mean.to_dict()}


def OemWiseQuantity(file_link):
    data = Prediction(file_link)
    data = pd.DataFrame(data)
    asset = pd.DataFrame(data.groupby('OEM').sum()['Ordered Qty'])
    asset_max = pd.DataFrame(data.groupby('OEM').sum()['Ordered Qty']).max()
    asset_min = pd.DataFrame(data.groupby('OEM').sum()['Ordered Qty']).min()
    asset_mean = pd.DataFrame(data.groupby('OEM').sum()['Ordered Qty']).mean()
    return {"OEM Wise Quantity": asset.to_dict(),"Max":asset_max.to_dict(),"Min":asset_min.to_dict(),"Mean":asset_mean.to_dict()}

def OemWiseSale(file_link):
    data = Prediction(file_link)
    data = pd.DataFrame(data)
    asset = pd.DataFrame(data.groupby('OEM').sum()['Total Sales'])
    asset_max = pd.DataFrame(data.groupby('OEM').sum()['Total Sales']).max()
    asset_min = pd.DataFrame(data.groupby('OEM').sum()['Total Sales']).min()
    asset_mean = pd.DataFrame(data.groupby('OEM').sum()['Total Sales']).mean()

    return {"OEM Wise Sale": asset.to_dict(),"Max":asset_max.to_dict(),"Min":asset_min.to_dict(),"Mean":asset_mean.to_dict()}


@analysis.route('/file', methods=['GET', 'POST'])
def json_example():
    if request.method=='POST':
        try:
            data = (request.form['link'])
            # file_list.append(d)
            rf= readFile(data)
            return 'Recieved'
        except:
            print('ERROR')
            return 'Error'


@analysis.route('/datevsale', methods=['GET', 'POST'])
def datevsale():
    if request.method == 'POST':
        link_file = (request.form['link'])
        data = monthvsSales(link_file)  # Returns Date vs Sales
        resp = make_response(jsonify(data))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


@analysis.route('/toptenprod', methods=['GET', 'POST'])
def toptenproSales():
    if request.method == 'POST':
        link_file = (request.form['link'])
        data = topTenAssetSales(link_file)  # Returns Date vs Sales
        resp = make_response(jsonify({'data': data}))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


@analysis.route('/toptenprodQuan', methods=['GET', 'POST'])
def toptenproQuantity():
    if request.method == 'POST':
        link_file = (request.form['link'])
        data = topTenAssetQunatity(link_file)
        resp = make_response(jsonify({'data': data}))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


@analysis.route('/decodedata', methods=['GET', 'POST'])
def decodedData():
    if request.method == 'POST':
        link_file = (request.form['link'])
        data = mapping(link_file)
        resp = make_response(jsonify({'data': data}))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


@analysis.route('/assetQuantity', methods=['GET', 'POST'])
def assetQuantity1():
    if request.method == 'POST':
        link_file = (request.form['link'])
        data = assetQuantity21(link_file)  # Returns Date vs Sales
        resp = make_response(jsonify({'data': data}))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


@analysis.route('/regionWiseAssetQuantity', methods=['GET', 'POST'])
def RegionassetQuantity():
    if request.method == 'POST':
        link_file = (request.form['link'])
        data = RegionWiseQuantiy(link_file)
        resp = make_response(jsonify({'data': data}))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


@analysis.route('/CountryWiseAssetQuantity', methods=['GET', 'POST'])
def CountryassetQuantity():
    if request.method == 'POST':
        link_file = (request.form['link'])
        data = countryWiseQuantity(link_file)
        resp = make_response(jsonify({'data': data}))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


@analysis.route('/assetWiseSales', methods=['GET', 'POST'])
def assetwiseSales():
    if request.method == 'POST':
        link_file = (request.form['link'])
        data = assetWiseSale(link_file)
        resp = make_response(jsonify({'data': data}))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


@analysis.route('/regionWiseSales', methods=['GET', 'POST'])
def regoionwiseSales():
    if request.method == 'POST':
        link_file = (request.form['link'])
        data = regionWiseSale(link_file)
        resp = make_response(jsonify({'data': data}))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


@analysis.route('/countryWiseSales', methods=['GET', 'POST'])
def countrywiseSales():
    if request.method == 'POST':
        link_file = (request.form['link'])
        data = countryWiseSale(link_file)
        resp = make_response(jsonify({'data': data}))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


@analysis.route('/oemWiseQuantity', methods=['GET', 'POST'])
def oemWiseQuantity():
    if request.method == 'POST':
        link_file = (request.form['link'])
        data = OemWiseQuantity(link_file)
        resp = make_response(jsonify({'data': data}))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


@analysis.route('/oemWiseSale', methods=['GET', 'POST'])
def oemWiseSale():
    if request.method == 'POST':
        link_file = (request.form['link'])
        data = OemWiseSale(link_file)
        resp = make_response(jsonify({'data': data}))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
