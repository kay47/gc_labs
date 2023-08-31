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


@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact')

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/news')
def news():
    return render_template('news.html')

 

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html')

if __name__ == '__main__':
    app.run(debug = True, host = '127.0.0.8')
    

