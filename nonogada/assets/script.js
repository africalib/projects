var app = new Vue({
    el: '#app',
    data: {
        page: null
    },
    methods: {
        go: function (val1) {
            if (val1)
                location.hash = '/' + val1;

            this.page = val1;
            this.watch();
        },
        watch: function () {
            var hashArr = location.hash.split('/');

            this.page = null;

            if (hashArr.length > 1)
                this.page = hashArr[1];
        }
    },
    created: function () {
        var t = this;
        window.onhashchange = function () {
            t.watch();
        };
        t.watch();
    }
});