from api import create_app

app = create_app()

UPLOAD_FOLDER = 'static/files'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if __name__=='__main__':
    app.run(debug=True)