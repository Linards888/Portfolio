"""Makes the LV and EN resume .docx from the original Word file.

Only the text is changed; every paragraph keeps its original formatting.
Run:  python build_docx.py <original.docx>
Then export_pdf.ps1 turns the .docx files into PDF + PNG previews.
"""
import copy
import pathlib
import re
import sys
import zipfile

HERE = pathlib.Path(__file__).resolve().parent
NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
W = '{%s}' % NS

from xml.etree import ElementTree as ET  # noqa: E402

ET.register_namespace('w', NS)

# Paragraph numbers match the original document (1-based, document order).
# "all": replace the whole paragraph text (uniform formatting).
# "seg": replace individual formatting segments, given as {old: new}.
LV = {
    3: ('all', 'Inženierijas students — robotika, elektronika un mehānisko konstrukciju izstrāde. '
               'Būvēju projektus no pirmās skices līdz strādājošam produktam.'),
    7: ('seg', {'Siguldas Valsts Ģimnāzija': 'Siguldas Valsts ģimnāzija'}),
    8: ('seg', {'Vidējā atzīme: 7.5 / 10': 'Vidējā atzīme: 7,5 / 10'}),
    9: ('all', 'Spēcīgākie priekšmeti: fizika, ķīmija, matemātika  |  Dalība: JFS nodarbības, '
               'matemātikas, fizikas un ķīmijas olimpiādes'),
    13: ('all', 'Cīņas roboti 1 lb kategorijā — vairākas godalgotas vietas Latvijas čempionāta posmos.'),
    14: ('all', 'Folkrace autonomās sacīkstes — vairākas godalgotas vietas Latvijas čempionāta posmos. '
                'Robota izstrāde ar sensoriem un vadības loģiku.'),
    15: ('all', 'Top 16 Eiropā — RoboChallenge 2025 un 2026 starptautiskajās sacensībās.'),
    16: ('seg', {'PCB dizainēšana, modelēšana un lodēšana ': 'PCB DIZAINS, MODELĒŠANA UN LODĒŠANA ',
                 'Passion projects': 'Personīgie projekti', '2026 - tagat': '2026 – tagad'}),
    17: ('all', 'Izstrādāju lidojuma datoru paštaisītai raķetei ar E klases raķešu dzinēju.'),
    18: ('all', 'Izstrādāju kompaktu PCB cīņas robotiem ar integrētu uztvērēju, bezsuku motoru draiveri u.c.'),
    19: ('seg', {'Zinātniski Pētnieciskais darbs': 'Zinātniski pētnieciskais darbs', 'tagat': '2026 – tagad'}),
    20: ('all', 'Pētu attēlu translācijas metodes impulsu neironu tīkliem (SNN).'),
    22: ('all', 'Dalība starptautiskās cīņas robotu sacensībās — pieredze augsta līmeņa konkurencē pret '
                'pieredzējušām komandām.'),
    23: ('all', 'Pašrocīgi izstrādāts robots ar KiCad PCB, Fusion 360 korpusu un C++ vadības kodu.'),
    24: ('seg', {'DIY SIM RACING + FPV Folkrace robots': 'DIY SIM RACING + FPV FOLKRACE ROBOTS'}),
    25: ('all', 'Uzbūvēju sim racing vadības vietu ar DIY stūri un pedāļiem, savienotu ar FPV Folkrace '
                'robotu — attālināta vadība reāllaikā.'),
    26: ('all', 'Integrēju kameru un video raidītāju, optimizēju latenci reāllaika vadībai.'),
    27: ('seg', {'Dalībnieks': '3. vieta ideju ģeneratorā'}),
    28: ('all', 'Izstrādāju un publiski aizstāvēju ideju „Latvijas sabiedrības veselības uzlabošana”, '
                'izmantojot valsts atvērtos datus.'),
    29: ('seg', {'Linardsb.xyz': 'linardsb.xyz'}),
    30: ('all', 'Pats izstrādāju Next.js mājaslapu — dizains, izstrāde un publicēšana. '
                'Projektu portfolio un CV sadaļa.'),
    33: ('seg', {'Pieņemšana gāles namā': 'PREČU PIEŅEMŠANA',
                 '  |  Preču pieņemšana': '  |  Gāles nams, pieņemšanas nodaļa'}),
    34: ('all', 'Preču pieņemšana un pārbaude — precizitāte, atbildība un uzticamība ikdienas darbā.'),
    36: ('all', 'Saziņa ar klientiem stresa apstākļos, komandas darbs un problēmu risināšana — prasmes, '
                'kas noder arī inženierijas projektu vadībā.'),
    37: ('seg', {'Audzinātāja palīgs': 'Audzinātājas palīgs'}),
    38: ('all', 'Atbildība, pacietība un spēja vienkārši izskaidrot sarežģītas lietas — vērtīgas prasmes '
                'arī tehniskajos projektos.'),
    42: ('all', 'C++ · PlatformIO · Arduino · Python · Next.js / React · HTML · CSS · Git / GitHub'),
    44: ('all', 'Fusion 360 · Onshape · 3D printēšana · Antweight & Folkrace konstruktīvais dizains'),
    46: ('all', 'Lodēšana (SMD & through-hole) · PCB dizains (KiCad, Eagle) · Mikrokontrolieri (ESP32, AVR, '
                'ATmega, Teensy) · Sensoru integrācija · Robotu vadības sistēmas'),
    48: ('all', 'CNC frēzēšana uz 3 asu rūtera ar UGS (Universal G-code Sender) · G-code / CAM programmēšana · '
                'Virpošana · Alumīnija un plastmasas apstrāde'),
    50: ('all', 'Latviešu (dzimtā) · Angļu (B2) · Krievu (A1, ierobežota saziņa)'),
}

