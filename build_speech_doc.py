#!/usr/bin/env python3
"""Video speech - natural spoken language for Team 14 recording."""

from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_LINE_SPACING

OUTPUT = "/Users/emran/Desktop/pptx/Horizon_2035_Video_Speech_Team14.docx"


def who(doc, name, when=""):
    p = doc.add_paragraph()
    r = p.add_run(f"{name}" + (f"  [{when}]" if when else ""))
    r.bold = True
    r.font.size = Pt(12)
    r.font.color.rgb = RGBColor(0x0A, 0x7C, 0x78)


def say(doc, text):
    p = doc.add_paragraph(text)
    p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.ONE_POINT_FIVE
    p.paragraph_format.space_after = Pt(10)
    for r in p.runs:
        r.font.size = Pt(11)


def slide(doc, text):
    p = doc.add_paragraph(text)
    for r in p.runs:
        r.italic = True
        r.font.size = Pt(10)
        r.font.color.rgb = RGBColor(0x77, 0x77, 0x77)
    p.paragraph_format.space_after = Pt(6)


def build():
    doc = Document()
    doc.styles["Normal"].font.name = "Calibri"
    doc.styles["Normal"].font.size = Pt(11)
    for s in doc.sections:
        s.top_margin = Inches(1)
        s.bottom_margin = Inches(1)
        s.left_margin = Inches(1.1)
        s.right_margin = Inches(1.1)

    h = doc.add_heading("Video Speech - Team 14", 0)
    h.alignment = 1
    say(doc, "Read this like you talk, not like an essay. Pause at the matrix. About 15 minutes total. All five of us speak.")
    doc.add_paragraph()

    say(doc, "Balanced speakers: 4 slides each (Arshi 3 + reflection line). Names show top-right on each slide. See SPEAKER_ASSIGNMENTS.md.")
    doc.add_paragraph()

    # SLIDE 1
    who(doc, "EMRAN", "0:00 - 0:45")
    slide(doc, "Slide 1 - Title. Everyone on camera.")
    say(doc, "Hey. We're Team 14. I'm Emran. With me are Arshi, Ashik, Ozlem, and Wasay.")
    say(doc, "Brief B: SEO in the Age of AI. Horizon 2035. We're not predicting one future — Chermack's method is build a few versions and ask what you'd do in each.")

    # SLIDE 2
    who(doc, "WASAY", "0:45 - 1:30")
    slide(doc, "Slide 2 - Hook")
    say(doc, "Wasay. Picture this: you Google something. The AI answer is already there. You never click. That's not twenty-thirty-five. That's now. Sixty percent of EU searches end with no click to any website.")
    say(doc, "Our question: what happens to organic discoverability when AI answers the query and the brand never gets the visit?")

    # SLIDE 3
    who(doc, "ARSHI", "1:30 - 2:15")
    slide(doc, "Slide 3 - Purpose")
    say(doc, "Arshi. Who cares? Brand teams. Agencies. Publishers. B2B marketers. Anyone defending a budget when half the room thinks SEO is dead and half thinks nothing changed.")
    say(doc, "By 2035 they need to decide: classic SEO? Citations inside ChatGPT? Metrics beyond clicks? That's Chermack phase one — preparation.")

    # SLIDE 4
    who(doc, "ASHIK", "2:15 - 3:00")
    slide(doc, "Slide 4 - Methodology")
    say(doc, "Ashik. Three phases. Prep: purpose and system. Explore: STEEP plus interviews, split Givens from Drivers. Build: two axes, four scenarios, early warnings.")

    # SLIDE 5
    who(doc, "WASAY", "3:00 - 3:45")
    slide(doc, "Slide 5 - System picture")
    say(doc, "Back to me for the system. Brands, agencies, publishers, platforms, users — AI sits in the middle of discovery. The core problem: getting found when something else answers first.")

    # SLIDE 6
    who(doc, "ARSHI", "3:45 - 5:00")
    slide(doc, "Slide 6 - STEEP")
    say(doc, "Arshi again. Ashik and I merged our STEEP scan. Social: zero-click is normal — SparkToro, fifty-nine point seven percent EU, three seventy-four per thousand reach the open web.")
    say(doc, "Tech: SISTRIX Germany, AI Overviews on roughly twenty percent of searches. Economics hits publishers hardest. Political: billions see Overviews, regulators watch. Environment: AI search uses more energy.")

    # SLIDE 7-8
    who(doc, "ASHIK", "5:00 - 6:30")
    slide(doc, "Slides 7-8 - Givens, Drivers, Data")
    say(doc, "Ashik. Givens = already true in every scenario. Zero-click. Overviews in Germany. Two billion AIO users. Drivers = could go different ways — Gartner minus twenty-five percent, CTR crash when Overview shows, publisher attrition.")
    say(doc, "If everything's a Given, no matrix. If everything's a Driver, it's noise. Sixty-four percent of question searches trigger Overviews in one study. Eleven percent of AI claims weren't fully supported — regulation may tighten.")

    # SLIDE 9-11
    who(doc, "OZLEM", "6:30 - 8:30")
    slide(doc, "Slides 9-11 - Funda, Lorena, section handoff")
    say(doc, "Ozlem. Two interviews, ten minutes each. Funda Aydin, B2B marketing GEA Digital: opens ChatGPT first, not Google. Visibility is being cited by AI, not ranking number one. Fears a few platforms as gatekeepers.")
    say(doc, "Lorena Contreras, community manager, SEO background: Google first for known intent, ChatGPT for writing. Your content can build the AI answer with no visit. SEO survives as credibility and expert content, not keyword blogs.")
    say(doc, "They're both right for different people. Next section: four scenarios from those tensions.")

    # SLIDE 12
    who(doc, "EMRAN", "8:30 - 9:30")
    slide(doc, "Slide 12 - 2x2 matrix. SLOW DOWN.")
    say(doc, "Emran. Two axes. Vertical: AI-first vs hybrid. Horizontal: website funnels vs zero-click influence. Four boxes. Funda pushed up-right. Lorena kept hybrid and website value. SparkToro and SISTRIX gave the scale.")

    # SCENARIOS
    who(doc, "ARSHI", "9:30 - 10:15")
    slide(doc, "Slide 13 - Citation Economy")
    say(doc, "Arshi. Top right. AI is the front door. Win by being the source AI quotes. B2B depth wins; thin blogs die. Early signs: GEO job posts, ChatGPT step one at work.")

    who(doc, "ASHIK", "10:15 - 11:00")
    slide(doc, "Slide 14 - Last-Click Web")
    say(doc, "Ashik. Bottom right. AI for overview, Google when buying. SEO becomes trust, structure, proof — Lorena's world. Annoying but workable.")

    who(doc, "OZLEM", "11:00 - 11:45")
    slide(doc, "Slide 15 - Gatekeeper Web")
    say(doc, "Ozlem. Top left. Most concerning. AI runs discovery but boards still want website KPIs. You rank invisibly. Funda's gatekeeper fear at scale.")

    who(doc, "WASAY", "11:45 - 12:30")
    slide(doc, "Slides 16-17 - Slow Adaptation + reflection section")
    say(doc, "Wasay. Bottom left. Most plausible boring future. Old playbook broken, no clean replacement. Zero-click creeps up. Funda and Lorena coexist in the same company. Now we reflect.")

    # REFLECTION
    who(doc, "EMRAN", "12:30 - 13:30")
    slide(doc, "Slide 18 - Reflection")
    say(doc, "Emran hosts. Most plausible: Slow Adaptation. Most worrying: Gatekeeper Web. What we'd do: discovery strategy, not SEO alone.")
    say(doc, "Quick round — one line each.")

    who(doc, "ARSHI", "13:30")
    say(doc, "Pick which box you're betting on before the traffic cliff.")

    who(doc, "ASHIK", "13:40")
    say(doc, "Cut generic content; invest in expert content and technical setup.")

    who(doc, "OZLEM", "13:50")
    say(doc, "Keep talking to practitioners every year.")

    who(doc, "WASAY", "14:00")
    say(doc, "Measure AI visibility, not only Search Console.")

    who(doc, "EMRAN", "14:10 - 15:00")
    slide(doc, "Slide 19 - Thank you")
    say(doc, "Thanks for watching. SparkToro, SISTRIX, Gartner, Chermack, our interviews. Questions welcome.")

    doc.add_paragraph()
    say(doc, "Recording tips: don't read word-for-word if it sounds stiff. Look at the camera on the matrix slide. All five faces visible at least once. Total time 14-16 minutes is fine.")

    doc.save(OUTPUT)
    print(OUTPUT)


if __name__ == "__main__":
    build()
