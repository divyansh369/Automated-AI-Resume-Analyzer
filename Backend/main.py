import docx
import shutil
from fastapi import FastAPI, UploadFile, File, Form
from typing import Annotated
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2
from io import BytesIO

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/files/")
async def create_file(resume: Annotated[bytes, File()]):
    return {"file size": len(resume)}

@app.post("/api/analyze")
async def upload_file(resume:UploadFile=File(...),jobDescription: str = Form(...)):
    content = await resume.read()

    if resume.filename.endswith('.pdf'): 
        text = _extract_text_from_pdf(content)
    elif resume.filename.endswith('.docx'):
        text = _extract_text_from_docx(content)
    elif resume.filename.endswith('.txt'):
        text = content.decode("utf-8")
    else:
        text = "Unsupported file type"
    
    return {"filename": resume.filename, "content": text, "job_description": jobDescription}

def _extract_text_from_pdf(content):
    try:
        pdf_file = BytesIO(content)
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        return f"Error extracting PDF text: {str(e)}"

def _extract_text_from_docx(content):
    try:
        doc_file = BytesIO(content)
        doc = docx.Document(doc_file)
        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"
        return text
    except Exception as e:
        return f"Error extracting DOCX text: {str(e)}"