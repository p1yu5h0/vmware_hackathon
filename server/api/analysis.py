from flask import Blueprint, render_template, request, flash, redirect, url_for

analysis =Blueprint('analysis', __name__)


@analysis.route('/', methods=['GET', 'POST'])
def handler():
    return 'HELLO WORLD!'