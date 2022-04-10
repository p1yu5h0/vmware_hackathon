from flask import Flask
from .analysis import analysis



def create_app():
    app = Flask(__name__)

    app.register_blueprint(analysis,url_prefix='/')

    #
    # from .views import views
    # from .auth import auth
    #
    # app.register_blueprint(views,url_prefix='/')
    # app.register_blueprint(auth,url_prefux='/')
    return app