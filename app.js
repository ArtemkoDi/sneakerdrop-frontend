$(document).ready(function() {
    const API_URL = 'http://127.0.0.1:8000/api/sneakers/';
    const $catalog = $('#catalog');

    $.ajax({
        url: API_URL,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            $catalog.empty();

            if (data.length === 0) {
                $catalog.append('<p>Товарів не знайдено. Додайте їх через адмінку бекенду</p>');
                return;
            }

            $.each(data, function(index, sneaker) {
                let sizesHtml = '';
                if (sneaker.sizes && sneaker.sizes.length > 0) {
                    $.each(sneaker.sizes, function(i, size) {
                        sizesHtml += `<span class="size-tag">${size}</span>`;
                    });
                } else {
                    sizesHtml = '<span style="color:red">Немає в наявності</span>';
                }

                const cardHtml = `
                    <div class="sneaker-card">
                        <div class="brand">${sneaker.brand}</div>
                        <h2 class="name">${sneaker.name}</h2>
                        <div class="price">${parseFloat(sneaker.price).toLocaleString()} ₴</div>
                        <div class="sizes">
                            <strong>Розміри:</strong><br>
                            ${sizesHtml}
                        </div>
                    </div>
                `;
                $catalog.append(cardHtml);
            });
        },
        error: function(xhr, status, error) {
            console.error('Помилка AJAX:', error);
            $catalog.html('<p style="color:red;">Помилка підключення. Перевірте, чи запущений сервер бекенду на порту 8000</p>');
        }
    });
});