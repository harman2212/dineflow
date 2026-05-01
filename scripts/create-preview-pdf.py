import os
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.units import inch, mm
from reportlab.lib.colors import HexColor
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Image, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas
from PIL import Image as PILImage

PREVIEW_DIR = '/home/z/my-project/download/preview'
OUTPUT = '/home/z/my-project/download/DineFlow-Website-Preview.pdf'

ORANGE = HexColor('#FF6B00')
ORANGE_LIGHT = HexColor('#FF8A3D')
DARK_BG = HexColor('#0F0F0F')
DARK_CARD = HexColor('#1A1A1A')
WHITE = colors.white
GRAY = HexColor('#7A7A7A')
LIGHT_GRAY = HexColor('#B3B3B3')

W, H = landscape(A4)  # 842 x 595

class PreviewPDF:
    def __init__(self):
        self.c = canvas.Canvas(OUTPUT, pagesize=landscape(A4))
        self.page_num = 0

    def draw_bg(self):
        self.c.setFillColor(DARK_BG)
        self.c.rect(0, 0, W, H, fill=1, stroke=0)
        # Top accent line
        self.c.setFillColor(ORANGE)
        self.c.rect(0, H - 4, W, 4, fill=1, stroke=0)

    def draw_footer(self, section_label):
        self.c.setFillColor(GRAY)
        self.c.setFont('Helvetica', 8)
        self.c.drawString(30, 15, 'DineFlow - Website Preview')
        self.c.drawRightString(W - 30, 15, section_label)
        # Bottom accent line
        self.c.setFillColor(ORANGE)
        self.c.rect(0, 0, W, 2, fill=1, stroke=0)

    def add_cover(self):
        self.page_num += 1
        self.draw_bg()
        # Orange gradient circle (simulated)
        self.c.setFillColor(HexColor('#FF6B00'))
        self.c.setFillAlpha(0.08)
        self.c.circle(W * 0.7, H * 0.4, 200, fill=1, stroke=0)
        self.c.setFillAlpha(0.05)
        self.c.circle(W * 0.3, H * 0.6, 150, fill=1, stroke=0)
        self.c.setFillAlpha(1.0)

        # Title
        self.c.setFillColor(WHITE)
        self.c.setFont('Helvetica-Bold', 42)
        self.c.drawString(60, H - 120, 'DineFlow')

        self.c.setFillColor(ORANGE)
        self.c.setFont('Helvetica-Bold', 42)
        self.c.drawString(60 + self.c.stringWidth('DineFlow', 'Helvetica-Bold', 42) + 8, H - 120, 'Preview')

        # Subtitle
        self.c.setFillColor(LIGHT_GRAY)
        self.c.setFont('Helvetica', 16)
        self.c.drawString(60, H - 160, 'Smart Restaurant Web App with AI Touch')

        # Description
        self.c.setFillColor(GRAY)
        self.c.setFont('Helvetica', 11)
        self.c.drawString(60, H - 195, 'A modern restaurant web application featuring AI-powered menu descriptions,')
        self.c.drawString(60, H - 212, 'seamless ordering, table reservations, and a luxury dark theme.')

        # Preview images grid
        screenshots = [
            ('01-hero-desktop.png', 'Hero Section'),
            ('02-menu-desktop.png', 'Menu Section'),
            ('03-about-desktop.png', 'About Section'),
            ('07-admin-desktop.png', 'Admin Dashboard'),
        ]
        thumb_w = 170
        thumb_h = 105
        start_x = 60
        start_y = H - 420
        gap = 20

        for i, (filename, label) in enumerate(screenshots):
            col = i % 2
            row = i // 2
            x = start_x + col * (thumb_w + gap + 100)
            y = start_y - row * (thumb_h + gap + 30)

            fpath = os.path.join(PREVIEW_DIR, filename)
            if os.path.exists(fpath):
                # Card background
                self.c.setFillColor(DARK_CARD)
                self.c.roundRect(x, y - 20, thumb_w + 100, thumb_h + 30, 6, fill=1, stroke=0)

                # Image
                self.c.drawImage(fpath, x + 5, y, width=thumb_w + 90, height=thumb_h, preserveAspectRatio=True, mask='auto')

                # Label
                self.c.setFillColor(ORANGE)
                self.c.setFont('Helvetica-Bold', 9)
                self.c.drawString(x + 8, y - 14, label)

        # Tech stack info
        info_y = 60
        self.c.setFillColor(DARK_CARD)
        self.c.roundRect(60, info_y - 10, W - 120, 50, 6, fill=1, stroke=0)

        techs = ['Next.js 16', 'TypeScript', 'Tailwind CSS 4', 'Prisma', 'SQLite', 'Zustand', 'Framer Motion', 'shadcn/ui']
        self.c.setFillColor(LIGHT_GRAY)
        self.c.setFont('Helvetica', 9)
        x = 80
        for tech in techs:
            self.c.setFillColor(ORANGE)
            self.c.drawString(x, info_y + 18, tech)
            x += self.c.stringWidth(tech, 'Helvetica', 9) + 20

        self.c.setFillColor(GRAY)
        self.c.setFont('Helvetica', 8)
        self.c.drawString(80, info_y, 'Dark luxury theme | Orange gradient accents | Glassmorphism panels | Responsive design | AI-powered descriptions')

        self.draw_footer('Cover')
        self.c.showPage()

    def add_screenshot_page(self, filename, title, description):
        self.page_num += 1
        self.draw_bg()

        fpath = os.path.join(PREVIEW_DIR, filename)
        if not os.path.exists(fpath):
            return

        # Section title
        self.c.setFillColor(ORANGE)
        self.c.setFont('Helvetica-Bold', 10)
        self.c.drawString(40, H - 30, title.upper())

        self.c.setFillColor(LIGHT_GRAY)
        self.c.setFont('Helvetica', 9)
        self.c.drawString(40 + self.c.stringWidth(title.upper(), 'Helvetica-Bold', 10) + 15, H - 30, description)

        # Load image to get aspect ratio
        try:
            pil_img = PILImage.open(fpath)
            img_w, img_h = pil_img.size
            aspect = img_w / img_h
        except:
            aspect = 16/9

        # Draw image - fill available width
        max_w = W - 80
        max_h = H - 80
        display_w = max_w
        display_h = display_w / aspect

        if display_h > max_h:
            display_h = max_h
            display_w = display_h * aspect

        img_x = (W - display_w) / 2
        img_y = (H - display_h) / 2 - 10

        # Card background behind image
        self.c.setFillColor(DARK_CARD)
        pad = 4
        self.c.roundRect(img_x - pad, img_y - pad, display_w + pad * 2, display_h + pad * 2, 8, fill=1, stroke=0)

        # Orange border accent
        self.c.setStrokeColor(HexColor('#FF6B00'))
        self.c.setFillAlpha(0.3)
        self.c.roundRect(img_x - pad, img_y - pad, display_w + pad * 2, display_h + pad * 2, 8, fill=1, stroke=0)
        self.c.setFillAlpha(1.0)

        # Image
        self.c.drawImage(fpath, img_x, img_y, width=display_w, height=display_h, preserveAspectRatio=True)

        self.draw_footer(title)
        self.c.showPage()

    def save(self):
        self.c.save()
        size_kb = os.path.getsize(OUTPUT) / 1024
        print(f"PDF saved: {OUTPUT} ({size_kb:.0f} KB, {self.page_num} pages)")

pdf = PreviewPDF()
pdf.add_cover()

pages = [
    ('01-hero-desktop.png', 'Hero Section', 'Full-screen hero with dark overlay, animated badge, gradient CTA buttons, and delivery stats'),
    ('02-menu-desktop.png', 'Menu Section', 'Category filters, popular dishes carousel, search bar, food card grid with hover effects'),
    ('03-about-desktop.png', 'About Section', 'Feature cards with glassmorphism, brand values, and animated statistics bar'),
    ('04-contact-desktop.png', 'Contact Section', 'Contact info cards, message form, and reserve table CTA button'),
    ('05-footer-desktop.png', 'Footer', 'Brand info, quick links, contact details, hours, and social links'),
    ('07-admin-desktop.png', 'Admin Dashboard', 'Menu item management table with CRUD operations, availability toggles, and analytics'),
    ('08-mobile-hero.png', 'Mobile - Hero', 'Responsive hero section optimized for mobile devices (390px width)'),
    ('09-mobile-menu.png', 'Mobile - Menu', 'Mobile menu with touch-friendly cards and horizontal scrolling categories'),
]

for filename, title, desc in pages:
    pdf.add_screenshot_page(filename, title, desc)

pdf.save()
print("Done!")
