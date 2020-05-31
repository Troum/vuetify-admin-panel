import Vue from 'vue';
Vue.filter('bet', (value) => {
    switch (value) {
        case '1':
            return 'Электросамокат Xiaomi';
        case '2':
            return 'Смартфон Apple iPhone';
        case '3':
            return 'Квадрокоптер Syma';
        case '4':
            return 'Приставка XBox';
        case '5':
            return 'Денежный приз 5000';
    }
});
Vue.filter('isEmpty', (value) =>{
    if (value.length === 0 || value === 'null') {
        return '-'
    } else {
        return value;
    }
});
