from fastapi import FastAPI, Request
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from imly_ai.db import get_img_url
from imly_ai.imagine import get_images


app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")


templates = Jinja2Templates(directory="templates")



@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse(
        "index.html", {"request": request}
    )


@app.post("/imagine")
async def generate_images(query: str):
    return {
        "images": get_images(query)
    }
    
    
@app.get("/images/{img_id}")
async def get_images(img_id: str):
    if img:=get_img_url(img_id):
        return {"url": FileResponse(img)}
    return {"url": None}

