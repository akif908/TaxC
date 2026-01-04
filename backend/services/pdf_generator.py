"""
PDF receipt generation service using reportlab
"""
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_RIGHT
from datetime import datetime
import os

class PDFGenerator:
    """Service for generating PDF receipts"""
    
    @staticmethod
    def generate_receipt(payment, user, profile, submission, output_dir='static/receipts'):
        """
        Generate PDF receipt for a payment
        
        Args:
            payment: Payment model instance
            user: User model instance
            profile: TaxpayerProfile model instance (can be None)
            submission: TaxSubmission model instance
            output_dir: Directory to save PDF files
            
        Returns:
            str: Path to generated PDF file
        """
        # Create output directory if it doesn't exist
        os.makedirs(output_dir, exist_ok=True)
        
        # Generate filename
        filename = f"receipt_{payment.transaction_id}.pdf"
        filepath = os.path.join(output_dir, filename)
        
        # Create PDF document
        doc = SimpleDocTemplate(filepath, pagesize=letter)
        story = []
        
        # Styles
        styles = getSampleStyleSheet()
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=24,
            textColor=colors.HexColor('#1a5490'),
            spaceAfter=30,
            alignment=TA_CENTER
        )
        
        heading_style = ParagraphStyle(
            'CustomHeading',
            parent=styles['Heading2'],
            fontSize=14,
            textColor=colors.HexColor('#2c3e50'),
            spaceAfter=12
        )
        
        # Title
        title = Paragraph("TAX PAYMENT RECEIPT", title_style)
        story.append(title)
        story.append(Spacer(1, 0.3*inch))
        
        # Receipt information
        receipt_data = [
            ['Receipt Number:', payment.transaction_id],
            ['Date:', payment.paid_at.strftime('%Y-%m-%d %H:%M:%S') if payment.paid_at else 'N/A'],
            ['Status:', payment.status.upper()]
        ]
        
        receipt_table = Table(receipt_data, colWidths=[2*inch, 4*inch])
        receipt_table.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 0), (-1, -1), 11),
            ('TEXTCOLOR', (0, 0), (0, -1), colors.HexColor('#34495e')),
            ('ALIGN', (0, 0), (0, -1), 'RIGHT'),
            ('ALIGN', (1, 0), (1, -1), 'LEFT'),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ]))
        story.append(receipt_table)
        story.append(Spacer(1, 0.4*inch))
        
        # Taxpayer Information
        story.append(Paragraph("Taxpayer Information", heading_style))
        
        taxpayer_data = [
            ['Name:', profile.name if profile else 'N/A'],
            ['Email:', user.email],
            ['NID:', profile.nid if profile else 'N/A'],
            ['TIN:', profile.tin if profile and profile.tin else 'N/A'],
        ]
        
        taxpayer_table = Table(taxpayer_data, colWidths=[2*inch, 4*inch])
        taxpayer_table.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('ALIGN', (0, 0), (0, -1), 'RIGHT'),
            ('ALIGN', (1, 0), (1, -1), 'LEFT'),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ]))
        story.append(taxpayer_table)
        story.append(Spacer(1, 0.4*inch))
        
        # Tax Calculation Details
        story.append(Paragraph("Tax Calculation Details", heading_style))
        
        tax_data = [
            ['Description', 'Amount'],
            ['Total Income', f'৳{float(submission.total_income):,.2f}'],
            ['Taxable Income', f'৳{float(submission.taxable_income):,.2f}'],
            ['Tax Amount', f'৳{float(submission.tax_amount):,.2f}'],
        ]
        
        tax_table = Table(tax_data, colWidths=[3*inch, 2.5*inch])
        tax_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#3498db')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 12),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.grey),
            ('FONTNAME', (0, 1), (0, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 1), (-1, -1), 10),
            ('TOPPADDING', (0, 1), (-1, -1), 8),
            ('BOTTOMPADDING', (0, 1), (-1, -1), 8),
        ]))
        story.append(tax_table)
        story.append(Spacer(1, 0.4*inch))
        
        # Payment Information
        story.append(Paragraph("Payment Information", heading_style))
        
        payment_data = [
            ['Amount Paid:', f'৳{float(payment.amount):,.2f}'],
            ['Payment Method:', payment.payment_method.capitalize()],
            ['Transaction ID:', payment.transaction_id],
        ]
        
        payment_table = Table(payment_data, colWidths=[2*inch, 4*inch])
        payment_table.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 0), (-1, -1), 11),
            ('ALIGN', (0, 0), (0, -1), 'RIGHT'),
            ('ALIGN', (1, 0), (1, -1), 'LEFT'),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ]))
        story.append(payment_table)
        story.append(Spacer(1, 0.5*inch))
        
        # Footer
        footer_style = ParagraphStyle(
            'Footer',
            parent=styles['Normal'],
            fontSize=9,
            textColor=colors.grey,
            alignment=TA_CENTER
        )
        footer_text = "This is a computer-generated receipt and does not require a signature.<br/>Thank you for your payment."
        footer = Paragraph(footer_text, footer_style)
        story.append(footer)
        
        # Build PDF
        doc.build(story)
        
        return filepath
