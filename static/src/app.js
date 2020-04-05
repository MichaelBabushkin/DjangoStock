
$(document).ready(() =>{
    $.ajax( "/stats/" )
  .done(function(resp) {
    resp = $.parseJSON(resp);
    let table = `<table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Symbol</th>
        <th>Stock Market</th>
        <th>Last Deal</th>
        <th>Last Rate</th>  
        <th>Daily Change</th>
        <th>Daily Change in %</th>
        <th>Trade Volume</th>
        <th>Daily Max</th>
        <th>Daily Min</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
    <tfoot>
      <tr>
        <td>Sum</td>
        <td>$180</td>
      </tr>
    </tfoot>
  </table>`;


    $("#charts").empty().append(table);


    for (let i = 0; i < resp.length; i++) {
        let dataRow = resp[i];
        let htmlRow = $("<tr />");
        for (let td = 0; td < dataRow.length; td++) {

            $(htmlRow).append("<td>" + dataRow[td] + "</td>");
        }
        $("#charts tbody").append(htmlRow);
    }
    
  })
  .fail(function() {
    alert( "error" );
  });
});
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