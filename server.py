from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

FILE = "students.json"


def load_students():
    if not os.path.exists(FILE):
        return []
    with open(FILE, "r") as f:
        return json.load(f)


def save_students(students):
    with open(FILE, "w") as f:
        json.dump(students, f)


app = Flask(__name__)
CORS(app)

careers = [
    {"name": "Software Developer", "field": "technology", "about": "Builds websites, apps and software.", "skills": ["html", "css", "javascript", "react", "git"]},
    {"name": "Data Analyst", "field": "data", "about": "Studies data to find useful patterns.", "skills": ["excel", "sql", "python", "statistics", "power bi"]},
    {"name": "UI/UX Designer", "field": "design", "about": "Designs apps and websites that are easy to use.", "skills": ["figma", "creativity", "user research", "html", "css"]},
    {"name": "Digital Marketer", "field": "business", "about": "Promotes products and brands online.", "skills": ["seo", "content writing", "social media", "analytics", "communication"]},
    {"name": "Cybersecurity Analyst", "field": "technology", "about": "Protects systems and data from attacks.", "skills": ["networking", "linux", "python", "security", "problem solving"]},
    {"name": "Project Manager", "field": "business", "about": "Plans work and leads a team to finish it.", "skills": ["communication", "leadership", "planning", "excel", "teamwork"]},
    {"name": "Web Designer", "field": "design", "about": "Designs and builds good looking websites.", "skills": ["html", "css", "figma", "creativity", "javascript"]},
    {"name": "Machine Learning Engineer", "field": "data", "about": "Builds models that learn from data.", "skills": ["python", "statistics", "machine learning", "pandas", "sql"]},
    {"name": "Network Engineer", "field": "technology", "about": "Sets up and maintains computer networks.", "skills": ["networking", "linux", "security", "troubleshooting", "cisco"]},
    {"name": "Content Writer", "field": "business", "about": "Writes articles and content for brands.", "skills": ["content writing", "seo", "creativity", "communication", "research"]},
    {"name": "Database Administrator", "field": "data", "about": "Manages and protects databases.", "skills": ["sql", "mysql", "backup", "security", "problem solving"]},
]
users = [
    {"name": "Arpit Singh Rawat", "email": "admin@gmail.com", "password": "admin123", "education": "BCA"},
    {"name": "Ayush Badoni", "email": "ayush@gmail.com", "password": "ayush123", "education": "BCA"},
]


@app.route("/guidance", methods=["POST"])
def guidance():
    data = request.get_json()
    name = data.get("name", "")
    interest = data.get("interest", "").lower()
    level = data.get("level", "beginner").lower()
    raw_skills = data.get("skills", "").lower().split(",")

    user_skills = []
    for s in raw_skills:
        user_skills.append(s.strip())

    results = []
    for career in careers:
        matched = 0
        missing = []
        for skill in career["skills"]:
            if skill in user_skills:
                matched += 1
            else:
                missing.append(skill)

        score = round(matched / len(career["skills"]) * 100)
        if career["field"] == interest:
            score = min(score + 20, 100)

        results.append({
            "name": career["name"],
            "about": career["about"],
            "match": score,
            "missing": missing,
        })

    results.sort(key=lambda r: r["match"], reverse=True)
    top = results[:3]

    if level == "beginner":
        tip = "Start with one skill at a time and build small projects."
    elif level == "intermediate":
        tip = "Build a project that uses the missing skills and put it on GitHub."
    else:
        tip = "Apply for internships and contribute to real projects."

    message = "Hi " + name + ", your best match is " + top[0]["name"] + " (" + str(top[0]["match"]) + "%). " + tip

    students = load_students()
    students.append({
        "name": name,
        "interest": interest,
        "level": level,
        "top_career": top[0]["name"],
        "top_match": top[0]["match"],
    })
    save_students(students)

    return jsonify({"message": message, "results": top})


@app.route("/stats", methods=["GET"])
def stats():
    students = load_students()

    names = []
    career_count = {}
    levels = {"beginner": 0, "intermediate": 0, "advanced": 0}
    field_total = {"technology": 0, "data": 0, "design": 0, "business": 0}
    field_number = {"technology": 0, "data": 0, "design": 0, "business": 0}

    for s in students:
        if s["name"] not in names:
            names.append(s["name"])

        career = s["top_career"]
        if career in career_count:
            career_count[career] += 1
        else:
            career_count[career] = 1

        levels[s["level"]] += 1
        field_total[s["interest"]] += s["top_match"]
        field_number[s["interest"]] += 1

    readiness = []
    for field in field_total:
        if field_number[field] > 0:
            avg = round(field_total[field] / field_number[field])
        else:
            avg = 0
        readiness.append({"heading": field.capitalize(), "value": avg})

    top_careers = []
    for career_name in career_count:
        top_careers.append({"name": career_name, "count": career_count[career_name]})
    top_careers.sort(key=lambda c: c["count"], reverse=True)

    return jsonify({
        "total": len(students),
        "active": len(names),
        "levels": levels,
        "readiness": readiness,
        "careers": top_careers,
    })


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    for u in users:
        if u["email"] == data.get("email") and u["password"] == data.get("password"):
            return jsonify({"ok": True, "name": u["name"], "education": u["education"]})
    return jsonify({"ok": False}), 401

if __name__ == "__main__":
    app.run(port=5001, debug=True)