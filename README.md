# Mannarit Lomake

Yhden sivun ilmoittautumislomake Kesän Mannarit -tapahtumaan. 
Käyttää Flask-kehystä ja SQLite-tietokantaa. Yhteensopiva ilman kikkailuja PythonAnywhere-palvelun kanssa.

## Paikallinen testaus

```bash
pip install -r requirements.txt
python3 app.py
```
Sivu aukeaa osoitteessa `http://localhost:8080/`. Admin-näkymä on osoitteessa `http://localhost:8080/view`.

## Käyttöönotto (PythonAnywhere)

1. Luo ilmainen tili PythonAnywhereen.
2. Avaa Bash-konsoli ja kloonaa repositorio:
   `git clone https://github.com/niljakebot/mannarit-lomake.git`
3. Luo Web-välilehdeltä uusi web app (valitse manuaalinen konfiguraatio ja Python 3.10+).
4. Asenna Flask konsolissa:
   `pip3 install --user Flask`
5. Muokkaa WSGI-konfiguraatiotiedostoa (Web-välilehdeltä):
   ```python
   import sys
   import os

   path = '/home/OMAKÄYTTÄJÄTUNNUS/mannarit-lomake'
   if path not in sys.path:
       sys.path.append(path)

   from app import app as application
   ```
6. Paina Reload-nappia ja sovellus on verkossa!
