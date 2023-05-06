from emmett import App, response

app = App(__name__)

@app.route("/")
async def index():
    response.meta.title = 'Home Page!'
    return {}