EN = {
    2: ('seg', {' Sigulda, Latvija |  ': ' Sigulda, Latvia |  '}),
    3: ('all', 'Engineering student — robotics, electronics and mechanical design. '
               'I build projects from the first sketch to a working product.'),
    5: ('all', 'Education'),
    7: ('seg', {'Siguldas Valsts Ģimnāzija': 'Sigulda State Gymnasium', '2022 – tagad': '2022 – present'}),
    8: ('seg', {'Vispārējā vidējā izglītība, inženierzinātņu virziens': 'General secondary education, engineering track',
                'Vidējā atzīme: 7.5 / 10': 'Average grade: 7.5 / 10'}),
    9: ('all', 'Strongest subjects: physics, chemistry, mathematics  |  Activities: Young Physicists’ School (JFS), '
               'mathematics, physics and chemistry olympiads'),
    10: ('all', 'Projects & Achievements'),
    12: ('seg', {'LATVIJAS ROBOTIKAS ČEMPIONĀTS': 'LATVIAN ROBOTICS CHAMPIONSHIP',
                 'Vairākas godalgotas vietas': 'Multiple podium finishes', '2022 – tagad': '2022 – present'}),
    13: ('all', 'Combat robots, 1 lb class — multiple podium finishes at Latvian championship stages.'),
    14: ('all', 'Folkrace autonomous racing — multiple podium finishes at Latvian championship stages. '
                'Built the robot with sensors and control logic.'),
    15: ('all', 'Top 16 in Europe — RoboChallenge 2025 and 2026 international competitions.'),
    16: ('seg', {'PCB dizainēšana, modelēšana un lodēšana ': 'PCB DESIGN, MODELLING AND SOLDERING ',
                 'Passion projects': 'Personal projects', '2026 - tagat': '2026 – present'}),
    17: ('all', 'Designing a flight computer for a self-built rocket with an E-class rocket motor.'),
    18: ('all', 'Designing a compact PCB for combat robots with an integrated receiver, brushless motor driver and more.'),
    19: ('seg', {'ZPD ': 'RESEARCH PROJECT (ZPD) ', 'Zinātniski Pētnieciskais darbs': 'Scientific research paper',
                 'tagat': '2026 – present'}),
    20: ('all', 'Researching image translation methods for spiking neural networks (SNNs).'),
    21: ('seg', {'VENTSPILS STARPTAUTISKAIS CĪŅAS ROBOTU HAKATONS': 'VENTSPILS INTERNATIONAL COMBAT ROBOT HACKATHON'}),
    22: ('all', 'Competed in an international combat robot competition against experienced teams.'),
    23: ('all', 'Built the robot myself: KiCad PCB, Fusion 360 chassis and C++ control code.'),
    24: ('seg', {'DIY SIM RACING + FPV Folkrace robots': 'DIY SIM RACING + FPV FOLKRACE ROBOT',
                 'Komandas projekts': 'Team project'}),
    25: ('all', 'Built a sim racing rig with a DIY steering wheel and pedals, linked to an FPV Folkrace robot '
                'for remote real-time driving.'),
    26: ('all', 'Integrated a camera and video transmitter and optimised latency for real-time control.'),
    27: ('seg', {'LATA ATVĒRTO DATU HAKATONS UN IDEJU ĢENERATORS': 'LATA OPEN DATA HACKATHON & IDEA GENERATOR',
                 'Dalībnieks': '3rd place, Idea Generator'}),
    28: ('all', 'Developed and publicly defended the idea “Improving public health in Latvia” using '
                'government open data.'),
    29: ('seg', {'PORTFOLIO MĀJASLAPA': 'PORTFOLIO WEBSITE', 'Izstrādātājs — ': 'Developer — ', 'Linardsb.xyz': 'linardsb.xyz',
                 '2024 – tagad': '2024 – present'}),
    30: ('all', 'Designed, built and deployed my own Next.js website with a project portfolio and resume section.'),
    31: ('all', 'Work Experience'),
    33: ('seg', {'Pieņemšana gāles namā': 'GOODS RECEIVING',
                 '  |  Preču pieņemšana': '  |  Gāles nams, receiving department'}),
    34: ('all', 'Receiving and checking deliveries — accuracy, responsibility and reliability in daily work.'),
    35: ('seg', {'VIESMĪLIS': 'WAITER', 'Apkalpojošais personāls': 'Hospitality staff'}),
    36: ('all', 'Communicating with customers under pressure, teamwork and problem-solving — skills that '
                'transfer to running engineering projects.'),
    37: ('seg', {'PALĪGS BĒRNUDĀRZĀ': 'KINDERGARTEN ASSISTANT', 'Audzinātāja palīgs': 'Teacher’s assistant'}),
    38: ('all', 'Responsibility, patience and the ability to explain complex things simply — valuable '
                'skills in technical projects too.'),
    39: ('all', 'Skills'),
    41: ('all', 'Programming'),
    42: LV[42],
    43: ('all', 'CAD & 3D'),
    44: ('all', 'Fusion 360 · Onshape · 3D printing · Antweight & Folkrace mechanical design'),
    45: ('all', 'Electronics'),
    46: ('all', 'Soldering (SMD & through-hole) · PCB design (KiCad, Eagle) · Microcontrollers (ESP32, AVR, '
                'ATmega, Teensy) · Sensor integration · Robot control systems'),
    47: ('all', 'Manufacturing'),
    48: ('all', 'CNC milling on a 3-axis router with UGS (Universal G-code Sender) · G-code / CAM programming · '
                'Lathe turning · Aluminium and plastic machining'),
    49: ('all', 'Languages'),
    50: ('all', 'Latvian (native) · English (B2) · Russian (A1, limited)'),
}
IGNORE = {'lang', 'noProof', 'rFonts', 'szCs', 'iCs', 'bCs'}


