from flask import Flask, request, jsonify, render_template_string
import sqlite3
import os

app = Flask(__name__)
# Käytetään absoluuttista polkua tietokannalle, jotta se toimii varmasti PythonAnywheressä riippumatta työhakemistosta
DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'mannarit.db')

def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS registrations
                 (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, allergies TEXT)''')
    conn.commit()
    conn.close()

init_db()

HTML_PAGE = """
<!DOCTYPE html>
<html lang="fi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mannarit 2024 Ilmoittautuminen</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: #f0f2f5; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .container { background: #fff; padding: 30px 40px; border-radius: 12px; box-shadow: 0 8px 16px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
        h1 { color: #1a1a1a; font-size: 26px; text-align: center; margin-bottom: 20px; }
        label { display: block; margin-top: 15px; color: #444; font-weight: 500; font-size: 14px;}
        input[type="text"], input[type="email"], textarea { width: 100%; padding: 12px; margin-top: 8px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; font-family: inherit; }
        input:focus, textarea:focus { border-color: #0066cc; outline: none; }
        button { margin-top: 25px; width: 100%; padding: 14px; background: #0066cc; color: white; border: none; border-radius: 6px; font-size: 16px; font-weight: bold; cursor: pointer; transition: background 0.2s; }
        button:hover { background: #0052a3; }
        .success { display: none; color: #155724; background-color: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 6px; text-align: center; margin-top: 20px; font-weight: 500; }
    </style>
</head>
<body>
    <div class="container">
        <h1 id="title">Kesän Mannarit</h1>
        <form id="regForm">
            <label for="name">Nimi</label>
            <input type="text" id="name" name="name" required placeholder="Etunimi Sukunimi">

            <label for="email">Sähköposti</label>
            <input type="email" id="email" name="email" required placeholder="nimi@esimerkki.fi">

            <label for="allergies">Erityisruokavaliot / Allergiat</label>
            <textarea id="allergies" name="allergies" rows="3" placeholder="Ei allergioita..."></textarea>

            <button type="submit" id="submitBtn">Ilmoittaudu mukaan</button>
        </form>
        <div id="success-msg" class="success">Ilmoittautuminen tallennettu!<br>Nähdään mannareilla!</div>
    </div>

    <script>
        document.getElementById('regForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = document.getElementById('submitBtn');
            submitBtn.disabled = true;
            submitBtn.innerText = 'Tallennetaan...';

            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(response => response.json())
            .then(result => {
                if (result.status === 'ok') {
                    document.getElementById('title').style.display = 'none';
                    document.getElementById('regForm').style.display = 'none';
                    document.getElementById('success-msg').style.display = 'block';
                } else {
                    submitBtn.disabled = false;
                    submitBtn.innerText = 'Ilmoittaudu mukaan';
                    alert('Virhe tallennuksessa.');
                }
            }).catch(err => {
                submitBtn.disabled = false;
                submitBtn.innerText = 'Ilmoittaudu mukaan';
                alert('Yhteysvirhe.');
            });
        });
    </script>
</body>
</html>
"""

@app.route('/')
def index():
    return render_template_string(HTML_PAGE)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data:
        return jsonify({'status': 'error'}), 400

    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('INSERT INTO registrations (name, email, allergies) VALUES (?, ?, ?)',
              (data.get('name'), data.get('email'), data.get('allergies')))
    conn.commit()
    conn.close()

    return jsonify({'status': 'ok'})

@app.route('/view')
def view():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('SELECT * FROM registrations')
    rows = c.fetchall()
    conn.close()

    style = "body { font-family: sans-serif; padding: 20px; } table { border-collapse: collapse; width: 100%; max-width: 800px; } th, td { border: 1px solid #ddd; padding: 8px; text-align: left; } th { background-color: #f2f2f2; }"
    resp = f"<html><head><style>{style}</style></head><body>"
    resp += "<h2>Ilmoittautuneet (Admin-näkymä)</h2><table><tr><th>ID</th><th>Nimi</th><th>Sähköposti</th><th>Allergiat</th></tr>"
    for r in rows:
        resp += f"<tr><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td></tr>"
    resp += "</table></body></html>"

    return resp

if __name__ == '__main__':
    app.run(debug=True, port=8080)
