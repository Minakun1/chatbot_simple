odoo.define('villa_chatbot.chatbot', function (require) {
    'use strict';
    
    var ajax = require('web.ajax');
    var core = require('web.core');
    var _t = core._t;
    
    $(document).ready(function () {
        // Toggle chatbot
        $('#chatbot-toggle').click(function () {
            $('#chatbot-container').toggleClass('d-none');
        });
        
        // Gửi tin nhắn
        $('#chatbot-send, #chatbot-input').on('click keypress', function (e) {
            if (e.type === 'click' || (e.type === 'keypress' && e.which === 13)) {
                var message = $('#chatbot-input').val().trim();
                if (message) {
                    addMessage(message, 'user');
                    $('#chatbot-input').val('');
                    
                    // Gọi API backend
                    ajax.jsonRpc('/website/chatbot_response', 'call', {
                        'question': message
                    }).then(function (data) {
                        addMessage(data.response, 'bot');
                        
                        // Nếu có liên kết biệt thự
                        if (data.villa_id) {
                            addMessage('Xem thông tin chi tiết biệt thự <a href="/shop/product/' + data.villa_id + '" target="_blank">tại đây</a>', 'bot');
                        }
                    });
                }
            }
        });
        
        // Thêm tin nhắn vào khung chat
        function addMessage(message, sender) {
            var messageClass = sender === 'user' ? 'text-end' : 'text-start';
            var messageHtml = `
                <div class="mb-2 ${messageClass}">
                    <span class="d-inline-block p-2 rounded-3 ${sender === 'user' ? 'bg-primary text-white' : 'bg-light'}">
                        ${message}
                    </span>
                </div>
            `;
            $('.chatbot-messages').append(messageHtml);
            $('.chatbot-body').scrollTop($('.chatbot-body')[0].scrollHeight);
        }
        
        // Tin nhắn chào mừng
        setTimeout(function () {
            addMessage("Xin chào! Tôi có thể giúp gì cho bạn về các biệt thự của chúng tôi?", 'bot');
        }, 1000);
    });
});