def fmt_key(run):
    rpr = run.find(W + 'rPr')
    if rpr is None:
        return ''
    return '|'.join(sorted(ET.tostring(c, encoding='unicode') for c in rpr
                           if c.tag.replace(W, '') not in IGNORE))


def text_runs(p):
    return [r for r in p.iter(W + 'r') if r.find(W + 't') is not None]


def set_all(p, text):
    runs = text_runs(p)
    first = runs[0].find(W + 't')
    first.text = text
    first.set('{http://www.w3.org/XML/1998/namespace}space', 'preserve')
    for r in runs[1:]:
        for t in r.findall(W + 't'):
            t.text = ''


def set_segs(p, mapping):
    # group consecutive text runs with the same formatting into segments
    groups, cur, key = [], [], None
    for r in text_runs(p):
        k = fmt_key(r)
        if cur and k != key:
            groups.append(cur)
            cur = []
        cur.append(r)
        key = k
    if cur:
        groups.append(cur)
    done = set()
    for g in groups:
        joined = ''.join(t.text or '' for r in g for t in r.findall(W + 't'))
        if joined in mapping and joined not in done:
            ts = [t for r in g for t in r.findall(W + 't')]
            ts[0].text = mapping[joined]
            ts[0].set('{http://www.w3.org/XML/1998/namespace}space', 'preserve')
            for t in ts[1:]:
                t.text = ''
            done.add(joined)
    missing = set(mapping) - done
    if missing:
        segs = [''.join(t.text or '' for r in g for t in r.findall(W + 't')) for g in groups]
        raise SystemExit(f'segment not found: {missing}\n  segments: {segs}')


