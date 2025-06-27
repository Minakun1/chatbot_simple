from odoo import models, fields, api

class ChatbotResponse(models.Model):
    _name = 'villa.chatbot.response'
    _description = 'Câu trả lời Chatbot'

    name = fields.Char('Câu hỏi', required=True)
    response = fields.Text('Câu trả lời', required=True)
    villa_id = fields.Many2one('product.template', 'Liên kết biệt thự', domain=[('is_property', '=', True)])

class ChatbotAI(models.Model):
    _inherit = 'website'

    def get_chatbot_response(self, question):
        question = question.lower().strip()
        
        # Tìm câu trả lời phù hợp
        response = self.env['villa.chatbot.response'].search([
            '|',
            ('name', 'ilike', question),
            ('response', 'ilike', question)
        ], limit=1)
        
        if response:
            return {
                'response': response.response,
                'villa_id': response.villa_id.id if response.villa_id else False
            }
        
        # Mặc định nếu không tìm thấy
        return {
            'response': "Xin lỗi, tôi chưa hiểu câu hỏi của bạn. Vui lòng liên hệ hotline 0900.xxx.xxx để được hỗ trợ ngay.",
            'villa_id': False
        }