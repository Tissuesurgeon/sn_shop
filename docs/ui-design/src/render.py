import sys,os,importlib
sys.path.insert(0,os.path.dirname(__file__))
from playwright.sync_api import sync_playwright
R='/workspace/sn-stitches-spec/ui-design/'
mods=sys.argv[1].split(',') ; only=sys.argv[2].split(',') if len(sys.argv)>2 else None
S={}
for m in mods: S.update(importlib.import_module(m).S)
os.makedirs(R+'html',exist_ok=True)
for k,v in S.items(): open(R+f'html/{k}.html','w').write(v)
with sync_playwright() as p:
  b=p.chromium.launch()
  for k in S:
    if only and k not in only: continue
    for name,w in [('desktop',1440),('mobile',390)]:
      pg=b.new_page(viewport={'width':w,'height':900 if w>400 else 844},device_scale_factor=1 if w>400 else 2)
      pg.goto('file://'+R+f'html/{k}.html',wait_until='networkidle'); pg.wait_for_timeout(250)
      pg.screenshot(path=R+f'screens/{name}/{k}-{name}.png',full_page=True); pg.close()
    print('ok',k)
  b.close()
