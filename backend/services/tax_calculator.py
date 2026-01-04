"""
Tax calculation service
Handles tax calculations based on progressive tax slabs stored in the database
"""
from models.tax_slab import TaxSlab
from decimal import Decimal

class TaxCalculator:
    """Service class for calculating taxes based on slabs"""
    
    @staticmethod
    def calculate_tax(annual_income):
        """
        Calculate tax based on annual income using progressive tax slabs
        
        Args:
            annual_income: Annual income amount (Decimal or float)
            
        Returns:
            dict: {
                'total_income': float,
                'tax_amount': float,
                'effective_rate': float,
                'breakdown': [
                    {
                        'slab': str,
                        'taxable_amount': float,
                        'rate': float,
                        'tax': float
                    }
                ]
            }
        """
        income = Decimal(str(annual_income))
        
        # Fetch all tax slabs ordered by min_income
        slabs = TaxSlab.query.order_by(TaxSlab.min_income).all()
        
        if not slabs:
            # No slabs defined, return zero tax
            return {
                'total_income': float(income),
                'tax_amount': 0.0,
                'effective_rate': 0.0,
                'breakdown': []
            }
        
        total_tax = Decimal('0')
        breakdown = []
        remaining_income = income
        
        for slab in slabs:
            # Skip if income is below this slab
            if income <= slab.min_income:
                continue
            
            # Calculate taxable amount in this slab
            if slab.max_income is None:
                # Highest slab (no upper limit)
                taxable_in_slab = max(Decimal('0'), income - slab.min_income)
            else:
                # Calculate how much income falls in this slab
                upper_limit = min(income, slab.max_income)
                taxable_in_slab = max(Decimal('0'), upper_limit - slab.min_income)
            
            if taxable_in_slab > 0:
                # Calculate tax for this slab
                tax_in_slab = taxable_in_slab * (slab.tax_rate / Decimal('100'))
                total_tax += tax_in_slab
                
                # Add to breakdown
                slab_range = f"{float(slab.min_income):,.2f}"
                if slab.max_income:
                    slab_range += f" - {float(slab.max_income):,.2f}"
                else:
                    slab_range += "+"
                
                breakdown.append({
                    'slab': slab_range,
                    'taxable_amount': float(taxable_in_slab),
                    'rate': float(slab.tax_rate),
                    'tax': float(tax_in_slab)
                })
        
        # Calculate effective tax rate
        effective_rate = (total_tax / income * Decimal('100')) if income > 0 else Decimal('0')
        
        return {
            'total_income': float(income),
            'tax_amount': float(total_tax),
            'effective_rate': float(effective_rate),
            'breakdown': breakdown
        }
    
    @staticmethod
    def get_all_slabs():
        """Get all tax slabs ordered by min_income"""
        slabs = TaxSlab.query.order_by(TaxSlab.min_income).all()
        return [slab.to_dict() for slab in slabs]
