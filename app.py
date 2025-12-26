from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)

@app.route('/')
def index():
    return redirect(url_for('user_dashboard'))

@app.route('/user')
def user_dashboard():
    return render_template('dashboard_user.html', page='user')

@app.route('/company')
def company_dashboard():
    return render_template('dashboard_company.html', page='company')

@app.route('/admin')
def admin_dashboard():
    return render_template('dashboard_admin.html', page='admin')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
