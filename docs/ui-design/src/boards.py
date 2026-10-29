from PIL import Image,ImageDraw,ImageFont
import glob,os
R='/workspace/sn-stitches-spec/ui-design/'
FS='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
def font(s):
    for f in glob.glob('/home/box/.cache/**/Jost*.ttf',recursive=True)+[FS]:
        try:return ImageFont.truetype(f,s)
        except:pass
    return ImageFont.load_default()
CREAM=(251,246,238);MAG=(176,24,94);INK=(20,20,20);GOLD=(184,137,31)
logo=Image.open(R+'img/logo.webp').convert('RGBA')
def label(k): return k.split('-',1)[1].replace('-',' ').title().replace('Faq','FAQ').replace('404','404').replace('Admin ','')
def board(files,cols,tw,crop_h,title,out,width=2400):
    pad=40;gap=30;cw=(width-2*pad-(cols-1)*gap)//cols
    tiles=[]
    for f in files:
        im=Image.open(f).convert('RGB');sc=cw/im.width;im=im.resize((cw,int(im.height*sc)))
        im=im.crop((0,0,cw,min(im.height,int(crop_h*cw))));tiles.append((im,os.path.basename(f)))
    rows=(len(tiles)+cols-1)//cols;rh=[max(t[0].height for t in tiles[r*cols:(r+1)*cols]) for r in range(rows)]
    H=200+sum(rh)+rows*(gap+50)+pad
    B=Image.new('RGB',(width,H),CREAM);d=ImageDraw.Draw(B)
    d.rectangle((0,0,width,10),fill=GOLD);
    for x in range(0,width,48):d.rectangle((x+18,0,x+30,10),fill=MAG)
    l=logo.copy();l.thumbnail((140,140));B.paste(l,(pad,40),l)
    d.text((pad+170,60),title,font=font(56),fill=INK);d.text((pad+172,135),"SN Stitches · UI design v1 · Fashion • Design • Stitch",font=font(26),fill=GOLD)
    y=200
    for r in range(rows):
        for c,(im,n) in enumerate(tiles[r*cols:(r+1)*cols]):
            x=pad+c*(cw+gap);d.text((x,y),n.rsplit('-',1)[0].replace('-',' ',1).upper(),font=font(22),fill=MAG)
            B.paste(im,(x,y+40));d.rectangle((x-1,y+39,x+cw,y+40+im.height),outline=(230,220,203))
        y+=rh[r]+50+gap
    B.save(R+'boards/'+out,optimize=True);print(out,B.size)
D=sorted(glob.glob(R+'screens/desktop/*.png'));M=sorted(glob.glob(R+'screens/mobile/*.png'))
sd=[f for f in D if os.path.basename(f)[:2] in [f'{i:02d}' for i in range(1,13)]]
sm=[f for f in M if os.path.basename(f)[:2] in [f'{i:02d}' for i in range(1,13)]]
ad=[f for f in D if os.path.basename(f).startswith('2')];am=[f for f in M if os.path.basename(f).startswith('2')]
board(sd,4,0,1.15,'Storefront — desktop (1440)','01-storefront-desktop.png')
board(sm,6,0,2.6,'Storefront — mobile (390)','02-storefront-mobile.png')
board(ad,3,0,0.85,'Atelier admin — desktop & mobile','_a1.png')
board(am,8,0,2.6,'Atelier admin — mobile','_a2.png')
a=Image.open(R+'boards/_a1.png');b=Image.open(R+'boards/_a2.png').crop((0,180,2400,Image.open(R+'boards/_a2.png').height))
c=Image.new('RGB',(2400,a.height+b.height),CREAM);c.paste(a,(0,0));c.paste(b,(0,a.height));c.save(R+'boards/03-admin.png',optimize=True)
os.remove(R+'boards/_a1.png');os.remove(R+'boards/_a2.png')
board([D[0],M[0]],2,0,2.3,'Design system — “Atelier”','04-design-system.png')
