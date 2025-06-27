{
    'name': 'Villa Chatbot AI',
    'version': '1.0',
    'summary': 'Chatbot hỗ trợ khách hàng tìm biệt thự',
    'description': 'Chatbot AI hỗ trợ khách hàng tìm hiểu thông tin biệt thự',
    'author': 'Your Name',
    'depends': ['website', 'website_sale'],
    'data': [
        'views/chatbot_views.xml',
        'views/chatbot_templates.xml',
    ],
    'assets': {
        'website.assets_frontend': [
            'villa_chatbot/static/src/js/chatbot.js',
        ],
    },
    'installable': True,
    'application': True,
}