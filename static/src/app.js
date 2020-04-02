

var navbar = new Vue({
    delimiters: ['[[', ']]'],
    el : "nav",
    data: function () {
        return {
            title: "Django Stock",
            buttons : [
                {
                    text:"Home", 
                    href: "#home"
                },
                {
                    text: "Contact", 
                    href: "#contact"
                }
            ]
         };
    },
    beforeCreate () {
        Vue.config.devtools = true;
    },
    created() {
//
      },
      methods: {
//
      },
      computed: {
        updateMenu() {
          return this.buttons;
        }
      }
  });