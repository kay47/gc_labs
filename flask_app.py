from flask import Flask,render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/whereami')
def whereami():
    return "Cape Coast"

@app.route('/foo/<name>')
def foo(name):
    return render_template('foo.html', to = name)

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/tryout2')
def tryout2():
    return render_template('tryout2.html')


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html')

if __name__ == '__main__':
    app.run(debug = True, host = '127.0.0.8')
    