def normalise(paras):
    """Small consistency fixes that keep the original look."""
    # bullets 17, 18, 20 have looser spacing than the other bullets
    for n in (17, 18, 20):
        p = paras[n - 1]
        p.remove(p.find(W + 'pPr'))
        p.insert(0, copy.deepcopy(paras[13 - 1].find(W + 'pPr')))
    # bullet 34 is indented differently from the other job bullets
    p34, p38 = paras[34 - 1], paras[38 - 1]
    p34.remove(p34.find(W + 'pPr'))
    p34.insert(0, copy.deepcopy(p38.find(W + 'pPr')))
    # the role in heading 33 is not italic like the other roles: split off "  |  " and italicise the rest
    plain, role = text_runs(paras[35 - 1])[1:3]
    p33 = paras[33 - 1]
    for r in text_runs(p33):
        t = r.find(W + 't')
        if (t.text or '').startswith('  |  '):
            sep = copy.deepcopy(plain)
            sep.find(W + 't').text = '  |  '
            p33.insert(list(p33).index(r), sep)
            r.remove(r.find(W + 'rPr'))
            r.insert(0, copy.deepcopy(role.find(W + 'rPr')))
            t.text = t.text[len('  |  '):]


def build(src, edits, dst):
    zin = zipfile.ZipFile(src)
    raw = zin.read('word/document.xml').decode('utf-8')
    for prefix, uri in re.findall(r'xmlns:(\w+)="([^"]+)"', raw):
        ET.register_namespace(prefix, uri)
    root = ET.fromstring(raw)
    paras = list(root.iter(W + 'p'))
    # drop the pin emoji run in the contact line (removing the run also drops its emoji font)
    p2 = paras[2 - 1]
    for r in text_runs(p2):
        if '\U0001F4CD' in (r.find(W + 't').text or ''):
            p2.remove(r)
    for n, (kind, val) in edits.items():
        (set_all if kind == 'all' else set_segs)(paras[n - 1], val)
    normalise(paras)
    # fit on one page: the original had a 2.5 cm bottom margin, use 1 cm like the top
    root.find(f'{W}body/{W}sectPr/{W}pgMar').set(W + 'bottom', '567')
    # skills table rows had fixed minimum heights that left gaps; let them fit their text
    for tr in root.iter(W + 'trPr'):
        for h in tr.findall(W + 'trHeight'):
            tr.remove(h)
    # the section rules sit in paragraphs as tall as an 11 pt line; shrink them to the rule itself
    for n in (6, 11, 32, 40):
        for sz in paras[n - 1].iter(W + 'sz'):
            sz.set(W + 'val', '2')
    for n in (6, 11, 32, 40):
        paras[n - 1].find(f'{W}pPr/{W}spacing').set(W + 'after', '120')
    # missing separator between e-mail and GitHub in the contact line
    for t in paras[2 - 1].iter(W + 't'):
        if t.text == 'Linardsbalodis2009@gmail.com':
            t.text = 'linardsbalodis2009@gmail.com  |  '
            t.set('{http://www.w3.org/XML/1998/namespace}space', 'preserve')
    xml = ET.tostring(root, encoding='unicode')
    # ElementTree drops namespace declarations only mc:Ignorable refers to; add the missing ones back
    head = re.match(r'<w:document[^>]*>', xml).group(0)
    have = set(re.findall(r'xmlns:(\w+)=', head))
    extra = ''.join(f' xmlns:{p}="{u}"' for p, u in re.findall(r'xmlns:(\w+)="([^"]+)"', raw) if p not in have)
    xml = head[:-1] + extra + '>' + xml[len(head):]
    xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' + xml
    with zipfile.ZipFile(dst, 'w', zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            data = xml.encode('utf-8') if item.filename == 'word/document.xml' else zin.read(item.filename)
            zout.writestr(item, data)
    print('wrote', dst.name)


if __name__ == '__main__':
    original = pathlib.Path(sys.argv[1])
    build(original, LV, HERE / 'Linards_Balodis_CV_LV.docx')
    build(original, EN, HERE / 'Linards_Balodis_CV_EN.docx')
