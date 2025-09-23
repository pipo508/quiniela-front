# run.py
# Punto de entrada para ejecutar la aplicación.

from quiniela_app import create_app, db
from quiniela_app.models import Quiniela, Solicitud

app = create_app()

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'Quiniela': Quiniela, 'Solicitud': Solicitud}

if __name__ == '__main__':
    app.run(debug=True)
